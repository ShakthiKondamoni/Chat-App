import { GenerateStreamToken } from "../lib/Stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = await GenerateStreamToken(req.user._id.toString());

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate token",
    });
  }
};