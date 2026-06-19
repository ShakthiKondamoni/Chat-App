import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserCard from "../components/UserCard.jsx";
import { userApi } from "../lib/api.js";

const HomePage = () => {
  const [recommended, setRecommended] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const [friendsData, recData] = await Promise.all([
        userApi.friends(),
        userApi.recommended(),
      ]);

      setFriends(friendsData.myFriends || []);
      setRecommended(recData.recommendedUsers || []);
    } catch (error) {
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sendRequest = async (id) => {
    try {
      setSendingId(id);
      await userApi.sendRequest(id);
      toast.success("Friend request sent");
      setRecommended((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to send request");
    } finally {
      setSendingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[80vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 py-10 space-y-12">
      <section>
        <h1 className="text-4xl font-bold mb-2">Your friends</h1>
        <p className="opacity-70 mb-6">Chat or start a video call with accepted friends.</p>

        {friends.length === 0 ? (
          <div className="alert bg-base-100 shadow">No friends yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.map((friend) => (
              <UserCard key={friend._id} user={friend} type="friend" />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-2">Recommended users</h2>
        <p className="opacity-70 mb-6">Send friend requests to start conversations.</p>

        {recommended.length === 0 ? (
          <div className="alert bg-base-100 shadow">No recommended users found.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                type="recommended"
                loading={sendingId === user._id}
                onSendRequest={() => sendRequest(user._id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;