import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getVector(text: string) {
  const embedding = await axios.post("http://127.0.0.1:8000/api/embed", { text }); // api call to python server to serve embedding (not using js langchain/transformers because no cuda support)

  return embedding.data.embedding; // return embedding coords
}

export async function generateGemini(prompt: string, apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}