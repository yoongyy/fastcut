'use client';

import React, { useState } from 'react';
import { Video, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-charcoal-900/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Fast <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">Cut</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#before-after" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {t('navBeforeAfter')}
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {t('navPricing')}
            </a>
            <a href="#workflow" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {t('navWorkflow')}
            </a>
          </nav>

          {/* Controls & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-0.5 bg-charcoal-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-tr from-brand-indigo to-brand-purple text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'zh'
                    ? 'bg-gradient-to-tr from-brand-indigo to-brand-purple text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                中文
              </button>
            </div>

            <a
              href="#order-form"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:opacity-90 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              {t('btnOrderNow')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Language Selector */}
            <div className="flex items-center gap-0.5 bg-charcoal-950 p-0.5 rounded-lg border border-white/5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-2xs font-bold rounded transition-all cursor-pointer ${
                  language === 'en' ? 'bg-gradient-to-tr from-brand-indigo to-brand-purple text-white' : 'text-gray-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2 py-0.5 text-2xs font-bold rounded transition-all cursor-pointer ${
                  language === 'zh' ? 'bg-gradient-to-tr from-brand-indigo to-brand-purple text-white' : 'text-gray-400'
                }`}
              >
                中文
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-charcoal-900 px-4 py-4 space-y-3">
          <a
            href="#before-after"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
          >
            {t('navBeforeAfter')}
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
          >
            {t('navPricing')}
          </a>
          <a
            href="#workflow"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
          >
            {t('navWorkflow')}
          </a>
          <a
            href="#order-form"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo px-4 py-2.5 text-base font-semibold text-white shadow-lg"
          >
            <span>{t('btnOrderNow')}</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      )}
    </header>
  );
}
