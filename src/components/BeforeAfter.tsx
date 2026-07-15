'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Layers, Volume2, VolumeX, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  // Sync play/pause state of the two video streams
  useEffect(() => {
    if (beforeVideoRef.current && afterVideoRef.current) {
      if (isPlaying) {
        beforeVideoRef.current.play().catch(() => {});
        afterVideoRef.current.play().catch(() => {});
      } else {
        beforeVideoRef.current.pause();
        afterVideoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync mute state of the two video streams
  useEffect(() => {
    if (beforeVideoRef.current && afterVideoRef.current) {
      beforeVideoRef.current.muted = isMuted;
      afterVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync timestamps periodically to avoid drifts
  useEffect(() => {
    const interval = setInterval(() => {
      if (beforeVideoRef.current && afterVideoRef.current && isPlaying) {
        const diff = Math.abs(beforeVideoRef.current.currentTime - afterVideoRef.current.currentTime);
        if (diff > 0.15) {
          afterVideoRef.current.currentTime = beforeVideoRef.current.currentTime;
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle pointer move to slide division line
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleSyncTime = () => {
    if (beforeVideoRef.current && afterVideoRef.current) {
      afterVideoRef.current.currentTime = beforeVideoRef.current.currentTime;
    }
  };

  // Ultra-reliable, fast-loading, globally cached public test videos (Big Buck Bunny)
  const videoSourceUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <section id="before-after" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('baTitleMain')}
          <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">
            {t('baTitleHighlight')}
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          {t('baSubtitle')}
        </p>
      </div>

      {/* Interactive Slider Container */}
      <div className="relative mx-auto max-w-4xl rounded-3xl overflow-hidden bg-charcoal-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        
        {/* Play/Mute controls overlay */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-charcoal-950/80 border border-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-gray-400" /> : <Volume2 className="h-5 w-5 text-brand-purple" />}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-charcoal-950/80 border border-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <span className="h-2.5 w-2.5 rounded-sm bg-brand-purple" />
            ) : (
              <PlayIcon className="h-4 w-4 fill-white text-white translate-x-[1px]" />
            )}
          </button>
          <button
            onClick={handleSyncTime}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-charcoal-950/80 border border-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
            title="Sync Video Timestamps"
          >
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Outer frame containing Before/After streams */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-video w-full select-none overflow-hidden cursor-ew-resize bg-charcoal-950"
        >
          {/* ========================================================================= */}
          {/* BEFORE Video (Bottom Layer - Raw Version) */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 w-full h-full z-10 bg-black">
            <video
              ref={beforeVideoRef}
              src={videoSourceUrl}
              className="absolute inset-0 h-full w-full object-cover filter grayscale contrast-90 brightness-75 opacity-70"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Visual label for Before */}
            <div className="absolute bottom-4 right-4 z-15 rounded-lg bg-charcoal-800 border border-white/10 px-2.5 py-1 text-xs font-bold text-gray-400">
              {t('baRawLabel')}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* AFTER Video (Top Layer - Polished Version clipped dynamically via clip-path) */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <div className="relative w-full h-full bg-black border-r-2 border-white">
              <video
                ref={afterVideoRef}
                src={videoSourceUrl}
                className="absolute inset-0 h-full w-full object-cover brightness-125 contrast-125 saturate-125 scale-110 transition-transform duration-300"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Styled overlay items for After */}
              <div className="absolute inset-0 z-15 flex flex-col justify-end pb-12 items-center pointer-events-none">
                <div className="rounded-2xl bg-charcoal-950/90 border border-brand-purple/40 px-6 py-2.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-bounce">
                  <span className="text-xl md:text-2xl font-black uppercase tracking-wider text-yellow-300 font-mono">
                    {t('baCaptionBadge')}
                  </span>
                </div>
                <div className="mt-2 text-xs md:text-sm font-semibold tracking-wide text-brand-purple uppercase bg-black/60 px-3 py-1 rounded-full border border-white/5">
                  {t('baEngineBadge')}
                </div>
              </div>

              {/* Glowing sound wave equalizer bars in bottom-left */}
              <div className="absolute bottom-16 left-6 z-25 flex items-end gap-1 h-10">
                <div className="w-1.5 bg-brand-purple rounded animate-[bounce_1s_infinite_100ms] h-8" />
                <div className="w-1.5 bg-brand-indigo rounded animate-[bounce_0.8s_infinite_300ms] h-10" />
                <div className="w-1.5 bg-cyan-400 rounded animate-[bounce_1.2s_infinite_200ms] h-6" />
                <div className="w-1.5 bg-brand-pink rounded animate-[bounce_0.9s_infinite_400ms] h-9" />
              </div>

              {/* Float Emojis */}
              <div className="absolute top-12 left-12 z-20 flex items-center gap-2 rounded-2xl bg-black/60 border border-white/10 px-3.5 py-2 shadow-lg">
                <span className="text-xl animate-spin [animation-duration:10s]">🔥</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">FastCut AI Render</span>
              </div>
              
              {/* Visual label for After */}
              <div className="absolute bottom-4 left-4 z-25 rounded-lg bg-brand-purple px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-brand-purple/20">
                {t('baPolishLabel')}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Slider division boundary handle */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-y-0 z-30 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal-950 shadow-lg border-2 border-brand-purple scale-90 hover:scale-100 transition-transform">
              <Maximize2 className="h-4 w-4 rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefit grid underneath */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="rounded-2xl bg-charcoal-900/40 border border-white/5 p-6 backdrop-blur-sm card-glow transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple mb-4">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">{t('benefit1Title')}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {t('benefit1Desc')}
          </p>
        </div>
        <div className="rounded-2xl bg-charcoal-900/40 border border-white/5 p-6 backdrop-blur-sm card-glow transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-indigo/10 text-brand-indigo mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">{t('benefit2Title')}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {t('benefit2Desc')}
          </p>
        </div>
        <div className="rounded-2xl bg-charcoal-900/40 border border-white/5 p-6 backdrop-blur-sm card-glow transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink/10 text-brand-pink mb-4">
            <PlayIcon className="h-5 w-5 text-brand-pink fill-brand-pink/20" />
          </div>
          <h3 className="text-lg font-bold text-white">{t('benefit3Title')}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {t('benefit3Desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
