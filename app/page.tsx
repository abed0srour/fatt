'use client';

import { useState } from 'react';
import { Moon, Star, PartyPopper, CheckCircle, X } from 'lucide-react';

export default function Home() {
  const [yesPressed, setYesPressed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const escapeDistance = typeof window !== 'undefined' 
      ? window.innerWidth < 640 ? 250 : 300
      : 300;
    const randomX = (Math.random() - 0.5) * escapeDistance;
    const randomY = (Math.random() - 0.5) * escapeDistance;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 drop-shadow-lg">
          Eid Mubarak! 🕌
        </h1>
      </div>
      {showAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-sm w-full animate-bounce border border-green-100">
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <PartyPopper size={40} className="text-green-600" />
                <CheckCircle size={40} className="text-yellow-500" />
                <PartyPopper size={40} className="text-green-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
                Thanks Fats!
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                Happy Eid
              </p>
            </div>
          </div>
        </div>
      )}
      {!yesPressed ? (
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center animate-fade-in border border-green-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Moon size={32} className="text-green-600" />
            <Star size={32} className="text-yellow-500 animate-pulse" />
            <Moon size={32} className="text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8 leading-tight">
            Will you show me
            <span className="block text-green-600">your Eid outfit, Fatouma?</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleYesClick}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse"
            >
              Yes! 🌙
            </button>
            <button
              onMouseEnter={handleNoHover}
              className="px-8 py-4 bg-gray-300 text-gray-700 font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
            >
              No �
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center animate-fade-in border border-green-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <PartyPopper size={40} className="text-green-600" />
            <Star size={40} className="text-yellow-500 animate-bounce" />
            <PartyPopper size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-6">
            Yay! 🎉
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8">
            Thanks for showing me! 🌙
          </p>
          <p className="text-lg text-gray-600">
            Happy Eid Mubarak! 🕌
          </p>
        </div>
      )}
    </div>
  );
}
