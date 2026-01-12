import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(username, email, password);
      toast.success("Account created!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      const err = error as any;
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex justify-center items-center p-4 transition-all duration-300">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl animate-slide-up relative overflow-hidden">
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-secondary/20 blur-3xl rounded-full"></div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-Cabin tracking-tighter mb-2">
            ToMind
          </h1>
          <p className="text-base-content/60 text-sm">
            Create your space to think.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 relative z-10"
        >
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-base-200/50 border border-base-content/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-base-content placeholder-base-content/40 transition-all"
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-base-200/50 border border-base-content/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-base-content placeholder-base-content/40 transition-all"
          />

          <div className="relative">
            <input
              placeholder="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-base-200/50 border border-base-content/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-base-content placeholder-base-content/40 transition-all pr-12"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-base-content/50 hover:text-primary cursor-pointer transition-colors">
              {passwordVisible ? (
                <LuEye onClick={() => setPasswordVisible(!passwordVisible)} />
              ) : (
                <LuEyeClosed
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </div>
          </div>

          <button
            disabled={isLoading}
            className="btn btn-primary w-full rounded-xl mt-4 font-medium text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 border-none text-white"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4 text-base-content/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
