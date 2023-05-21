import os
from langchain import PromptTemplate, HuggingFaceHub, LLMChain
from langchain.llms import HuggingFacePipeline
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, AutoModelForSeq2SeqLM
from transformers import ReformerModelWithLMHead
from transformers import pipeline, set_seed



os.environ['HUGGINGFACEHUB_API_TOKEN'] = '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'

template = """Question: {question}

Answer: Let's think step by step."""

prompt = PromptTemplate(template=template, input_variables=["question"])

def science():
  model_id = 'google/flan-t5-large'
  tokenizer = AutoTokenizer.from_pretrained(model_id)

  #model = AutoModelForSeq2SeqLM.from_pretrained(model_id, load_in_8bit=True, device_map='auto', load_in_8bit_fp32_cpu_offload=True)
  model = AutoModelForSeq2SeqLM.from_pretrained(model_id, load_in_8bit=False, device_map='auto')


  pipe = pipeline(
      "text2text-generation",
      model=model, 
      tokenizer=tokenizer, 
      max_length=100
  )

  local_llm = HuggingFacePipeline(pipeline=pipe)

  print(local_llm('How many planets are in the solar system?'))


"""reformer"""
def history():
  #model_id = 'google/reformer-enwik8'
  model = ReformerModelWithLMHead.from_pretrained("google/reformer-enwik8")
  # Encoding
  def encode(list_of_strings, pad_token_id=0):
      max_length = max([len(string) for string in list_of_strings])

      # create emtpy tensors
      attention_masks = torch.zeros((len(list_of_strings), max_length), dtype=torch.long)
      input_ids = torch.full((len(list_of_strings), max_length), pad_token_id, dtype=torch.long)

      for idx, string in enumerate(list_of_strings):
          # make sure string is in byte format
          if not isinstance(string, bytes):
              string = str.encode(string)

          input_ids[idx, :len(string)] = torch.tensor([x + 2 for x in string])
          attention_masks[idx, :len(string)] = 1

      return input_ids, attention_masks
      
  # Decoding
  def decode(outputs_ids):
      decoded_outputs = []
      for output_ids in outputs_ids.tolist():
          # transform id back to char IDs < 2 are simply transformed to ""
          decoded_outputs.append("".join([chr(x - 2) if x > 1 else "" for x in output_ids]))
      return decoded_outputs


  encoded, attention_masks = encode(["India gained her independence in the year..."])
  print(decode(model.generate(encoded, do_sample=True, max_length=150)))

'''conversation using gpt2-xl'''
def literature():
  generator = pipeline('text-generation', model='gpt2-xl')
  set_seed(42)
  print(generator("The father of Indian independence is: ", max_length=30, num_return_sequences=5)[-1])


def main():
  science()
  history()
  literature()


if __name__ == '__main__':
  main()