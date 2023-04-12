import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import { VectorDBQAChain } from "langchain/chains";
import { ChainTool } from "langchain/tools";

import { AccountsTool, BanksTool, TokenInfoTool } from '../tools';

const getPineconeClient = async () => {
  const client = new PineconeClient();
  if (!process.env.PINECONE_API_KEY) throw new Error("PINECONE_API_KEY not set");
  if (!process.env.PINECONE_ENVIRONMENT) throw new Error("PINECONE_ENVIRONMENT not set");

  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  return client;
}

const getInformationAgent = async ({ walletPublicKey }: { walletPublicKey: string; }) => {

  // Get base OpenAI model
  const model = new OpenAI({ 
      modelName: "gpt-3.5-turbo",
      openAIApiKey: process.env.OPENAI_API_KEY, 
      maxTokens: 1000,
      temperature: 0.5,
      verbose: true,
  });

  // Set up Pinecone client
  const client = await getPineconeClient();
  if (!process.env.PINECONE_INDEX) throw new Error("PINECONE_INDEX not set");
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  const vectorChain = VectorDBQAChain.fromLLM(model, vectorStore);
  const omniQa = new ChainTool({
    name: "omni-qa",
    description:
      "ChainTool to answer questions about blockchain protocols. Input should be a question about a protocol.",
    chain: vectorChain,
  });

  const tools = [
    new BanksTool(), 
    new TokenInfoTool(),
    new AccountsTool(walletPublicKey),
    omniQa,
  ];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description"
  );
  console.log('Loaded information agent.')

  return executor;
}

export { getInformationAgent }
