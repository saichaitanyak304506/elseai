import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(username, email, password);
      alert("Registration successful. Please login.");
      window.location.href = "/";
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 p-6 rounded-xl shadow bg-white dark:bg-zinc-900">
        <h2 className="text-xl mb-4 dark:text-white">Register</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
