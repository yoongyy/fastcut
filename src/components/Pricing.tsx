'use client';

import React from 'react';
import { Check, Flame, Zap, Sparkles, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  accent: string;
}

export default function Pricing() {
  const { language, t } = useLanguage();

  const tiers: PricingTier[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'RM 25',
      description: language === 'en' 
        ? 'Best for quick daily vlogs, simple cuts, and short video updates.'
        : '适合日常快速小Vlog、生活记录和简单的精简裁剪。',
      features: language === 'en' 
        ? [
            'Finished video within 30s',
            'Suggested raw materials < 5 mins',
            '1 free revision edit',
            'Basic color & cut tuning',
            '720p HD output resolution',
          ]
        : [
            '成片时长 30 秒以内',
            '建议素材总时长 5 分钟以内',
            '免费修改 1 次',
            '基础剪辑与画面整理',
            '720p 高清画质输出',
          ],
      isPopular: false,
      ctaText: t('btnSelectTier'),
      accent: 'border-white/5 bg-charcoal-900/40 text-white',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 'RM 40',
      description: language === 'en'
        ? 'Great for transition edits, gaming clips, and engaging short feeds.'
        : '适合节奏感强的卡点剪辑、游戏高光和转场过渡短视频。',
      features: language === 'en'
        ? [
            'Finished video within 60s',
            'Suggested raw materials < 15 mins',
            '1 free revision edit',
            'Beats sync & Transition FX',
            'Standard subtitle insert',
            '1080p Full HD output',
          ]
        : [
            '成片时长 60 秒以内',
            '建议素材总时长 15 分钟以内',
            '免费修改 1 次',
            '音乐卡点与酷炫转场特效',
            '包含基础字幕整理',
            '1080p 全高清画质输出',
          ],
      isPopular: true,
      ctaText: t('btnLaunchTier'),
      accent: 'border-brand-purple bg-charcoal-900 shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-2 ring-brand-purple/50',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'RM 60',
      description: language === 'en'
        ? 'Perfect for high-retention vlogs, tutorials, and advanced dynamic styling.'
        : '小红书种草、教程讲解和高留存精剪的完美选择。',
      features: language === 'en'
        ? [
            'Finished video within 2 mins',
            'Suggested raw materials < 30 mins',
            '2 free revision edits',
            'Advanced transitions & FX',
            'Dynamic captions + Memes insert',
            'Full HD output + Color grading',
          ]
        : [
            '成片时长 2 分钟以内',
            '建议素材总时长 30 分钟以内',
            '免费修改 2 次',
            '高级转场与特效包装',
            '趣味表情包/梗图插入 + 动态字幕',
            '高清画质输出 + 电影感画面调色',
          ],
      isPopular: false,
      ctaText: t('btnStartTier'),
      accent: 'border-white/5 bg-charcoal-900/40 text-white',
    },
  ];

  const addOns = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: language === 'en' ? '24h Express Turnaround' : '24小时加急出片',
      price: '+RM 10',
      desc: language === 'en' ? 'Deliver your edited file within 24 hours.' : '下单后24小时内闪电交片。',
    },
    {
      icon: <Sparkles className="h-5 w-5 text-brand-purple" />,
      title: language === 'en' ? 'Special Effect Captions' : '特效/动态字幕',
      price: '+RM 5',
      desc: language === 'en' ? 'Add Hormozi style animated font effects.' : '添加炫酷的网红动态特效字幕。',
    },
    {
      icon: <Globe className="h-5 w-5 text-brand-indigo" />,
      title: language === 'en' ? 'Bilingual Subtitles' : '双语字幕',
      price: '+RM 5',
      desc: language === 'en' ? 'Add English/Chinese translation text.' : '中英/中马双语对照字幕。',
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-brand-pink" />,
      title: language === 'en' ? 'Extra Revision edits' : '额外修改次数',
      price: '+RM 5 / edit',
      desc: language === 'en' ? 'Purchase additional round of corrections.' : '可按需增加额外一轮修改修改。',
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-indigo/5 blur-[80px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-indigo/10 px-3 py-1 text-xs font-semibold text-brand-indigo mb-4">
          <Flame className="h-3.5 w-3.5" />
          <span>{language === 'en' ? 'Pay Per Video' : '平价视频剪辑服务'}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('priceTitleMain')}
          <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">
            {t('priceTitleHighlight')}
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          {t('priceSubtitle')}
        </p>
      </div>

      {/* Grid of Main 3 tiers */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch mb-20">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 hover:scale-[1.02] ${tier.accent}`}
          >
            <div>
              {/* Popular Tag */}
              {tier.isPopular && (
                <div className="self-start inline-flex items-center gap-1 rounded-full bg-brand-purple px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white mb-6">
                  {t('pricePopular')}
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white tracking-tight">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-400 min-h-[40px]">{tier.description}</p>
              
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight text-white">{tier.price}</span>
                <span className="text-sm font-medium text-gray-400">{t('priceMo')}</span>
              </div>

              {/* Feature list */}
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`h-5 w-5 shrink-0 ${tier.isPopular ? 'text-brand-purple' : 'text-brand-indigo'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="#order-form"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem('selectedTier', tier.name);
                    window.dispatchEvent(new CustomEvent('tier-selected', { detail: tier.name }));
                  }
                }}
                className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-center text-sm font-bold transition-all ${
                  tier.isPopular
                    ? 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white hover:opacity-90 shadow-md shadow-brand-purple/20'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons Section (附加服务) */}
      <div className="rounded-3xl border border-white/10 bg-charcoal-900/40 p-8 sm:p-10 backdrop-blur-sm relative">
        <div className="absolute top-0 right-10 -translate-y-1/2 rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-1 text-xs font-semibold text-brand-purple">
          ✨ {language === 'en' ? 'Optional Enhancements' : '可加购项目'}
        </div>
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <span>{language === 'en' ? 'Add-on Services' : '附加服务'}</span>
          <span className="text-xs font-medium text-gray-500 font-sans">
            ({language === 'en' ? 'Customize your edit' : '最终报价将根据素材时长及剪辑复杂度做微调'})
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((addOn) => (
            <div
              key={addOn.title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-charcoal-950/60 border border-white/5 transition-all hover:border-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-800 border border-white/5">
                {addOn.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{addOn.title}</h4>
                  <span className="text-sm font-extrabold text-brand-purple shrink-0">{addOn.price}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">{addOn.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
