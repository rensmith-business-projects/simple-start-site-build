
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We offer straightforward pricing with no hidden costs, no ongoing fees, and initial support included for free.
          </p>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hourly Rate Card */}
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center border-b pb-6">
                <h3 className="text-2xl font-bold">Hourly Rate</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$50</span>
                  <span className="text-gray-600">/hour</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">General IT Support</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Email Configuration</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Software Training</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Hardware Setup</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Initial Support Included</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Link to="/contact" className="btn-primary">
                    Get Started
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Website Setup Card */}
            <Card className="border border-orange shadow-md hover:shadow-lg transition-shadow relative bg-white">
              <div className="absolute top-0 left-0 right-0 -translate-y-1/2 text-center">
                <span className="bg-orange text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <CardHeader className="text-center border-b pb-6 pt-8">
                <h3 className="text-2xl font-bold">Website Setup</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$300</span>
                  <span className="text-gray-600">/flat</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Domain Registration</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Hosting Setup</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Basic Website</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">1 Hour Training</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Initial Support Included</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Link to="/contact" className="bg-orange text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-orange-light hover:shadow-md">
                    Get Started
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - update to address no ongoing support */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Do you provide ongoing support?</h3>
              <p className="text-gray-700">
                No, we specialize in short-term setup and configuration projects. We provide free initial support to ensure everything is working correctly after setup, but we don't offer ongoing maintenance contracts.
              </p>
            </div>
            
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">What happens if I need help after the initial setup?</h3>
              <p className="text-gray-700">
                We're happy to assist on an hourly basis if you need additional help after the initial setup period. Just book a session at our standard rate.
              </p>
            </div>
            
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">How long is the free initial support period?</h3>
              <p className="text-gray-700">
                Initial support typically covers the first two weeks after your setup is complete, ensuring everything is working as expected.
              </p>
            </div>
            
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-700">
                We accept credit cards, direct bank transfers, and PayPal. Payment is typically collected after the project is completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Need a custom solution?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            We're happy to provide custom quotes for projects that don't fit our standard pricing.
          </p>
          <Link to="/contact" className="btn-primary">
            Request a Custom Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
