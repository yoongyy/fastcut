'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    navBeforeAfter: 'Before & After',
    navPricing: 'Pricing',
    navWorkflow: 'How It Works',
    btnOrderNow: 'Order Now',

    // Hero
    badgeText: 'Independent Creative Video Editor',
    heroTitleMain: 'Hi, I am Kenny — Your ',
    heroTitleHighlight: 'Personal Video Editor',
    heroTitleEnd: '',
    heroSubtitle: 'Helping creators, vloggers, and brands stand out on Xiaohongshu & TikTok. Send me your raw footage, and let me handle the storytelling.',
    btnStartEditing: 'Hire Me Now',
    btnWatchDemo: 'View My Work',
    featSpeedTitle: 'Independent Turnaround',
    featSpeedDesc: 'Deliveries completed within 24-48 hours',
    featCaptionsTitle: 'High-Retention Captions',
    featCaptionsDesc: 'Dynamically animated subtitles tailored to XHS',
    featUploadTitle: 'Direct WhatsApp Sync',
    featUploadDesc: 'Easy updates and customized request chats',

    // Before After
    baTitleMain: 'My Editing ',
    baTitleHighlight: 'Before & After Showcase',
    baSubtitle: 'Slide the handler to see the difference between raw clip footage and my fully processed output.',
    baRawLabel: 'Unedited Raw Clip',
    baPolishLabel: 'My Polish Cut',
    baCaptionBadge: '🚨 DYNAMIC RETENTION STYLING! 🚨',
    baEngineBadge: '🔥 INDEPENDENT CREATIVE CUT',
    benefit1Title: 'Vibrant Grading',
    benefit1Desc: 'Enhance raw contrast, brighten highlights, and match Xiaohongshu aesthetic color filters.',
    benefit2Title: 'Audio Sync & FX',
    benefit2Desc: 'Trim pauses, sync beats to dynamic audio, and inject funny sound effects at semantic moments.',
    benefit3Title: 'Stickers & Subtitles',
    benefit3Desc: 'Design bold keyphrase subtitles, floating emoji blocks, and custom branding overlays.',

    // Pricing
    priceTitleMain: 'Video Editing Services ',
    priceTitleHighlight: 'With Creator-Friendly Rates',
    priceSubtitle: 'Super affordable pay-per-video pricing starting from just RM 25. High quality, student friendly, perfect for XHS, Douyin, Vlogs & Shorts.',
    pricePopular: '🔥 Best Seller',
    priceMo: ' / video',
    btnSelectTier: 'Select Basic Tier',
    btnLaunchTier: 'Select Standard Tier',
    btnStartTier: 'Select Premium Tier',

    // OrderForm
    formTitleMain: 'Submit Your ',
    formTitleHighlight: 'Editing Order',
    formSubtitle: 'Ready to scale your reach? Let our AI engine process your footage. Complete the multi-step form below.',
    badgeSelectedTier: 'Selected package: ',
    badgeSelectedTierDesc: 'We will configure editing options tailored to this tier.',
    btnReset: 'Reset',
    step1Title: 'Contact Info',
    step1Desc: 'Provide your billing and communication email',
    labelEmail: 'Email Address',
    placeholderEmail: 'creator@channel.com',
    emailNote: 'We will send project status notifications and outputs to this email.',
    labelPhone: 'Phone / WhatsApp Number',
    placeholderPhone: '+60 12-345 6789',
    phoneNote: 'We will use this to send project progress updates.',
    step2Title: 'Select Editing Style',
    step2Desc: 'Pick the tone and layout matching your audience',
    step3Title: 'Subtitle Formatting',
    step3Desc: 'Fine-tune the caption languages and aesthetic layout',
    labelLanguage: 'Caption Language',
    labelTheme: 'Caption Typography Theme',
    step4Title: 'Video Input Link',
    step4Desc: 'Paste your public sharing download link',
    labelVideoLink: 'Video Sharing / Download Link',
    placeholderVideoLink: 'https://gofile.io/d/...',
    uploadNote: 'Please upload your raw video to GoFile or Google Drive and paste the public sharing/download link here. Max file size: 2GB. Ensure permissions are set to "Anyone with the link can view".',
    labelInstructions: 'Extra Instructions / Requests (Optional)',
    placeholderInstructions: 'e.g. Add zooming effect at 12s on facecam, keep dynamic music, output format 9:16 vertical...',
    btnBack: 'Back',
    btnNext: 'Next Step',
    btnSubmit: 'Submit Video Order',
    btnSubmitting: 'Creating Order...',
    errTitle: 'Error submitting order',
    successTitle: 'Order Received!',
    successDesc: 'Your video has been added to our processing queue. We have sent a confirmation email containing these details.',
    successRef: 'Your Order Reference ID',
    btnSubmitAnother: 'Submit Another Video',

    // Workflow (How It Works)
    wfTitleMain: 'Order Guidelines ',
    wfTitleHighlight: '& Service Flow',
    wfSubtitle: 'Thank you for your trust · I will treat every project with dedication ♡',
    wfFlowTitle: '01 【 Service Flow 】',
    wfStep1: 'Fill Form',
    wfStep2: '50% Deposit',
    wfStep3: 'Send Footage',
    wfStep4: 'Start Editing',
    wfStep5: 'Preview Export',
    wfStep6: 'Revision/Edit',
    wfStep7: 'HD Delivery',
    wfTimeTitle: '02 【 Delivery Time 】',
    wfTimeStandard: 'Standard Order',
    wfTimeStandardVal: '1-3 Business Days',
    wfTimeExpress: 'Express Order',
    wfTimeExpressVal: 'Within 24 Hours (+RM10)',
    wfRevTitle: '03 【 Revision Policy 】',
    wfRevBasic: 'Basic / Standard: 1 Free Revision',
    wfRevPremium: 'Premium: 2 Free Revisions',
    wfRevExtra: 'Extra Revisions: RM5 / edit',
    wfPrevTitle: '04 【 Preview Details 】',
    wfPrevNote1: 'Completed edits are first provided as a low-res watermarked preview.',
    wfPrevNote2: 'The final full-HD clean output is delivered once approved and paid.',
    wfExclTitle: '05 【 Exclusions 】',
    wfExcl1: 'Advanced color grading',
    wfExcl2: 'AI-generated elements',
    wfExcl3: 'Complex custom animation / VFX',
    wfExcl4: '3D Special Effects',
    wfExcl5: 'Filming / Shoots',
    wfExcl6: 'Licensed commercial music',
    wfNotesTitle: '06 【 Important Notes 】',
    wfNotes1: 'Client must provide all raw footage & assets.',
    wfNotes2: 'Highly recommended to provide references/examples.',
    wfNotes3: 'Major editing changes after starting may count as a new project.',
    wfNotes4: 'Final quote subject to adjustments based on footage & complexity.',
    wfStudentBadge: 'Student Creator Accepting Commissions ✨',
    wfStudentBadgeSub: '--- Student Friendly rates | Dedicated editing | Portfolio collection -- ♡',
    
    // Legal & Support
    footerDesc: 'Transform your raw stream VODs and podcast video feeds into premium viral clips. Engineered for high-retention feeds.',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Legal & Support',
    footerRefund: 'RM Refund Guaranteed',
    footerBuildInfo: 'Built for high-retention creators using Next.js & Tailwind CSS.',
  },
  zh: {
    // Navbar
    navBeforeAfter: '对比效果',
    navPricing: '服务定价',
    navWorkflow: '工作流程',
    btnOrderNow: '立即下单',

    // Hero
    badgeText: '小红书/短视频独立剪辑师',
    heroTitleMain: '您好，我是 Kenny — 您的 ',
    heroTitleHighlight: '专属独立剪辑师',
    heroTitleEnd: '',
    heroSubtitle: '致力于帮助小红书与 TikTok 创作者制作精美的爆款短视频。交给我，把繁琐的剪辑交给我，让您的故事闪闪发光。',
    btnStartEditing: '立即预约剪辑',
    btnWatchDemo: '查看剪辑案例',
    featSpeedTitle: '独立快速出片',
    featSpeedDesc: '通常于 24 至 48 小时内交片',
    featCaptionsTitle: '网红加亮字幕',
    featCaptionsDesc: '提供中英/双语、网红动态花字字幕',
    featUploadTitle: 'WhatsApp 一对一',
    featUploadDesc: '剪辑进度与要求随时高效沟通',

    // Before After
    baTitleMain: '剪辑效果案例展示：',
    baTitleHighlight: '原片 vs 精修对比',
    baSubtitle: '滑动拉杆，直观对比原片与我精剪调色、卡点配乐后的效果差异。',
    baRawLabel: '客户原片素材',
    baPolishLabel: '精修剪辑成片',
    baCaptionBadge: '🚨 画面黄金分割卡点！🚨',
    baEngineBadge: '🔥 INDEPENDENT CREATIVE CUT',
    benefit1Title: '画面调色美化',
    benefit1Desc: '美化画面对比度、提亮面部肤色，搭配适合小红书的清新/高级感电影调色滤镜。',
    benefit2Title: '音乐卡点与音效',
    benefit2Desc: '裁剪无声卡顿、配合音乐卡点过渡，并在关键节点加入趣味转场风声及弹跳音效。',
    benefit3Title: '特色花字与字幕',
    benefit3Desc: '定制网红风格的花字字幕、浮动表情包标记，以及个性化个人水印挂件。',

    // Pricing
    priceTitleMain: '平价视频剪辑服务 ',
    priceTitleHighlight: '小红书/短视频平价接单',
    priceSubtitle: '价格亲民，学生党友好。极具性价比的单次成片计费，用心剪辑完成每一支视频。',
    pricePopular: '🔥 热门推荐',
    priceMo: ' / 支',
    btnSelectTier: '选择 Basic 基础版',
    btnLaunchTier: '选择 Standard 标准版',
    btnStartTier: '选择 Premium 专业版',

    // OrderForm
    formTitleMain: '提交您的 ',
    formTitleHighlight: '视频剪辑订单',
    formSubtitle: '准备好引爆流量了吗？让我们的 AI 引擎处理您的素材。请填写下方步骤表单。',
    badgeSelectedTier: '已选套餐: ',
    badgeSelectedTierDesc: '我们将为您配置适用于该套餐的剪辑选项。',
    btnReset: '重置',
    step1Title: '联系方式',
    step1Desc: '填写您的账单及沟通邮箱',
    labelEmail: '邮箱地址',
    placeholderEmail: 'creator@channel.com',
    emailNote: '我们将向此邮箱发送项目进度通知和最终视频成果。',
    labelPhone: '手机 / WhatsApp 号码',
    placeholderPhone: '+60 12-345 6789',
    phoneNote: '我们将使用此号码与您沟通剪辑进度及 WhatsApp 对接。',
    step2Title: '选择剪辑风格',
    step2Desc: '选择契合您受众偏好的基调与排版',
    step3Title: '字幕排版配置',
    step3Desc: '细化配置字幕语言与美化主题',
    labelLanguage: '字幕语言',
    labelTheme: '字幕字体主题',
    step4Title: '原视频链接',
    step4Desc: '粘贴您的公开分享/下载链接',
    labelVideoLink: '视频分享 / 下载链接',
    placeholderVideoLink: 'https://gofile.io/d/...',
    uploadNote: '请将您的原视频上传至 GoFile 或 Google Drive，并将公开分享链接粘贴在此处。最大文件限制：2GB。请确保链接权限已设为“任何拥有链接的人都可查看/下载”。',
    labelInstructions: '额外剪辑要求 / 备注 (选填)',
    placeholderInstructions: '例如：在第12秒处做主播大脸特写、添加轻快背景音乐、视频比例设为 9:16 竖版...',
    btnBack: '上一步',
    btnNext: '下一步',
    btnSubmit: '提交视频订单',
    btnSubmitting: '订单创建中...',
    errTitle: '订单提交失败',
    successTitle: '订单提交成功！',
    successDesc: '您的视频已被添加到我们的处理队列中。确认邮件已发送至您的邮箱。',
    successRef: '您的订单参考 ID',
    btnSubmitAnother: '提交另一部视频',

    // Workflow (How It Works)
    wfTitleMain: '下单须知 ',
    wfTitleHighlight: '与服务流程',
    wfSubtitle: '感谢你的信任 · 我会认真对待每一个作品 ♡',
    wfFlowTitle: '01 【 服务流程 】',
    wfStep1: '填写表单',
    wfStep2: '一半定金',
    wfStep3: '提供素材',
    wfStep4: '开始剪辑',
    wfStep5: '低画质预览',
    wfStep6: '修改调整',
    wfStep7: '高清交付',
    wfTimeTitle: '02 【 交付时间 】',
    wfTimeStandard: '普通订单',
    wfTimeStandardVal: '1-3 个工作天',
    wfTimeExpress: '加急订单',
    wfTimeExpressVal: '24 小时内完成 (+RM10)',
    wfRevTitle: '03 【 修改规则 】',
    wfRevBasic: 'Basic / Standard: 免费修改 1 次',
    wfRevPremium: 'Premium: 免费修改 2 次',
    wfRevExtra: '额外修改: RM5 / 次',
    wfPrevTitle: '04 【 预览说明 】',
    wfPrevNote1: '成品将先提供低画质带水印预览版进行校验。',
    wfPrevNote2: '确认满意并结清尾款后，交付最终无水印高清版本。',
    wfExclTitle: '05 【 不包含项目 】',
    wfExcl1: '高级调色调色',
    wfExcl2: 'AI 视频/图像生成内容',
    wfExcl3: '复杂动画制作',
    wfExcl4: '3D 特效包装',
    wfExcl5: '线下拍摄服务',
    wfExcl6: '商业版权音乐购买',
    wfNotesTitle: '06 【 注意事项 】',
    wfNotes1: '客户需提供所有基础素材与原视频。',
    wfNotes2: '建议提供参考风格影片或样片。',
    wfNotes3: '开始制作后如需大幅修改可能视为新项目重新计费。',
    wfNotes4: '最终报价将根据素材数量、总时长及剪辑复杂度调整。',
    wfStudentBadge: '在籍大学生接单 ✨',
    wfStudentBadgeSub: '--- 平价收费 | 认真制作 | 持续累积作品集 -- ♡',
    
    // Legal & Support
    footerDesc: '将您的原始直播 VOD 和播客视频源转换成高完播率的精修爆款切片。',
    footerQuickLinks: '快速链接',
    footerLegal: '法律与支持',
    footerRefund: '未剪辑完承诺退款保障',
    footerBuildInfo: '使用 Next.js & Tailwind CSS 为高产创作者倾情打造。',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const val = translations[language][key];
    return val !== undefined ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
