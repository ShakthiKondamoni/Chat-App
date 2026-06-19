import { Link } from "react-router-dom";

const UserCard = ({ user, type = "recommended", onSendRequest, loading }) => {
  const id = user._id || user.id;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <img
            src={
              user.ProfilePicture ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`
            }
            alt={user.Username || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">
              {user.Username || "Unknown User"}
            </h3>

            <p className="text-sm opacity-70">
              {user.NativeLanguage || "Native"} →{" "}
              {user.LearningLanguage || "Learning"}
            </p>
          </div>
        </div>

        <p className="text-sm mt-3 opacity-80">
          {user.Bio || "No bio added."}
        </p>

        {user.Country && (
          <p className="text-xs opacity-60">Country: {user.Country}</p>
        )}

        <div className="card-actions justify-end mt-4">
          {type === "friend" ? (
            <>
              <Link to={`/chat/${id}`} className="btn btn-primary btn-sm">
                Chat
              </Link>

              <Link to={`/call/${id}`} className="btn btn-secondary btn-sm">
                Video Call
              </Link>
            </>
          ) : (
            <button
              onClick={onSendRequest}
              disabled={loading}
              className="btn btn-primary btn-sm"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Add Friend"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;