'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BeforeAfter from '@/components/BeforeAfter';
import Workflow from '@/components/Workflow';
import Pricing from '@/components/Pricing';
import OrderForm from '@/components/OrderForm';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Video, Mail, ShieldAlert, Cpu } from 'lucide-react';

function LandingPageContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-950 font-sans selection:bg-brand-purple/20 selection:text-white">
      {/* Navbar Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Before and After Interactive Showcase */}
        <BeforeAfter />

        {/* How It Works Guidelines Section */}
        <Workflow />

        {/* Pricing Tier Section */}
        <Pricing />

        {/* Multi-Step Order Submission Form */}
        <OrderForm />
      </main>

      {/* Premium Footer */}
      <footer className="bg-charcoal-950 border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-purple">
                  <Video className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Fast <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">Cut</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-sm">
                {t('footerDesc')}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
                {t('footerQuickLinks')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#before-after" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t('navBeforeAfter')}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t('navPricing')}
                  </a>
                </li>
                <li>
                  <a href="#order-form" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t('formTitleHighlight')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
                {t('footerLegal')}
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="h-4 w-4 text-brand-purple" />
                  <a href="mailto:support@fastcut.ai" className="hover:text-white transition-colors">
                    support@fastcut.ai
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <ShieldAlert className="h-4 w-4 text-brand-indigo" />
                  <span className="text-xs">{t('footerRefund')}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Cpu className="h-4 w-4 text-brand-pink animate-pulse" />
                  <span className="text-xs">Vercel & MongoDB Online</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Fast Cut. All rights reserved.</p>
            <p className="text-xs text-gray-600">{t('footerBuildInfo')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <LandingPageContent />
    </LanguageProvider>
  );
}
