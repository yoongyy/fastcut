'use client';

import React from 'react';
import { ArrowRight, Sparkles, Play, Smile, Video, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 flex flex-col items-center">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-brand-indigo/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Creator Personal Profile Card */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative h-28 w-28 rounded-full p-1 bg-gradient-to-tr from-brand-purple via-brand-indigo to-brand-pink shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
            <div className="h-full w-full rounded-full bg-charcoal-900 flex items-center justify-center overflow-hidden">
              {/* Creator vector avatar icon representation */}
              <svg className="h-20 w-20 text-brand-purple/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            {/* Online Green dot status indicator */}
            <span className="absolute bottom-1.5 right-1.5 h-4.5 w-4.5 rounded-full border-4 border-charcoal-950 bg-green-500 flex items-center justify-center shadow" />
          </div>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-gray-300 mt-6 pointer-events-none">
            <Sparkles className="h-3.5 w-3.5 text-brand-purple animate-spin" style={{ animationDuration: '3s' }} />
            <span>{t('badgeText')}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="max-w-4xl mx-auto text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight sm:leading-none">
          {t('heroTitleMain')}
          <span className="bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-pink bg-clip-text text-transparent animate-glow">
            {t('heroTitleHighlight')}
          </span>
          {t('heroTitleEnd')}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl font-normal leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#order-form"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-indigo px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:opacity-95"
          >
            {t('btnStartEditing')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#before-after"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
          >
            <Play className="h-4 w-4 fill-white text-white" />
            {t('btnWatchDemo')}
          </a>
        </div>

        {/* Feature Highlights (Personalized) */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-800 border border-white/5">
              <Smile className="h-5 w-5 text-brand-purple" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">{t('featSpeedTitle')}</p>
              <p className="text-xs text-gray-500">{t('featSpeedDesc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-800 border border-white/5">
              <Video className="h-5 w-5 text-brand-pink" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">{t('featCaptionsTitle')}</p>
              <p className="text-xs text-gray-500">{t('featCaptionsDesc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-800 border border-white/5">
              <MessageCircle className="h-5 w-5 text-brand-indigo" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">{t('featUploadTitle')}</p>
              <p className="text-xs text-gray-500">{t('featUploadDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
