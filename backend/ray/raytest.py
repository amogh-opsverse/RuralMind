import ray
import time
import ray.data
import pandas as pd

from ray import serve
from starlette.requests import Request

model_id = "EleutherAI/gpt-j-6B"
revision = "float16"  # use float16 weights to fit in 16GB GPUs
prompt = (
    "In a shocking finding, scientists discovered a herd of unicorns living in a remote, "
    "previously unexplored valley, in the Andes Mountains. Even more surprising to the "
    "researchers was the fact that the unicorns spoke perfect English."
)

# Start Ray.
ray.init(
    runtime_env={
        "pip": [
            "accelerate>=0.16.0",
            "transformers>=4.26.0",
            "numpy<1.24",  # remove when mlflow updates beyond 2.2
            "torch",
        ]
    })

ds = ray.data.from_pandas(pd.DataFrame([prompt] * 10, columns=["prompt"]))


#@serve.deployment(ray_actor_options={"num_gpus": 1})
@serve.deployment()
class PredictDeployment:
    def __init__(self, model_id: str, revision: str = None):
        from transformers import AutoModelForCausalLM, AutoTokenizer
        import torch

        self.model = AutoModelForCausalLM.from_pretrained(
            model_id,
            revision=revision,
            torch_dtype=torch.float16,
            low_cpu_mem_usage=True,
            device_map="auto",  # automatically makes use of all GPUs available to the Actor
        )
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)

    def generate(self, text: str) -> pd.DataFrame:
        input_ids = self.tokenizer(text, return_tensors="pt").input_ids.to(
            self.model.device
        )

        gen_tokens = self.model.generate(
            input_ids,
            do_sample=True,
            temperature=0.9,
            max_length=100,
        )
        return pd.DataFrame(
            self.tokenizer.batch_decode(gen_tokens), columns=["responses"]
        )

    async def __call__(self, http_request: Request) -> str:
        json_request: str = await http_request.json()
        prompts = []
        for prompt in json_request:
            text = prompt["text"]
            if isinstance(text, list):
                prompts.extend(text)
            else:
                prompts.append(text)
        return self.generate(prompts)

deployment = PredictDeployment.bind(model_id=model_id, revision=revision)
serve.run(deployment)

# @ray.remote
# def f(x):
#     time.sleep(1)
#     return x

# # Start 4 tasks in parallel.
# result_ids = []
# for i in range(4):
#     result_ids.append(f.remote(i))
    
# # Wait for the tasks to complete and retrieve the results.
# # With at least 4 cores, this will take 1 second.
# results = ray.get(result_ids)  # [0, 1, 2, 3]
# print("results",results)