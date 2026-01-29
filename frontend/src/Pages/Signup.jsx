import { useState } from "react";
import API from "../Services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      const res = await API.post("/auth/register", { firstName, lastName, email, password, confirmPassword });
      console.log("Signup response:", res); 
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Signup successful!");
        setSuccess(true);
        navigate("/dashboard");
      } else {
        setMessage("Signup failed: token missing");
        setSuccess(false);
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.message || "Signup failed");
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {message && (
          <p className={`mb-4 text-center ${success ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <input className="mb-3 w-full p-2 border rounded" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input className="mb-3 w-full p-2 border rounded" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input className="mb-3 w-full p-2 border rounded" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="mb-3 w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="mb-4 w-full p-2 border rounded" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
