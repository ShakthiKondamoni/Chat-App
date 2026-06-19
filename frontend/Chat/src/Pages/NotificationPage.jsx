import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userApi } from "../lib/api.js";

const NotificationPage = () => {
  const [incoming, setIncoming] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await userApi.requests();
      setIncoming(data.incomingReq || []);
      setAccepted(data.acceptedReq || []);
    } catch (error) {
      toast.error(error.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      await userApi.acceptRequest(id);
      toast.success("Friend request accepted");
      loadRequests();
    } catch (error) {
      toast.error(error.message || "Failed to accept request");
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
    <main className="max-w-4xl mx-auto p-6 py-10 space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>

        {incoming.length === 0 ? (
          <div className="alert bg-base-100 shadow">No incoming requests.</div>
        ) : (
          <div className="space-y-4">
            {incoming.map((req) => (
              <div key={req._id} className="card bg-base-100 shadow border border-base-300">
                <div className="card-body flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={req.sender?.ProfilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req._id}`}
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h2 className="font-bold">{req.sender?.Username}</h2>
                      <p className="text-sm opacity-70">
                        {req.sender?.NativeLanguage || "Native"} → {req.sender?.LearningLanguage || "Learning"}
                      </p>
                    </div>
                  </div>

                  <button onClick={() => acceptRequest(req._id)} className="btn btn-primary btn-sm">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Accepted Requests</h2>

        {accepted.length === 0 ? (
          <div className="alert bg-base-100 shadow">No accepted requests yet.</div>
        ) : (
          <div className="space-y-3">
            {accepted.map((req) => (
              <div key={req._id} className="alert bg-base-100 shadow">
                You are now friends with {req.recipient?.Username}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default NotificationPage;