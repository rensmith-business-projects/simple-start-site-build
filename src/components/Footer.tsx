
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SimpleStartTech</h3>
            <p className="text-sm text-gray-600">
              Getting your tech up and running — the simple way.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-orange transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm text-gray-600 hover:text-orange transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-orange transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-600 mb-2">
              <a href="mailto:hello@simplestarttech.com" className="hover:text-orange transition-colors">
                hello@simplestarttech.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <a href="tel:+11234567890" className="hover:text-orange transition-colors">
                (123) 456-7890
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} SimpleStartTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
