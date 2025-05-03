import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Getting Your Tech Up and Running — <span className="text-orange">the Simple Way</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto">
            We take care of the setup so you can focus on what you do best. Initial support included at no extra cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Book a Consultation
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Choose <span className="text-orange">SimpleStartTech</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Keep the first two cards */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                    <path d="M12 6L12 12L16 14"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                <p className="text-gray-600">
                  Get your tech up and running quickly with our streamlined processes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"></path>
                    <path d="M9 9H9.01"></path>
                    <path d="M15 9H15.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jargon-Free Support</h3>
                <p className="text-gray-600">
                  We explain everything in plain English, no confusing tech terms.
                </p>
              </CardContent>
            </Card>
            
            {/* Replace the third card to emphasize free initial support */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Initial Support</h3>
                <p className="text-gray-600">
                  Setup includes free support to ensure your system works correctly from day one.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Most Popular <span className="text-orange">Services</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                From website setup to email configuration, we offer a range of services to get your business tech running smoothly.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="h-8 w-8 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Website Setup & Configuration</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">Email Configuration</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">Cloud App Setup (CRM, Project Tools)</span>
                </li>
              </ul>
              <Link to="/services" className="inline-flex items-center text-orange font-medium hover:text-orange-light transition-colors">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" 
                alt="Person working on laptop" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - update to reflect no ongoing support */}
      <section className="py-16 bg-orange px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Book a free 15-minute consultation to discuss your short-term tech needs.
          </p>
          <Link to="/contact" className="bg-white text-orange px-8 py-3 rounded-lg font-medium hover:bg-cream transition-all duration-300 hover:shadow-lg inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
