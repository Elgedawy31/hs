import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/logo.png"; // Import your logo
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { showErrorToast } from "../components/ErrorToast";

// Define validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login , isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success("Login successful!", "success");
        navigate("/");
      } else {
        showErrorToast(result.error);
      }
    } catch (error) {
      showErrorToast(error);
    }
    finally

    {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center bg-black">
      {/* Login Form Section - Positioned Left */}
      <div className="relative z-10 w-[400px] h-[600px] bg-gradient-to-b from-[#9c4f1458] to-[#2e2e2e] p-8 rounded-2xl shadow-xl text-white ml-16">
        {/* Logo */}
        <div className="flex  justify-center mb-4">
          <img src={Logo} alt="Logo" className="w-16 h-18" />
        </div>


        {/* Title */}
        <h2 className="text-4xl font-semibold text-center text-[#E76507] mb-6">Dev Global </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <h2 className="text-2xl font-semibold text-left mb-6">Sign in</h2>
          {/* Email Input */}
          <div>
            <label className="text-sm">E-mail Address</label>
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 rounded-lg  text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="text-sm">Password</label>
            <input
              placeholder="Password"
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="/forget-password" className="text-orange-400 hover:underline">Forgot Password?</a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 py-2 rounded-md text-white font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Spline 3D Background - Positioned Right */}
      <div className="absolute right-0 w-3/4 h-full">
        <Spline scene="https://prod.spline.design/d3DtnB6YClinG5Wc/scene.splinecode" />
      </div>
    </div>
  );
};

export default Login;
