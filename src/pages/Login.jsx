import React from "react";
import Spline from "@splinetool/react-spline";

const Login = () => {
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
        <input
          type="text"
          placeholder="Enter your email..."
          className="mt-4 px-4 py-4 rounded-xl shadow-lg w-[70%] text-gray-700 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter your Password..."
          className="mt-4 px-4 py-4 rounded-xl shadow-lg w-[70%] text-gray-700 focus:outline-none"
        />
      </div>
      
    </div>
  );
};

export default Login;
