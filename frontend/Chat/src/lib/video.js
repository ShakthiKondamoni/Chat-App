import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const createVideoClient = (user, token) => {
  if (!apiKey) {
    throw new Error("VITE_STREAM_API_KEY is missing");
  }

  return new StreamVideoClient({
    apiKey,
    user: {
      id: user._id || user.id,
      name: user.Username,
      image: user.ProfilePicture || "",
    },
    token,
  });
};