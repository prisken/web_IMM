'use client';

import { useState } from 'react';
import { Metadata } from 'next';

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  results: string[];
  duration: string;
  budget: string;
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'tvc', name: 'TV Commercials' },
    { id: 'kol', name: 'KOL Content' },
    { id: 'brand', name: 'Brand Videos' },
    { id: 'social', name: 'Social Media' },
    { id: 'corporate', name: 'Corporate' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechCorp Brand Campaign',
      category: 'tvc',
      client: 'TechCorp HK',
      description: 'A comprehensive brand campaign that increased brand awareness by 200% and drove significant sales growth.',
      image: '/api/placeholder/600/400',
      tags: ['TV Commercial', 'Brand Awareness', 'Technology'],
      results: ['200% increase in brand awareness', '150% increase in website traffic', '300% increase in lead generation'],
      duration: '3 months',
      budget: 'HK$500,000'
    },
    {
      id: 2,
      title: 'Fashion Forward KOL Series',
      category: 'kol',
      client: 'Fashion Forward',
      description: 'Multi-platform KOL campaign featuring top fashion influencers in Hong Kong.',
      image: '/api/placeholder/600/400',
      tags: ['KOL Content', 'Fashion', 'Social Media'],
      results: ['2M+ total reach', '500K+ engagements', '25% increase in sales'],
      duration: '2 months',
      budget: 'HK$200,000'
    },
    {
      id: 3,
      title: 'StartupXYZ Product Launch',
      category: 'brand',
      client: 'StartupXYZ',
      description: 'Innovative product launch video that captured the essence of the brand and resonated with target audience.',
      image: '/api/placeholder/600/400',
      tags: ['Brand Video', 'Product Launch', 'Startup'],
      results: ['500K+ views', '15% conversion rate', '50% increase in app downloads'],
      duration: '1 month',
      budget: 'HK$150,000'
    },
    {
      id: 4,
      title: 'Lifestyle Brands Social Campaign',
      category: 'social',
      client: 'Lifestyle Brands',
      description: 'Engaging social media campaign that connected with young professionals across multiple platforms.',
      image: '/api/placeholder/600/400',
      tags: ['Social Media', 'Lifestyle', 'Multi-platform'],
      results: ['1M+ impressions', '100K+ engagements', '40% increase in followers'],
      duration: '6 weeks',
      budget: 'HK$100,000'
    },
    {
      id: 5,
      title: 'FinanceCorp Corporate Video',
      category: 'corporate',
      client: 'FinanceCorp',
      description: 'Professional corporate video showcasing company values and achievements.',
      image: '/api/placeholder/600/400',
      tags: ['Corporate', 'Finance', 'Professional'],
      results: ['Improved employee engagement', 'Enhanced brand reputation', 'Increased investor confidence'],
      duration: '2 months',
      budget: 'HK$300,000'
    },
    {
      id: 6,
      title: 'Foodie Paradise TVC',
      category: 'tvc',
      client: 'Foodie Paradise',
      description: 'Mouth-watering TV commercial that showcased the restaurant\'s signature dishes and atmosphere.',
      image: '/api/placeholder/600/400',
      tags: ['TV Commercial', 'Food & Beverage', 'Restaurant'],
      results: ['300% increase in reservations', '50% increase in takeaway orders', 'Enhanced brand recognition'],
      duration: '1 month',
      budget: 'HK$250,000'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Showcasing our best work across various industries and media formats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Get a Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-center z-10">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-semibold">{project.title}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{project.client}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {filters.find(f => f.id === project.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Duration: {project.duration}</span>
                    <span>Budget: {project.budget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different category or contact us for custom projects.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xl font-semibold">Project Video Preview</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                  <p className="text-gray-600 mb-6">{selectedProject.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                      <p className="text-gray-600">{selectedProject.client}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {filters.find(f => f.id === selectedProject.category)?.name}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                      <p className="text-gray-600">{selectedProject.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
                      <p className="text-gray-600">{selectedProject.budget}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Results & Impact</h3>
                  <ul className="space-y-3">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Get Similar Project
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak to our success and the value we deliver to our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '10M+', label: 'Total Views' },
              { number: '200%', label: 'Average ROI' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help bring your vision to life with the same level of creativity and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 