import { useState } from "react";
import API from "../Services/api";
import { useNavigate, Link } from "react-router-dom";
import { Bookmark, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("");
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#020617" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,235,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}>
            <Bookmark className="w-7 h-7 text-blue-400" />
          </div>
          <h1
            className="text-4xl font-black tracking-tight text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            Book<span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >Mark</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Welcome back — your links are waiting.</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
          }}
        >
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Sign in to your account</h2>
          <p className="text-slate-500 text-sm mb-7">
            Don't have one?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Create a free account
            </Link>
          </p>

          {/* Error message */}
          {message && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              {message}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => {
                    e.target.style.border = "1px solid rgba(59,130,246,0.5)";
                    e.target.style.background = "rgba(59,130,246,0.06)";
                  }}
                  onBlur={e => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => {
                    e.target.style.border = "1px solid rgba(59,130,246,0.5)";
                    e.target.style.background = "rgba(59,130,246,0.06)";
                  }}
                  onBlur={e => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-700 text-xs mt-8">
          © {new Date().getFullYear()} BookMark · Your links, organized.
        </p>
      </div>
    </div>
  );
}