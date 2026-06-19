import { StreamChat } from "stream-chat";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

console.log("STREAM API KEY:", apiKey);

export const streamClient = apiKey
  ? StreamChat.getInstance(apiKey)
  : null;