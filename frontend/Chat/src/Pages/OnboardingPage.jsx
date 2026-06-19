import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Username: "",
    Bio: "",
    Country: "",
    NativeLanguage: "",
    LearningLanguage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await authApi.onboard(form);

      setAuthUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Onboarding completed");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to complete onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] grid place-items-center p-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-3xl bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-5">
          <h1 className="text-3xl font-bold">Complete your profile</h1>

          <input name="Username" className="input input-bordered w-full" placeholder="Username" value={form.Username} onChange={handleChange} />

          <textarea name="Bio" className="textarea textarea-bordered w-full min-h-32" placeholder="Bio" value={form.Bio} onChange={handleChange} />

          <input name="Country" className="input input-bordered w-full" placeholder="Country" value={form.Country} onChange={handleChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <input name="NativeLanguage" className="input input-bordered w-full" placeholder="Native Language" value={form.NativeLanguage} onChange={handleChange} />

            <input name="LearningLanguage" className="input input-bordered w-full" placeholder="Learning Language" value={form.LearningLanguage} onChange={handleChange} />
          </div>

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "Finish onboarding"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default OnboardingPage;