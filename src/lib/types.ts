// AI Storyboard Generator Types
export interface StoryboardQuestion {
  id: string;
  type: 'text' | 'select' | 'radio' | 'textarea' | 'number';
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required: boolean;
  conditional?: {
    field: string;
    value: string;
  };
}

export interface StoryboardForm {
  id: string;
  title: string;
  description: string;
  questions: StoryboardQuestion[];
  targetAudience: string;
}

export interface StoryboardResponse {
  questionId: string;
  answer: string;
}

export interface GeneratedStoryboard {
  id: string;
  title: string;
  description: string;
  scenes: StoryboardScene[];
  userInfo: UserInfo;
  createdAt: Date;
  status: 'generating' | 'completed' | 'failed';
}

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  description: string;
  visualPrompt: string;
  generatedImage?: string;
  duration: number;
  audioNotes?: string;
  cameraNotes?: string;
}

export interface UserInfo {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: 'business-tvc' | 'kol-video';
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  read_time: number;
  featured_image_url: string;
  slug: string;
  status: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  videoUrl?: string;
  client: string;
  date: Date;
  featured: boolean;
  caseStudy?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  duration?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  project?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  expertise: string[];
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: 'business-tvc' | 'kol-video' | 'corporate-video' | 'social-media' | 'other';
  budget: 'under-50k' | '50k-100k' | '100k-200k' | '200k+' | 'not-sure';
  message: string;
  timeline: 'urgent' | '1-2-weeks' | '1-month' | 'flexible';
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// AI Generation Types
export interface StoryboardGenerationRequest {
  userInfo: UserInfo;
  responses: StoryboardResponse[];
  formType: 'business-tvc' | 'kol-video';
}

export interface StoryboardGenerationResponse {
  storyboard: GeneratedStoryboard;
  estimatedTime: number;
}

// SEO Types
export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

 