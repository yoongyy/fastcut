'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Film, Globe, Link as LinkIcon, Check, Sparkles, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { language, t } = useLanguage();

  // Form Fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingStyle, setEditingStyle] = useState('XHS Vlog & Daily Life');
  const [captionLanguage, setCaptionLanguage] = useState('Auto-detect');
  const [captionStyle, setCaptionStyle] = useState('Bold Yellow-White (Hormozi)');
  const [videoUrl, setVideoUrl] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Capture selection from Pricing tier click events
  useEffect(() => {
    const handleTierSelection = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setSelectedTier(customEvent.detail);
        const formElement = document.getElementById('order-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('tier-selected', handleTierSelection);
    return () => {
      window.removeEventListener('tier-selected', handleTierSelection);
    };
  }, []);

  // Sync state if initial click happened before component loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTier = window.sessionStorage.getItem('selectedTier');
      if (savedTier) {
        setTimeout(() => {
          setSelectedTier(savedTier);
        }, 0);
      }
    }
  }, []);

  // Validation checkers
  const validateForm = () => {
    setError(null);
    if (!email) {
      setError(language === 'en' ? 'Email address is required.' : '请输入邮箱地址。');
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError(language === 'en' ? 'Please enter a valid email address.' : '请填写正确的邮箱格式。');
      return false;
    }
    if (!phone) {
      setError(language === 'en' ? 'Phone / WhatsApp number is required.' : '请输入手机/WhatsApp号码。');
      return false;
    }
    if (!editingStyle) {
      setError(language === 'en' ? 'Please select an editing style.' : '请选择剪辑风格主题。');
      return false;
    }
    if (!videoUrl) {
      setError(language === 'en' ? 'Video input URL link is required.' : '原片公开共享链接不能为空。');
      return false;
    }
    if (!videoUrl.startsWith('http://') && !videoUrl.startsWith('https://')) {
      setError(language === 'en' ? 'Please enter a valid URL starting with http:// or https://' : '链接格式错误，必须以 http:// 或 https:// 开头');
      return false;
    }
    return true;
  };

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const captionPreferences = `Language: ${captionLanguage} | Formatting: ${captionStyle}`;

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          videoUrl,
          editingStyle,
          captionPreferences,
          extraInstructions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details?.[0] || 'Something went wrong. Please try again.');
      }

      setOrderId(data.orderId);
      setSuccess(true);
      setEmail('');
      setPhone('');
      setVideoUrl('');
      setExtraInstructions('');
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('selectedTier');
      }
      setSelectedTier(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected server error occurred.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const styles = language === 'en'
    ? [
        { name: 'XHS Vlog & Daily Life', desc: 'Aesthetic layout, background music, transition beats, daily log styling.' },
        { name: 'TikTok/Shorts Hormozi Style', desc: 'Punchy words, bright emojis, rapid zoom adjustments, high engagement.' },
        { name: 'UGC Product Ad & Review', desc: 'Product feature callouts, visual hooks, fast-paced, high-conversion sales ads.' },
      ]
    : [
        { name: 'XHS Vlog & Daily Life', desc: '唯美滤镜排版、背景音乐搭配、舒适的生活记录，小红书最爱风格。' },
        { name: 'TikTok/Shorts Hormozi Style', desc: '放大粗体字、高饱和度表情符号、快速画面推拉，极力提升短视频完播留存。' },
        { name: 'UGC Product Ad & Review', desc: '产品开箱细节、核心痛点展示、快节奏引人入胜的种草带货视频。' },
      ];

  return (
    <section id="order-form" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('formTitleMain')}
          <span className="bg-gradient-to-r from-brand-purple to-brand-indigo bg-clip-text text-transparent">
            {t('formTitleHighlight')}
          </span>
        </h2>
        <p className="mt-4 text-base text-gray-400">
          {t('formSubtitle')}
        </p>
      </div>

      {selectedTier && (
        <div className="mb-6 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand-purple animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-white">{t('badgeSelectedTier')}{selectedTier}</p>
              <p className="text-xs text-gray-400">{t('badgeSelectedTierDesc')}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTier(null)}
            className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            {t('btnReset')}
          </button>
        </div>
      )}

      {/* Main Form Box */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal-900 p-8 sm:p-10 shadow-2xl">
        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-950/20 border border-red-500/30 p-4 text-red-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{t('errTitle')}</p>
              <p className="mt-0.5 text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">{t('successTitle')}</h3>
            <p className="mt-3 text-sm text-gray-400 max-w-md">
              {t('successDesc')}
            </p>

            <div className="mt-8 w-full max-w-md rounded-2xl bg-charcoal-950/80 border border-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-left">{t('successRef')}</p>
              <div className="mt-2 flex items-center justify-between gap-3 bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3">
                <code className="text-sm font-mono text-brand-purple font-bold select-all break-all text-left">{orderId}</code>
                <button
                  onClick={copyToClipboard}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Copy Order ID"
                >
                  {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => setSuccess(false)}
              className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 cursor-pointer"
            >
              {t('btnSubmitAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Customer Email */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t('step1Title')}</h3>
                  <p className="text-xs text-gray-500">{t('step1Desc')}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                    {t('labelEmail')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholderEmail')}
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {t('emailNote')}
                  </p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-300">
                    {t('labelPhone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('placeholderPhone')}
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {t('phoneNote')}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Section 2: Editing Style Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                  <Film className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t('step2Title')}</h3>
                  <p className="text-xs text-gray-500">{t('step2Desc')}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.name}
                    type="button"
                    onClick={() => setEditingStyle(style.name)}
                    className={`flex flex-col text-left rounded-2xl border p-5 transition-all outline-none cursor-pointer ${
                      editingStyle === style.name
                        ? 'border-brand-purple bg-brand-purple/5 shadow-md shadow-brand-purple/5'
                        : 'border-white/5 bg-charcoal-950 hover:bg-charcoal-800'
                    }`}
                  >
                    <span className="font-bold text-white text-base flex items-center justify-between">
                      {style.name}
                      {editingStyle === style.name && <Check className="h-5 w-5 text-brand-purple" />}
                    </span>
                    <span className="mt-1 text-sm text-gray-400">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Section 3: Captions & Formatting Preferences */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink/10 text-brand-pink">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t('step3Title')}</h3>
                  <p className="text-xs text-gray-500">{t('step3Desc')}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="captionLanguage" className="block text-sm font-semibold text-gray-300">
                    {t('labelLanguage')}
                  </label>
                  <select
                    id="captionLanguage"
                    value={captionLanguage}
                    onChange={(e) => setCaptionLanguage(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  >
                    <option value="Auto-detect">
                      {language === 'en' ? 'Auto-detect Language' : '自动识别语言'}
                    </option>
                    <option value="English">
                      {language === 'en' ? 'English Only' : '仅英语'}
                    </option>
                    <option value="Malay">
                      {language === 'en' ? 'Bahasa Melayu Only' : '仅马来语'}
                    </option>
                    <option value="Mandarin">
                      {language === 'en' ? 'Mandarin (Simplified)' : '仅中文简体'}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="captionStyle" className="block text-sm font-semibold text-gray-300">
                    {t('labelTheme')}
                  </label>
                  <select
                    id="captionStyle"
                    value={captionStyle}
                    onChange={(e) => setCaptionStyle(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  >
                    <option value="Bold Yellow-White (Hormozi)">
                      {language === 'en' ? 'Bold Yellow & White (Hormozi style)' : '粗体黄白文字 (Hormozi 经典风格)'}
                    </option>
                    <option value="Minimal Modern Sans">
                      {language === 'en' ? 'Minimal Modern (Clean Sans-serif)' : '极简现代风格 (无衬线扁平化)'}
                    </option>
                    <option value="Cinematic Gradient Bold">
                      {language === 'en' ? 'Cinematic Gradient (Bright neon glow)' : '电影感渐变霓虹 (边缘发光效果)'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Section 4: Video Input URL */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                  <LinkIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t('step4Title')}</h3>
                  <p className="text-xs text-gray-500">{t('step4Desc')}</p>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-300">
                  {t('labelVideoLink')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder={t('placeholderVideoLink')}
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                />
                <div className="mt-3 rounded-2xl bg-charcoal-950 border border-white/5 px-4 py-3 text-xs text-gray-400 space-y-2">
                  <p>💡 {t('uploadNote')}</p>
                  <p className="flex items-center gap-1">
                    <span>👉</span>
                    <a
                      href="https://gofile.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-purple hover:text-brand-pink transition-colors underline decoration-solid cursor-pointer"
                    >
                      {language === 'en' ? 'Open GoFile Upload Portal ↗' : '点击此处前往 GoFile 上传您的视频 ↗'}
                    </a>
                  </p>
                </div>
                <div className="mt-6">
                  <label htmlFor="extraInstructions" className="block text-sm font-semibold text-gray-300">
                    {t('labelInstructions')}
                  </label>
                  <textarea
                    id="extraInstructions"
                    name="extraInstructions"
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                    placeholder={t('placeholderInstructions')}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-950 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex items-center justify-end border-t border-white/5 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo px-8 py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all hover:opacity-90 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('btnSubmitting')}
                  </>
                ) : (
                  <>
                    {t('btnSubmit')}
                    <Check className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
