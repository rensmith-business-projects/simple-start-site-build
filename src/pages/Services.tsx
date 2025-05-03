import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Website Setup",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      description: "Get your business online with our website setup service. We handle domain registration, hosting setup, and basic website configuration with initial support included for free."
    },
    {
      id: 2,
      title: "Email Configuration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      description: "Professional email setup with your domain name. We configure your email accounts, set up forwarding, and help you access your email from all your devices."
    },
    {
      id: 3,
      title: "Cloud Apps Setup",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      ),
      description: "Get set up with the right cloud applications for your business needs, including CRM systems, project management tools, and other productivity software."
    },
    {
      id: 4,
      title: "IT Support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v16.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V6a4 4 0 0 0-4-4zm2 18H10"></path>
          <path d="M10 13h4"></path>
          <path d="M12 2v16"></path>
          <path d="M2 12h20"></path>
          <path d="M19 6l3 3"></path>
          <path d="M2 6l3 3"></path>
        </svg>
      ),
      description: "Short-term IT support for your immediate business needs. We help troubleshoot issues, provide guidance, and ensure your technology is working correctly."
    },
    {
      id: 5,
      title: "Hardware Setup",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
      ),
      description: "Need help setting up your new computer, printer, or other hardware? We'll handle the technical setup so you can start using your devices right away."
    },
    {
      id: 6,
      title: "Software Training",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      description: "Get up to speed with your new software through our personalized training sessions. We'll help you learn the basics and share tips to make you more productive."
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            We offer a variety of tech services to help you get you up and running with minimal hassle. Free initial support included with all services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-orange">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - update to reflect no ongoing support */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our <span className="text-orange">Process</span>
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-orange-light opacity-30"></div>
            
            {/* Step 1 */}
            <div className="relative mb-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Consultation</h3>
                  <p className="text-gray-600">
                    We start with a free consultation to understand your needs and goals.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-orange text-white font-bold text-lg z-10">
                  1
                </div>
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative mb-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 order-1 md:order-1 mb-4 md:mb-0 md:text-right"></div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-orange text-white font-bold text-lg z-10">
                  2
                </div>
                <div className="md:w-1/2 md:pl-8 order-2 md:order-2">
                  <h3 className="text-xl font-semibold mb-2">Customized Plan</h3>
                  <p className="text-gray-600">
                    We create a tailored plan based on your specific requirements.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative mb-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Implementation</h3>
                  <p className="text-gray-600">
                    We handle all the technical details to get your systems up and running.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-orange text-white font-bold text-lg z-10">
                  3
                </div>
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
            </div>
            
            {/* Step 4 - Updated to reflect initial support only */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 order-1 md:order-1 mb-4 md:mb-0 md:text-right"></div>
                <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-orange text-white font-bold text-lg z-10">
                  4
                </div>
                <div className="md:w-1/2 md:pl-8 order-2 md:order-2">
                  <h3 className="text-xl font-semibold mb-2">Free Initial Support</h3>
                  <p className="text-gray-600">
                    We provide initial support to ensure you're comfortable using your new tech setup. Support is included at no extra cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to reflect the freelance short-term nature */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to simplify your tech?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Let me handle the technical setup so you can focus on your business. No ongoing contracts, just straightforward solutions.
          </p>
          <Link to="/contact" className="btn-primary">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
