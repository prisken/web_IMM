'use client';

import { useState } from 'react';
import { Metadata } from 'next';

interface StoryboardFrame {
  id: number;
  description: string;
  visual: string;
}

interface GeneratedStoryboard {
  frames: StoryboardFrame[];
}

export default function AIGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    industry: '',
    targetAudience: '',
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStoryboard, setGeneratedStoryboard] = useState<GeneratedStoryboard | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateStoryboard = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedStoryboard({
        frames: [
          { id: 1, description: "Opening shot of product in elegant setting", visual: "Product showcase" },
          { id: 2, description: "Target audience using the product", visual: "Lifestyle shot" },
          { id: 3, description: "Key benefit demonstration", visual: "Feature highlight" },
          { id: 4, description: "Call to action with brand logo", visual: "Brand closing" }
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  const steps = [
    { id: 1, title: 'Project Details', description: 'Tell us about your project' },
    { id: 2, title: 'Brand & Message', description: 'Define your brand and key message' },
    { id: 3, title: 'Creative Direction', description: 'Choose your style and tone' },
    { id: 4, title: 'Contact Info', description: 'Get your storyboard' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI-Powered Storyboard Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Storyboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into professional storyboards in minutes with our AI technology
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
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
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className={`text-sm ${
                currentStep === step.id ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select project type</option>
                  <option value="tvc">TV Commercial</option>
                  <option value="kol">KOL Content</option>
                  <option value="brand">Brand Video</option>
                  <option value="social">Social Media Content</option>
                  <option value="corporate">Corporate Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="fashion">Fashion & Beauty</option>
                  <option value="food">Food & Beverage</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="automotive">Automotive</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="e.g., Young professionals aged 25-35"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand & Message</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange('brandName', e.target.value)}
                  placeholder="Your brand name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product/Service Description *
                </label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Describe your product or service"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Message *
                </label>
                <textarea
                  value={formData.keyMessage}
                  onChange={(e) => handleInputChange('keyMessage', e.target.value)}
                  placeholder="What's the main message you want to convey?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Creative Direction</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone & Style *
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select tone</option>
                  <option value="professional">Professional & Corporate</option>
                  <option value="casual">Casual & Friendly</option>
                  <option value="luxury">Luxury & Premium</option>
                  <option value="energetic">Energetic & Dynamic</option>
                  <option value="emotional">Emotional & Heartfelt</option>
                  <option value="humorous">Humorous & Fun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select duration</option>
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">60 seconds</option>
                  <option value="90">90 seconds</option>
                  <option value="120">2 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50k">Under HK$50,000</option>
                  <option value="50k-100k">HK$50,000 - HK$100,000</option>
                  <option value="100k-200k">HK$100,000 - HK$200,000</option>
                  <option value="200k-500k">HK$200,000 - HK$500,000</option>
                  <option value="over-500k">Over HK$500,000</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder="Your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.company}
                    onChange={(e) => handleContactChange('company', e.target.value)}
                    placeholder="Your company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="+852 1234 5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={generateStoryboard}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  'Generate Storyboard'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Generated Storyboard Preview */}
        {generatedStoryboard && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Generated Storyboard</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {generatedStoryboard.frames.map((frame: any) => (
                <div key={frame.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-32 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">{frame.visual}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Frame {frame.id}</h3>
                  <p className="text-gray-600 text-sm">{frame.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Download PDF
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Share Storyboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 