
import { useEffect } from 'react';

const Contact = () => {
  // Add useEffect to load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us to discuss how we can help with your tech needs. Submit a support ticket or book a consultation.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Google Forms Support Ticket */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>
              <p className="text-sm text-gray-600 mb-4">Fill out the form below to get help with your tech needs</p>
              
              <div className="w-full overflow-hidden rounded-lg">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSe6-dGY0eC2AIg5VyzKnCJKjcr-eGDtwRsi7N2shDkIB0_6wg/viewform?embedded=true" 
                  width="100%" 
                  height="689" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  className="w-full"
                >
                  Loading…
                </iframe>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-cream p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-700">contact@simplestart.tech</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-orange mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-700">+61 (03) 9685 7241</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendly Section */}
          <div className="mt-12">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
              <p className="text-gray-700 mb-6">
                Schedule a free 30-minute consultation to discuss your tech needs.
              </p>
              
              {/* Calendly inline widget */}
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/contactbeau7/30min" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">How We Can Help</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Support Tickets</h3>
              <p className="text-gray-700 mb-4">
                Submit support requests through our Google Form for quick and easy assistance 
                with your tech needs.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Easy form submission</li>
                <li>Quick response times</li>
                <li>Detailed issue tracking</li>
                <li>Expert technical support</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Consultation Booking</h3>
              <p className="text-gray-700 mb-4">
                Book a free consultation to discuss your specific needs and get personalized 
                recommendations for your tech setup.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Free 30-minute sessions</li>
                <li>Personalized recommendations</li>
                <li>Project planning assistance</li>
                <li>Technology advice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
