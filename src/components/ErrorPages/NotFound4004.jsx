import React from "react";

export default function NotFoundPage() {
  return (
    <div className=" h-screen w-screen bg-green-500">
      
      {/* Fullscreen Image */}
      <img
        src="Error404.png"
        alt="not found"
        className="absolute h-full w-screen object-cover z-0"
      />

      {/* Content Section */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left">
          
          {/* Left Section (Text) */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900">
                404
              </h1>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Page Not Found!
              </h3>
            </div>

            {/* Footer Section */}
            <div className="space-y-6">
              <p className="text-gray-600">
                We're sorry, the page you requested could not be found. Please go
                back to the homepage!
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition"
              >
                GO HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
