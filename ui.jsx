import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Menu, Zap, Box, Circle } from 'lucide-react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const canvasRef = useRef(null);

  // Canvas Starfield Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 4000); // Responsive density
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.1, // Random size
          speed: Math.random() * 0.5 + 0.1, // Random speed
          opacity: Math.random() * 0.7 + 0.3, // Random opacity
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient directly on canvas for better blending (optional, but sticking to CSS bg for now)
      // ctx.fillStyle = 'rgba(0,0,0,0)'; 

      stars.forEach(star => {
        // Update position
        star.y -= star.speed;
        
        // Twinkle effect
        star.opacity += star.twinkleDir * star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) {
            star.twinkleDir *= -1;
        }

        // Reset if off screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.opacity))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col relative overflow-hidden">
      
      {/* Canvas Starfield Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.8 }}
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505] pointer-events-none z-0" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 z-10 relative">
        <div className="text-zinc-400 font-medium text-sm tracking-wide">
          Asknue
        </div>

        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/50 rounded-full px-4 py-1.5 backdrop-blur-sm">
          <span className="text-zinc-200 text-sm font-medium">ChatNLP-1</span>
          <div className="w-2 h-2 rounded-full border border-zinc-600"></div>
        </div>

        <div className="flex items-center justify-center w-8 h-8">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 -mt-16">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 flex items-center justify-center gap-1">
            <span>ChatNLP</span>
            <span className="font-serif italic text-[#d4cbb8] opacity-90 transform translate-y-1">-1</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
            Lightweight conversational intelligence for text and code.
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
          <button className="text-left group bg-zinc-900/30 hover:bg-zinc-800/40 border border-zinc-800/50 hover:border-zinc-700 p-4 rounded-xl transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-zinc-300 font-medium text-sm">Sentiment Analysis</span>
            </div>
            <p className="text-zinc-500 text-sm truncate">"The product was okay but..."</p>
          </button>

          <button className="text-left group bg-zinc-900/30 hover:bg-zinc-800/40 border border-zinc-800/50 hover:border-zinc-700 p-4 rounded-xl transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-zinc-300 font-medium text-sm">Entity Extraction</span>
            </div>
            <p className="text-zinc-500 text-sm truncate">"Elon Musk visited Tesla..."</p>
          </button>
        </div>
      </main>

      {/* Footer / Input Area */}
      <footer className="w-full max-w-3xl mx-auto px-4 pb-16 relative z-20">
        
        {/* Glow Effect behind input */}
        {/* Primary violet glow - Concentrated */}
        <div className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-violet-800/40 blur-[35px] rounded-full pointer-events-none transition-all duration-700 ${isInputFocused ? 'opacity-100 scale-105 bg-violet-700/70 blur-[45px]' : 'opacity-60'}`}></div>
        
        {/* Secondary purple-pink glow - Concentrated */}
        <div className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-1/3 h-16 bg-purple-800/40 blur-[30px] rounded-full pointer-events-none transition-all duration-700 ${isInputFocused ? 'opacity-100 scale-105 bg-purple-600/60 blur-[40px]' : 'opacity-50'}`}></div>
        
        {/* Tertiary subtle indigo accent - Concentrated */}
        <div className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-1/4 h-12 bg-indigo-800/30 blur-[20px] rounded-full pointer-events-none transition-all duration-700 ${isInputFocused ? 'opacity-100 scale-105 bg-fuchsia-700/50 blur-[25px]' : 'opacity-0'}`}></div>

        {/* Input Container */}
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Message ChatNLP-1..."
            className={`w-full bg-zinc-900/80 border text-zinc-200 placeholder-zinc-500 rounded-2xl py-4 pl-6 pr-14 focus:outline-none transition-all shadow-lg backdrop-blur-xl ${
              isInputFocused 
                ? 'border-violet-500/50 bg-zinc-900/95 ring-2 ring-violet-500/20 shadow-[0_0_40px_-5px_rgba(139,92,246,0.3)]' 
                : 'border-zinc-800/60 hover:border-zinc-700/80'
            }`}
          />
          <button 
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
              inputValue ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/30' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  );
}
