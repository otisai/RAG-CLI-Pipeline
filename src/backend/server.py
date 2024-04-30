import asyncio
import hypercorn.asyncio
import time

from quart import Quart, jsonify, request
from sentence_transformers import SentenceTransformer

app = Quart(__name__)
model = SentenceTransformer("BAAI/bge-large-en-v1.5", device="cuda")

@app.post("/api/embed")
async def embed():
  try:
    data = await request.get_json()
    embedding = model.encode(data['text'])
    return jsonify({'embedding': embedding.tolist()})
  except Exception as e:
    print(f"There was an error while encoding: {e}")
    
if __name__ == "__main__":
  asyncio.run(hypercorn.asyncio.serve(app, hypercorn.Config()))