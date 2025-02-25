import React from "react";
import Spline from "@splinetool/react-spline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/CustomToast";
import { useNavigate } from "react-router-dom";

// Define validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        showToast("Login successful!", "success");
        navigate("/");
      } else {
        showToast(result.error || "Login failed", "error");
      }
    } catch (error) {
      showToast(error.message || "An error occurred", "error");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="">
        <Spline scene="https://prod.spline.design/zwJ46nqhWBXNGzMh/scene.splinecode" className="pointer-events-auto" />
      </div>
      <div className="absolute w-[50%] inset-36 flex flex-col items-left justify-center text-center h-fit p-6 space-y-8">
        <h1 className="text-left text-5xl font-bold text-white drop-shadow-lg">Welcome to Our Platform</h1>
        <p className=" text-left text-2xl text-gray-200 mt-2 max-w-lg">
          Experience a new way of interaction with immersive 3D designs.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your email..."
            {...register("email")}
            className="mt-4 px-4 py-4 rounded-xl shadow-lg w-[70%] text-gray-700 focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter your Password..."
            {...register("password")}
            className="mt-4 px-4 py-4 rounded-xl shadow-lg w-[70%] text-gray-700 focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`mt-4 w-[70%] text-white py-3 px-6 rounded-lg transition ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
