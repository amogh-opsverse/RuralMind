#from transformers import pipeline
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-j-6B")

generated_text = model.generate("This is a test.")

print("model test output:", generated_text)