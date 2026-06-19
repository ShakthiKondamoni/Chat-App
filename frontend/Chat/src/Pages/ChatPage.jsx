import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

import { streamClient } from "../lib/stream.js";
import { chatApi } from "../lib/api.js";

const ChatPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const initChat = async () => {
      try {
        if (!streamClient) throw new Error("Missing Stream key");

        const currentUser = JSON.parse(localStorage.getItem("user"));
        const currentUserId = currentUser?._id || currentUser?.id;

        if (!currentUserId) throw new Error("No current user");
        if (!id) throw new Error("No friend id");

        const tokenRes = await chatApi.token();
        if (!tokenRes?.token) throw new Error("No Stream token");

        if (!streamClient.userID) {
          await streamClient.connectUser(
            {
              id: currentUserId,
              name: currentUser.Username,
              image: currentUser.ProfilePicture || "",
            },
            tokenRes.token
          );
        }

        const channelId = [currentUserId, id].sort().join("-");

        const chatChannel = streamClient.channel("messaging", channelId, {
          members: [currentUserId, id],
        });

        await chatChannel.watch();

        if (mounted) setChannel(chatChannel);
      } catch (error) {
        console.error(error);
        if (mounted) setErrorMsg(error.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initChat();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="min-h-[calc(100vh-64px)] grid place-items-center p-6">
        <div className="card bg-base-100 shadow-xl max-w-xl w-full">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-error">Chat failed</h1>
            <p>{errorMsg}</p>
            <Link to="/" className="btn btn-primary">Back Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-[calc(100vh-64px)]">
      <Chat client={streamClient} theme="str-chat__theme-dark">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </main>
  );
};

export default ChatPage;