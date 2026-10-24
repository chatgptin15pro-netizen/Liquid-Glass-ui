/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useRef } from 'react';
import { LiquidGlass } from '@ybouane/liquidglass';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Activity, CloudRain, Wind, Droplets,
  Heart, Share2, Bookmark, ArrowRight
} from 'lucide-react';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: any = null;
    let cancelled = false;

    async function init() {
      if (!rootRef.current) return;
      const root = rootRef.current;
      const glassElements = Array.from(root.querySelectorAll('.glass')) as HTMLElement[];
      
      try {
        const inst = await LiquidGlass.init({ root, glassElements });
        if (cancelled) {
          inst?.destroy?.();
        } else {
          instance = inst;
        }
      } catch (err) {
        console.error('Failed to init liquid glass', err);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (instance) {
        instance.destroy?.();
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <div ref={rootRef} className="relative w-full h-full">
        
        {/* Dynamic Background */}
        <div data-dynamic className="absolute inset-0 z-0">
          <BackgroundOrbs />
        </div>
        
        {/* Static Background Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none opacity-30 mix-blend-overlay">
          <h1 className="text-[18vw] leading-none font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 select-none">
            LIQUID
          </h1>
        </div>

        {/* 
          GLASS PANELS 
          Must be direct children of rootRef.
        */}

        {/* 1. Main Dashboard Panel */}
        <div 
          className="glass absolute z-10 w-full max-w-[600px] h-[380px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[48px] border border-white/10 p-10 cursor-grab active:cursor-grabbing flex flex-col justify-between shadow-2xl"
          data-config={JSON.stringify({
            floating: true,
            blurAmount: 0.4,
            refraction: 0.85,
            chromAberration: 0.25,
            cornerRadius: 48,
            zRadius: 48,
            edgeHighlight: 0.4,
            shadowOpacity: 0.5
          })}
        >
          <div className="flex justify-between items-start pointer-events-none">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-2 drop-shadow-sm">Creative Flow</h2>
              <p className="text-white/80 font-medium text-lg drop-shadow-sm">Immersive WebGL Experiences</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex gap-4 pointer-events-auto">
            <button className="flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg active:scale-95">
              Explore Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-7 py-3.5 bg-black/20 border border-white/20 text-white font-semibold rounded-full hover:bg-black/40 transition-colors shadow-lg active:scale-95">
              Documentation
            </button>
          </div>
        </div>

        {/* 2. Mini Music Player Panel */}
        <div 
          className="glass absolute z-20 w-[300px] h-[160px] left-[10%] bottom-[15%] rounded-[32px] border border-white/10 p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing shadow-2xl"
          data-config={JSON.stringify({
            floating: true,
            blurAmount: 0.5,
            refraction: 0.75,
            chromAberration: 0.2,
            cornerRadius: 32,
            zRadius: 32,
            edgeHighlight: 0.5,
            shadowOpacity: 0.6
          })}
        >
          <div className="flex items-center gap-4 pointer-events-none">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-inner flex items-center justify-center border border-white/20">
               <div className="w-4 h-4 rounded-full bg-white/50 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight drop-shadow-sm">Neon Nights</h3>
              <p className="text-white/70 text-sm drop-shadow-sm">Synthwave Vibes</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 pointer-events-auto">
            <SkipBack className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" fill="currentColor" />
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg active:scale-95">
              <Play className="w-4 h-4 ml-1" fill="currentColor" />
            </div>
            <SkipForward className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" fill="currentColor" />
          </div>
        </div>

        {/* 3. Weather / Status Panel */}
        <div 
          className="glass absolute z-20 w-[220px] h-[240px] right-[12%] top-[12%] rounded-[40px] border border-white/10 p-6 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing shadow-2xl"
          data-config={JSON.stringify({
            floating: true,
            blurAmount: 0.3,
            refraction: 0.9,
            chromAberration: 0.2,
            cornerRadius: 40,
            zRadius: 40,
            edgeHighlight: 0.4,
            shadowOpacity: 0.4
          })}
        >
          <CloudRain className="w-12 h-12 mb-4 text-cyan-300 drop-shadow-lg" />
          <h3 className="text-6xl font-light tracking-tighter mb-1 drop-shadow-sm">18°</h3>
          <p className="text-white/80 font-medium drop-shadow-sm">Rainy • London</p>
          <div className="flex gap-4 mt-6 text-sm text-white/60 pointer-events-none">
            <div className="flex flex-col items-center"><Wind className="w-4 h-4 mb-1" /> 12km/h</div>
            <div className="flex flex-col items-center"><Droplets className="w-4 h-4 mb-1" /> 84%</div>
          </div>
        </div>

      </div>
    </div>
  );
}
