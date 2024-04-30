import { queryDb } from "./qdrant";

export async function makePrompt(input: string) {
  let prompt: string; // prompt for later.
  prompt = "User: " + input;

  // Query the database for relevant information
  const relevantInfo = await queryDb(input, "fallout_lore-v2");

  // Filter out elements with a score of 0.80 or less
  const filteredInfo = relevantInfo.filter(result => result.score > 0.7);

  // Modify content to remove "Gallery" and content after that
  const modifiedContents: string[] = [];
  filteredInfo.forEach(result => {
    if (result.payload?.content) {
      let modifiedContent = (result.payload.content as string).replace(/[\n\r]{2,}/g, '\n');
      modifiedContent = modifiedContent.split("Appearances")[0];
      modifiedContent = modifiedContent.split("Gallery")[0];
      modifiedContent = modifiedContent.split("Sounds")[0];
      modifiedContents.push(modifiedContent);
    }
  });

  if (modifiedContents.length > 0) {
    prompt = `[Background information: ${modifiedContents[0]}]\n\nUser: ${input}`;
  }

  return prompt;
}

