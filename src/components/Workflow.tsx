'use client';

import React from 'react';
import { 
  ClipboardList, 
  Coins, 
  FolderInput, 
  Clapperboard, 
  PlaySquare, 
  FileEdit, 
  FileCheck, 
  Clock, 
  Zap, 
  Check, 
  Unlock, 
  Lock, 
  Trash2, 
  AlertCircle, 
  ArrowRight,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Workflow() {
  const { t } = useLanguage();

  const steps = [
    { num: '1', icon: <ClipboardList className="h-6 w-6 text-brand-purple" />, text: t('wfStep1') },
    { num: '2', icon: <Coins className="h-6 w-6 text-yellow-500" />, text: t('wfStep2') },
    { num: '3', icon: <FolderInput className="h-6 w-6 text-brand-indigo" />, text: t('wfStep3') },
    { num: '4', icon: <Clapperboard className="h-6 w-6 text-brand-pink" />, text: t('wfStep4') },
    { num: '5', icon: <PlaySquare className="h-6 w-6 text-blue-400" />, text: t('wfStep5') },
    { num: '6', icon: <FileEdit className="h-6 w-6 text-orange-400" />, text: t('wfStep6') },
    { num: '7', icon: <FileCheck className="h-6 w-6 text-green-400" />, text: t('wfStep7') },
  ];

  return (
    <section id="workflow" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center justify-center gap-2">
          <span className="inline-block h-4 w-4 rounded-full bg-brand-purple animate-ping shrink-0" />
          <span>{t('wfTitleMain')}</span>
          <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">
            {t('wfTitleHighlight')}
          </span>
        </h2>
        <p className="mt-4 text-base text-gray-400">
          {t('wfSubtitle')}
        </p>
      </div>

      {/* Grid structure matching the photo */}
      <div className="space-y-6">
        
        {/* Block 01: Service Flow */}
        <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-10 -translate-y-1/2 rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-1 text-xs font-semibold text-brand-purple">
            🚀 Workflow
          </div>
          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">01</span>
            <span>{t('wfFlowTitle')}</span>
          </h3>

          {/* Horizontal Steps Panel */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7 items-center justify-between">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-charcoal-950/60 border border-white/5 relative transition-all hover:border-brand-purple/30 group">
                  {/* Step bubble */}
                  <div className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal-800 text-[10px] font-bold text-gray-500 border border-white/10 group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple/20 transition-all">
                    {step.num}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal-900 border border-white/5 mb-3 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{step.text}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center items-center text-gray-600">
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 2-Column Grid for Blocks 02 - 05 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Block 02: Turnaround Time */}
          <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">02</span>
              <span>{t('wfTimeTitle')}</span>
            </h3>
            <div className="space-y-4">
              {/* Standard */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-charcoal-950/60 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal-900 text-gray-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-300">{t('wfTimeStandard')}</span>
                </div>
                <span className="text-base font-extrabold text-white">{t('wfTimeStandardVal')}</span>
              </div>
              {/* Express */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-purple/5 border border-brand-purple/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                    <Zap className="h-5 w-5 text-brand-purple" />
                  </div>
                  <span className="text-sm font-semibold text-brand-purple">{t('wfTimeExpress')}</span>
                </div>
                <span className="text-base font-extrabold text-white">{t('wfTimeExpressVal')}</span>
              </div>
            </div>
          </div>

          {/* Block 03: Revisions Policy */}
          <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative">
            <div className="absolute top-6 right-6 text-gray-600">
              <Settings className="h-8 w-8 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">03</span>
              <span>{t('wfRevTitle')}</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="h-5 w-5 text-brand-purple shrink-0 mt-0.5" />
                <span>{t('wfRevBasic')}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="h-5 w-5 text-brand-purple shrink-0 mt-0.5" />
                <span>{t('wfRevPremium')}</span>
              </div>
              <hr className="border-white/5 my-2" />
              <div className="flex items-start gap-3 text-sm text-gray-300 font-bold">
                <Check className="h-5 w-5 text-brand-pink shrink-0 mt-0.5" />
                <span className="text-brand-pink">{t('wfRevExtra')}</span>
              </div>
            </div>
          </div>

          {/* Block 04: Preview Rules */}
          <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">04</span>
              <span>{t('wfPrevTitle')}</span>
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-charcoal-950/60 border border-white/5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <Lock className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t('wfPrevNote1')}</p>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <Unlock className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t('wfPrevNote2')}</p>
              </div>
            </div>
          </div>

          {/* Block 05: Exclusions */}
          <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative">
            <div className="absolute bottom-6 right-6 text-gray-700/30">
              <Trash2 className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">05</span>
              <span>{t('wfExclTitle')}</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl3')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl4')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl5')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('wfExcl6')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Block 06: Important Notes */}
        <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-6 sm:p-8 backdrop-blur-sm relative">
          <div className="absolute top-6 right-6 text-gray-600">
            <AlertCircle className="h-8 w-8 animate-bounce" />
          </div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-xs text-white font-extrabold">06</span>
            <span>{t('wfNotesTitle')}</span>
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-400">
            <li>{t('wfNotes1')}</li>
            <li>{t('wfNotes2')}</li>
            <li>{t('wfNotes3')}</li>
            <li>{t('wfNotes4')}</li>
          </ul>
        </div>


      </div>
    </section>
  );
}
