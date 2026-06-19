import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.STREAM_API_KEY || process.env.STEAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET || process.env.STEAM_API_SECRET;

if (!api_key || !api_secret) {
  console.log("Stream API key and secret are required");
  process.exit(1);
}

const streamClient = StreamChat.getInstance(api_key, api_secret);

export const UpsertStreamUser = async (userData) => {
  await streamClient.upsertUsers([userData]);
  return userData;
};

export const GenerateStreamToken = (userId) => {
  return streamClient.createToken(userId.toString());
};