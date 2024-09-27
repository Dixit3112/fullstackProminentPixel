import React from 'react';
import "../../scss/loading/_loading.scss";

export default function LoadingDots() {
  console.log("Loading Dots");
  return (
    <div className="flex justify-center items-center z-[1000] bg-slate-400">
      <div className="flex space-x-2 bg-slate-400 p-4">
        <div className="dots w-4 h-4 bg-red-800 z-50 min-w-4 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="dots w-4 h-4 bg-red-800 z-50 min-w-4 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        <div className="dots w-4 h-4 bg-red-800 z-50 min-w-4 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  )
}