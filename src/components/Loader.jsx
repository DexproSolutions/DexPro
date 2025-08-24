import React from 'react';

const Loader = ({ type = "spinner", size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-10 w-10", 
    large: "h-16 w-16"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  if (type === "dots") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        {text && <p className={`text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>}
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse shadow-lg`}></div>
        {text && <p className={`text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>}
      </div>
    );
  }

  if (type === "ring") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <div className="relative">
          <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full`}></div>
          <div className={`${sizeClasses[size]} border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
        </div>
        {text && <p className={`text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-purple-400 rounded-full animate-spin absolute top-0 left-0`} style={{ animationDuration: '1.5s' }}></div>
      </div>
      {text && <p className={`text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>}
    </div>
  );
};

export default Loader;

