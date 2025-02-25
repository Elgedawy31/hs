import React from "react";
import Spline from "@splinetool/react-spline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/logo.png"; // Import your logo

// Define validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="relative w-full h-screen flex items-center bg-black">
      <div className="relative z-10 w-[400px] h-[600px] bg-gradient-to-b from-[#9c4f1458] to-[#2e2e2e] p-8 rounded-2xl shadow-xl text-white ml-16">
        {/* Logo */}
        <div className="flex  justify-center mb-4">
          <img src={Logo} alt="Logo" className="w-16 h-18" />
        </div>


        {/* Title */}
        <h2 className="text-4xl font-semibold text-center text-[#E76507] mb-6">Dev Global </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <h2 className="text-2xl font-semibold text-left mb-3">Forget Password</h2>
          <p className="text-md font-normal text-left mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 py-2 rounded-md text-white font-semibold hover:bg-orange-600 transition"
          >
            Send
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

export default ForgetPassword;
