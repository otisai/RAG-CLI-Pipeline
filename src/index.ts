import { QdrantClient } from "@qdrant/js-client-rest";
import * as readline from 'readline';
import { generateGemini } from "./helpers/api";
import { makePrompt } from "./helpers/prompt";
import "dotenv/config";

// create qdrant client
export const client = new QdrantClient({
  host: "localhost",
  port: 6333
});

// create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  // Listen for user input
  rl.question('> ', async (input) => {
    // process input
    const prompt = await makePrompt(input);

    // Execute stuff with the input (you can put your logic here)
    const response = await generateGemini(`${prompt}`, process.env.GEMINI_API_KEY || ""); // Pass history to generateGemini

    // Log the response
    console.log(`\x1b[34m${response}\x1b[0m`);
    
    // Continue by calling main() recursively
    main();
  });
}


// Call main to start the program
main();
