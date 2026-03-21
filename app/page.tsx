'use client';

import { useState } from 'react';
import { Heart, CheckCircle, X } from 'lucide-react';

export default function Home() {
  const [yesPressed, setYesPressed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const escapeDistance = typeof window !== 'undefined' 
      ? window.innerWidth < 640 ? 400 : 300
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Eid Mubarak! 🕌
        </h1>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <CheckCircle size={48} className="text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You, Fatouma!
              </h2>
              <p className="text-lg text-gray-600">
                Happy Eid Mubarak ✨
              </p>
            </div>
          </div>
        </div>
      )}

      {!yesPressed ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Heart size={40} className="text-pink-500 mx-auto mb-6" />
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Will you share
            <span className="block text-pink-600">your Eid outfit Fatouma?</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleYesClick}
              className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors"
            >
              Yes! 💖
            </button>
            <button
              onMouseEnter={handleNoHover}
              className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-all duration-300"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Heart size={40} className="text-pink-500 mx-auto mb-6" />
          
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">
            Wonderful! 🎉
          </h1>
          
          <p className="text-lg text-gray-700 mb-4">
            Thank you for sharing!
          </p>
          
          <p className="text-base text-gray-600">
            Eid Mubarak, Fatouma! 🕌
          </p>
        </div>
      )}
    </div>
  );
}
