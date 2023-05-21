import requests

prompt = (
    "In a shocking finding, scientists discovered a herd of unicorns living in a remote, "
    "previously unexplored valley, in the Andes Mountains. Even more surprising to the "
    "researchers was the fact that the unicorns spoke perfect English."
)

sample_input = {"text": prompt}
try:
    output = requests.post("http://localhost:8000/", json=[sample_input]).json()
except:
    print("error")
#output = requests.post("http://localhost:8000/", json=[sample_input]).json()
#print(output)