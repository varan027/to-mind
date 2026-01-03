import { useState } from "react";
import { instance } from "../lib/axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signup } = useAuth(); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(username, email, password)
      toast.success("Signup successful!");
      navigate("/", { replace: true});

    } catch (error) {
      console.error(error);
      const err = error as any;
      toast.error(err?.response?.data?.message ||"Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center transition-all">
      <form
        onSubmit={handleSignup}
        className="flex flex-col justify-center items-center border border-gray-700 rounded-lg shadow-lg p-8 py-14 bg-black/50"
      >
        <h1 className="text-2xl font-semibold text-primary mb-12">Sign Up</h1>

        <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 w-64 rounded bg-gray-700 text-white focus:outline-none"
      />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-64 rounded bg-gray-700 text-white focus:outline-none"
        />
        <div className="relative">
          <input
            placeholder="Password"
            type={`${passwordVisible ? "text" : "password"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-64 rounded bg-gray-700 focus:outline-none text-white"
          />
          <div className="absolute top-0 right-0 mt-3 mr-3 text-gray-400">
            {passwordVisible ? (
              <LuEye
                className="cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <LuEyeClosed
                className="cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )}
          </div>
        </div>
        <button className="border font-medium p-2 w-64 bg-primary/75 rounded text-black cursor-pointer mt-12 hover:bg-primary active:scale-98">
          Sign Up
        </button>
        <p className="text-xs mt-4">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
