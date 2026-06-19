import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { createVideoClient } from "../lib/video";
import { apiRequest } from "../lib/api";

const CallPage = () => {
  const { id } = useParams();

  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const tokenRes = await apiRequest(
          "/video/token"
        );

        const videoClient =
          createVideoClient(
            user,
            tokenRes.token
          );

        const callId = [
          user._id || user.id,
          id,
        ]
          .sort()
          .join("-");

        const newCall =
          videoClient.call(
            "default",
            callId
          );

        await newCall.join({
          create: true,
        });

        setClient(videoClient);
        setCall(newCall);
      } catch (error) {
        console.error(error);
      }
    };

    init();

    return () => {
      call?.leave();
      client?.disconnectUser();
    };
  }, [id]);

  if (!call || !client) {
    return (
      <div className="min-h-screen grid place-items-center">
        Loading call...
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default CallPage;