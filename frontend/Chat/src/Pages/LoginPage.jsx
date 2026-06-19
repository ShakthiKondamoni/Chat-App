import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ Email: "", Password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await login(form);
      const user = data.user;

      if (user?.isOnboarded) navigate("/");
      else navigate("/onboarding");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] grid place-items-center p-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-4">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="opacity-70">Login to continue chatting.</p>

          <input
            className="input input-bordered w-full"
            placeholder="Email"
            type="email"
            value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />

          <input
            className="input input-bordered w-full"
            placeholder="Password"
            type="password"
            value={form.Password}
            onChange={(e) => setForm({ ...form, Password: e.target.value })}
          />

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "Login"}
          </button>

          <p className="text-sm text-center opacity-80">
            No account? <Link className="link link-primary" to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;