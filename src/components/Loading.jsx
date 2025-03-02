import React from 'react';

export default function Loading({ className='min-h-[80vh]' }) {
  return (
    <div className={`flex items-center justify-center  ${className}`}>
      <div className="relative">
        {/* Main circle pulse */}
        <div className="absolute -inset-2">
          <div className="w-24 h-24 rounded-full bg-primary opacity-20 animate-ping" />
        </div>

        {/* Spinning circles */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-8 border-borderColor">
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-8 border-primary border-t-transparent animate-spin" />
          </div>

          {/* Middle ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full border-6 border-borderColor">
              <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-6 border-altPrimary border-t-transparent animate-[spin_2s_linear_infinite]" />
            </div>
          </div>

          {/* Inner ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full border-4 border-borderColor">
              <div className="absolute top-0 left-0 w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-[spin_1.5s_linear_infinite]" />
            </div>
          </div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p className="text-text font-semibold">Loading</p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-altPrimary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}