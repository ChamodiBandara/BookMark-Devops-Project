import { useState } from "react";
import API from "../Services/api";
import { useNavigate, Link } from "react-router-dom";
import { Bookmark, User, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const InputField = ({ icon: Icon, label, type = "text", placeholder, value, onChange, rightElement }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200"
          style={{
            paddingRight: rightElement ? "3rem" : undefined,
            background: focused ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.05)",
            border: focused ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.1)",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  if (!password) return null;
  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap">
      {checks.map(({ label, pass }) => (
        <span
          key={label}
          className="flex items-center gap-1 text-xs"
          style={{ color: pass ? "#34d399" : "#475569" }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: pass ? "#34d399" : "#334155" }}
          />
          {label}
        </span>
      ))}
    </div>
  );
};

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/register", { firstName, lastName, email, password, confirmPassword });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Account created!");
        setSuccess(true);
        navigate("/dashboard");
      } else {
        setMessage("Signup failed: token missing");
        setSuccess(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button type="button" onClick={onToggle} className="text-slate-500 hover:text-slate-300 transition-colors">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "#020617" }}
    >
      {/* Ambient glows */}
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
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <Bookmark className="w-7 h-7 text-blue-400" />
            </div>
          </Link>
          <h1
            className="text-4xl font-black tracking-tight text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            Book
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mark
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Create your free account in seconds.</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
          }}
        >
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Create your account</h2>
          <p className="text-slate-500 text-sm mb-7">
            Already have one?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Sign in instead
            </Link>
          </p>

          {/* Alert */}
          {message && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
              style={{
                background: success ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${success ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)"}`,
                color: success ? "#6ee7b7" : "#fca5a5",
              }}
            >
              {success
                ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#34d399" }} />
                : <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />}
              {message}
            </div>
          )}

          <div className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                icon={User}
                label="First Name"
                placeholder="Ada"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <InputField
                icon={User}
                label="Last Name"
                placeholder="Lovelace"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <InputField
              icon={Mail}
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: confirmPassword
                      ? confirmPassword === password
                        ? "1px solid rgba(52,211,153,0.5)"
                        : "1px solid rgba(239,68,68,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => {
                    if (!confirmPassword) {
                      e.target.style.border = "1px solid rgba(59,130,246,0.5)";
                      e.target.style.background = "rgba(59,130,246,0.06)";
                    }
                  }}
                  onBlur={e => {
                    if (!confirmPassword) {
                      e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                      e.target.style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs mt-1.5" style={{ color: "#fca5a5" }}>
                  Passwords don't match
                </p>
              )}
              {confirmPassword && confirmPassword === password && (
                <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#34d399" }}>
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="group w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-700 text-xs mt-8">
          © {new Date().getFullYear()} BookMark · Your links, organized.
        </p>
      </div>
    </div>
  );
}