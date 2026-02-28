import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword, login } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setError("Invalid email format");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password must include uppercase, lowercase, number & special character",
      );
    }

    if (!login(email, password)) {
      return setError("Incorrect credentials");
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Employee Dashboard Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
