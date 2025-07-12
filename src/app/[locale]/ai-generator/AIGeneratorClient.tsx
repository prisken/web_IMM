'use client';

import { useState } from 'react';

interface StoryboardFrame {
  id: number;
  description: string;
  visual: string;
  duration: number;
  camera: string;
  audio: string;
  imageUrl?: string;
}

interface GeneratedStoryboard {
  frames: StoryboardFrame[];
  summary: string;
  totalDuration: number;
  estimatedBudget: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface AIGeneratorClientProps {
  translations: any;
  locale: string;
}

export default function AIGeneratorClient({ translations, locale }: AIGeneratorClientProps) {
  const t = translations;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [outputLanguage, setOutputLanguage] = useState<'en' | 'zh'>(locale as 'en' | 'zh');
  const [formData, setFormData] = useState({
    projectType: '',
    industry: '',
    targetAudience: {
      ageRange: '',
      gender: ''
    },
    brandName: '',
    productDescription: '',
    keyMessage: '',
    tone: '',
    duration: '',
    budget: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStoryboard, setGeneratedStoryboard] = useState<GeneratedStoryboard | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    currentStep: 0,
    totalSteps: 4,
    currentMessage: '',
    progress: 0
  });
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTargetAudienceChange = (field: 'ageRange' | 'gender', value: string) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [field]: value
      }
    }));
    // Clear validation error when user starts typing
    const errorKey = `targetAudience.${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
    // Clear validation error when user starts typing
    const errorKey = `contactInfo.${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow various phone formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateContactInfo = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validate name
    if (!validateRequired(formData.contactInfo.name)) {
      errors['contactInfo.name'] = t.validation.name;
      isValid = false;
    }

    // Validate email
    if (!validateRequired(formData.contactInfo.email)) {
      errors['contactInfo.email'] = t.validation.required;
      isValid = false;
    } else if (!validateEmail(formData.contactInfo.email)) {
      errors['contactInfo.email'] = t.validation.email;
      isValid = false;
    }

    // Validate phone (optional but if provided, must be valid)
    if (formData.contactInfo.phone && !validatePhone(formData.contactInfo.phone)) {
      errors['contactInfo.phone'] = t.validation.phone;
      isValid = false;
    }

    // Validate company (optional but if provided, must not be empty)
    if (formData.contactInfo.company && !validateRequired(formData.contactInfo.company)) {
      errors['contactInfo.company'] = t.validation.company;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const validateProjectDetails = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validate required project fields
    if (!validateRequired(formData.projectType)) {
      errors['projectType'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.industry)) {
      errors['industry'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.targetAudience.ageRange)) {
      errors['targetAudience.ageRange'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.targetAudience.gender)) {
      errors['targetAudience.gender'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.brandName)) {
      errors['brandName'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.productDescription)) {
      errors['productDescription'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.keyMessage)) {
      errors['keyMessage'] = t.validation.required;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const validateBrandMessage = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!validateRequired(formData.tone)) {
      errors['tone'] = t.validation.required;
      isValid = false;
    }

    if (!validateRequired(formData.duration)) {
      errors['duration'] = t.validation.required;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return validateProjectDetails();
      case 2:
        return validateBrandMessage();
      case 4:
        return validateContactInfo();
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateStoryboard = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedContent([]);
    setGenerationProgress({
      currentStep: 1,
      totalSteps: 4,
      currentMessage: t.loading.steps.analyzing,
      progress: 10
    });

    try {
      // Use the backend API instead of local endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/generate-storyboard-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-locale': locale,
        },
        body: JSON.stringify({
          ...formData,
          outputLanguage
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        buffer += chunk;
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = line.slice(6).trim();
              if (!jsonData) continue; // Skip empty lines
              
              const data = JSON.parse(jsonData);
              
              if (data.type === 'progress') {
                setGenerationProgress({
                  currentStep: data.step,
                  totalSteps: 4,
                  currentMessage: data.message,
                  progress: data.progress
                });
              } else if (data.type === 'content') {
                setGeneratedContent(prev => [...prev, data.content]);
              } else if (data.type === 'complete') {
                setGeneratedStoryboard(data.storyboard);
                setCurrentStep(4);
                setGenerationProgress({
                  currentStep: 4,
                  totalSteps: 4,
                  currentMessage: data.message,
                  progress: 100
                });
                setIsGenerating(false);
                return;
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating storyboard:', error);
      setIsGenerating(false);
    }
  };

  const translateStoryboard = async () => {
    if (!generatedStoryboard) return;

    setIsTranslating(true);
    try {
      // Use the backend API instead of local endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/translate-storyboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyboard: generatedStoryboard,
          targetLanguage: 'zh'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const translatedStoryboard = await response.json();
      setGeneratedStoryboard(translatedStoryboard);
    } catch (error) {
      console.error('Error translating storyboard:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const getFieldError = (fieldPath: string): string => {
    return validationErrors[fieldPath] || '';
  };

  const steps = [
    { id: 1, title: t.steps.projectDetails.title },
    { id: 2, title: t.steps.brandMessage.title },
    { id: 3, title: t.steps.creativeDirection.title },
    { id: 4, title: t.steps.contactInfo.title }
  ];

  // Check if storyboard content is in English
  const isEnglishStoryboard = generatedStoryboard && 
    generatedStoryboard.frames && 
    generatedStoryboard.frames.length > 0 &&
    /[a-zA-Z]/.test(generatedStoryboard.frames[0].description);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.header.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.header.title}
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t.header.description}
          </p>
          
          {/* Language Toggle */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-2 flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Output Language:</span>
              <button
                onClick={() => setOutputLanguage('en')}
                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  outputLanguage === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setOutputLanguage('zh')}
                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  outputLanguage === 'zh'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                中文
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Progress Steps */}
          <div className="md:hidden">
            <div className="flex items-center justify-center space-x-2 mb-3">
              {steps.map((step) => (
                <div key={step.id} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${
                currentStep === 1 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {steps[currentStep - 1]?.title}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Step {currentStep} of {steps.length}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Generation Progress */}
        {isGenerating && (
          <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">{t.loading.title}</h3>
            <p className="text-xs sm:text-sm text-blue-600 mb-4">{t.loading.subtitle}</p>
            <div className="mb-4 w-full bg-blue-100 rounded-full h-2 sm:h-2.5">
              <div
                className="bg-blue-600 h-2 sm:h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${generationProgress.progress || 10}%` }}
              />
            </div>
            <div className="text-xs text-blue-700 mb-2">
              {locale === 'zh' 
                ? `進度：已完成 ${generationProgress.currentStep || 1}/${generationProgress.totalSteps || 4} 個步驟`
                : `Progress: ${generationProgress.currentStep || 1}/${generationProgress.totalSteps || 4} steps completed`
              }
            </div>
            <ul className="text-xs sm:text-sm text-gray-800 space-y-2">
              {generatedContent.length > 0 ? (
                generatedContent.map((content, idx) => (
                  <li key={idx}>{content}</li>
                ))
              ) : (
                <li>{t.loading.subtitle} Please be patient while we generate your storyboard...</li>
              )}
            </ul>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.steps.projectDetails.title}</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.projectType.label}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                    getFieldError('projectType') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t.form.projectType.placeholder}</option>
                  <option value="tvc">{t.form.projectType.options.tvc}</option>
                  <option value="kol">{t.form.projectType.options.kol}</option>
                  <option value="brand">{t.form.projectType.options.brand}</option>
                  <option value="social">{t.form.projectType.options.social}</option>
                  <option value="corporate">{t.form.projectType.options.corporate}</option>
                </select>
                {getFieldError('projectType') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('projectType')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.industry.label}
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                    getFieldError('industry') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t.form.industry.placeholder}</option>
                  <option value="technology">{t.form.industry.options.technology}</option>
                  <option value="fashion">{t.form.industry.options.fashion}</option>
                  <option value="food">{t.form.industry.options.food}</option>
                  <option value="finance">{t.form.industry.options.finance}</option>
                  <option value="healthcare">{t.form.industry.options.healthcare}</option>
                  <option value="education">{t.form.industry.options.education}</option>
                  <option value="automotive">{t.form.industry.options.automotive}</option>
                  <option value="realEstate">{t.form.industry.options.realEstate}</option>
                  <option value="other">{t.form.industry.options.other}</option>
                </select>
                {getFieldError('industry') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('industry')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.targetAudience.label}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={formData.targetAudience.ageRange}
                      onChange={(e) => handleTargetAudienceChange('ageRange', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                        getFieldError('targetAudience.ageRange') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{t.form.targetAudience.ageRange.placeholder}</option>
                      <option value="children">{t.form.targetAudience.ageRange.options.children}</option>
                      <option value="teens">{t.form.targetAudience.ageRange.options.teens}</option>
                      <option value="youngAdults">{t.form.targetAudience.ageRange.options.youngAdults}</option>
                      <option value="adults">{t.form.targetAudience.ageRange.options.adults}</option>
                      <option value="middleAge">{t.form.targetAudience.ageRange.options.middleAge}</option>
                      <option value="seniors">{t.form.targetAudience.ageRange.options.seniors}</option>
                      <option value="allAges">{t.form.targetAudience.ageRange.options.allAges}</option>
                    </select>
                    {getFieldError('targetAudience.ageRange') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('targetAudience.ageRange')}</p>
                    )}
                  </div>
                  <div>
                    <select
                      value={formData.targetAudience.gender}
                      onChange={(e) => handleTargetAudienceChange('gender', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                        getFieldError('targetAudience.gender') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{t.form.targetAudience.gender.placeholder}</option>
                      <option value="male">{t.form.targetAudience.gender.options.male}</option>
                      <option value="female">{t.form.targetAudience.gender.options.female}</option>
                      <option value="allGender">{t.form.targetAudience.gender.options.allGender}</option>
                    </select>
                    {getFieldError('targetAudience.gender') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('targetAudience.gender')}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.brandName.label}
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange('brandName', e.target.value)}
                  placeholder={t.form.brandName.placeholder}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                    getFieldError('brandName') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getFieldError('brandName') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('brandName')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.productDescription.label}
                </label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder={t.form.productDescription.placeholder}
                  rows={3}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base resize-none ${
                    getFieldError('productDescription') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getFieldError('productDescription') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('productDescription')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.keyMessage.label}
                </label>
                <textarea
                  value={formData.keyMessage}
                  onChange={(e) => handleInputChange('keyMessage', e.target.value)}
                  placeholder={t.form.keyMessage.placeholder}
                  rows={3}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base resize-none ${
                    getFieldError('keyMessage') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getFieldError('keyMessage') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('keyMessage')}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.steps.brandMessage.title}</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.tone.label}
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                    getFieldError('tone') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t.form.tone.placeholder}</option>
                  <option value="professional">{t.form.tone.options.professional}</option>
                  <option value="casual">{t.form.tone.options.casual}</option>
                  <option value="luxury">{t.form.tone.options.luxury}</option>
                  <option value="energetic">{t.form.tone.options.energetic}</option>
                  <option value="emotional">{t.form.tone.options.emotional}</option>
                </select>
                {getFieldError('tone') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('tone')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.duration.label}
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                    getFieldError('duration') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t.form.duration.placeholder}</option>
                  <option value="15s">{t.form.duration.options['15s']}</option>
                  <option value="30s">{t.form.duration.options['30s']}</option>
                  <option value="60s">{t.form.duration.options['60s']}</option>
                  <option value="90s">{t.form.duration.options['90s']}</option>
                  <option value="120s">{t.form.duration.options['120s']}</option>
                </select>
                {getFieldError('duration') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('duration')}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.steps.creativeDirection.title}</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.budget.label}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                >
                  <option value="">{t.form.budget.placeholder}</option>
                  <option value="low">{t.form.budget.options.low}</option>
                  <option value="medium">{t.form.budget.options.medium}</option>
                  <option value="high">{t.form.budget.options.high}</option>
                  <option value="premium">{t.form.budget.options.premium}</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.steps.contactInfo.title}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.contact.name.label}
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder={t.form.contact.name.placeholder}
                    className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                      getFieldError('contactInfo.name') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('contactInfo.name') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('contactInfo.name')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.contact.email.label}
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder={t.form.contact.email.placeholder}
                    className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                      getFieldError('contactInfo.email') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('contactInfo.email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('contactInfo.email')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.contact.phone.label}
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder={t.form.contact.phone.placeholder}
                    className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                      getFieldError('contactInfo.phone') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('contactInfo.phone') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('contactInfo.phone')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.contact.company.label}
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.company}
                    onChange={(e) => handleContactChange('company', e.target.value)}
                    placeholder={t.form.contact.company.placeholder}
                    className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base ${
                      getFieldError('contactInfo.company') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('contactInfo.company') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('contactInfo.company')}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-base min-h-[44px] ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.buttons.previous}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base min-h-[44px]"
              >
                {t.buttons.next}
              </button>
            ) : (
              <button
                onClick={generateStoryboard}
                disabled={isGenerating}
                className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-base min-h-[44px] ${
                  isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? t.generating : t.buttons.generate}
              </button>
            )}
          </div>
        </div>

        {/* Generated Storyboard - Mobile Optimized */}
        <div className="mt-6 sm:mt-8">
          {/* Fallback if storyboard is missing or empty */}
          {(!generatedStoryboard || !Array.isArray(generatedStoryboard.frames) || generatedStoryboard.frames.length === 0) && !isGenerating && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 sm:p-6 text-center">
              <p className="text-sm sm:text-base">No storyboard generated yet. Please fill in the form and generate a storyboard.</p>
            </div>
          )}
          {/* Only render storyboard if frames is a non-empty array */}
          {generatedStoryboard && Array.isArray(generatedStoryboard.frames) && generatedStoryboard.frames.length > 0 && !isGenerating && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.success}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{generatedStoryboard.summary}</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-500">
                  <span>Duration: {generatedStoryboard.totalDuration}s</span>
                  <span>Budget: {generatedStoryboard.estimatedBudget}</span>
                  <span>Frames: {generatedStoryboard.frames?.length || 0}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {generatedStoryboard.frames.map((frame) => (
                  <div key={frame.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="bg-gray-100 h-32 sm:h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {frame.imageUrl ? (
                        <img 
                          src={frame.imageUrl} 
                          alt={frame.description}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-center p-4 text-sm">{frame.visual}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Frame {frame.id}</h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">{frame.description}</p>
                    <div className="text-xs sm:text-sm text-gray-500 space-y-1">
                      <p><strong>Duration:</strong> {frame.duration}s</p>
                      <p><strong>Camera:</strong> {frame.camera}</p>
                      <p><strong>Audio:</strong> {frame.audio}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base min-h-[44px]">
                  {t.buttons.download}
                </button>
                {/* Translation Button - only show if content is in English and we're in Chinese locale */}
                {isEnglishStoryboard && locale === 'zh' && (
                  <button 
                    onClick={translateStoryboard}
                    disabled={isTranslating}
                    className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-base min-h-[44px] ${
                      isTranslating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isTranslating ? '翻譯中...' : '翻譯成中文'}
                  </button>
                )}
                <button 
                  onClick={() => {
                    setGeneratedStoryboard(null);
                    setCurrentStep(1);
                    setFormData({
                      projectType: '',
                      industry: '',
                      targetAudience: {
                        ageRange: '',
                        gender: ''
                      },
                      brandName: '',
                      productDescription: '',
                      keyMessage: '',
                      tone: '',
                      duration: '',
                      budget: '',
                      contactInfo: {
                        name: '',
                        email: '',
                        phone: '',
                        company: ''
                      }
                    });
                    setValidationErrors({});
                  }}
                  className="px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-base min-h-[44px]"
                >
                  {t.buttons.startOver}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 