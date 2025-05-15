
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The team behind SimpleStartTech and our mission to make technology accessible.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
                alt="SimpleStartTech workspace" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                SimpleStartTech was founded with a simple mission: to help small businesses and professionals get their technology up and running without the headache.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We understand that setting up websites, email systems, and other tech tools can be overwhelming. That's why we created a service that handles all the technical details for you.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our approach is straightforward: we explain everything in plain language, we don't cut corners, and we make sure you're comfortable with your new technology before we consider our job done.
              </p>
              <Link to="/services" className="btn-primary">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8-3v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
              <p className="text-gray-600">
                We believe in keeping things simple and straightforward, both in our solutions and our communication.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 6l4 14"></path>
                  <path d="M12 6v14"></path>
                  <path d="M8 8v12"></path>
                  <path d="M4 4v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">
                No hidden costs or confusing jargon. We're clear about what we're doing and why we're doing it.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We build reliable solutions and maintain them with care, ensuring your technology consistently works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - For a small freelance business, this might be just one person */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
          
          <div className="max-w-sm mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Beau Smith</h3>
              <p className="text-orange mb-4">Founder & Tech Specialist</p>
              <p className="text-gray-600 mb-4">
              At just age 17 Beau has completed his certificate 3 in IT and started His bachelor of IT in just year 12, Beau founded SimpleStartTech to help small businesses navigate the often confusing world of technology.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-orange transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-orange transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to start working together?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Let's get your technology running smoothly, the simple way.
          </p>
          <Link to="/contact" className="bg-white text-orange px-8 py-3 rounded-lg font-medium hover:bg-cream transition-all duration-300 hover:shadow-lg inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
