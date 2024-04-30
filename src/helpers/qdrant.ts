import { client } from "..";
import getVector from "./api";

export async function queryDb(query: string, collection: string) {
  const result = await client.search(collection, { vector: await getVector(query) });

  // console.log(result);
  return result; // array of vectors + payloads
}