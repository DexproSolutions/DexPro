import React from 'react';
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Youtube,
} from "lucide-react";
import Logo from '../assets/footer-logo.png';
import twitter from '../assets/Twitter.png'

const NAV_ITEMS = [
  { title: "Services", link: "#services" },
  { title: "Solutions", link: "#services" }, // consider changing this
  { title: "Projects", link: "#projects" },
  { title: "About Us", link: "#about" },
  { title: "Insights", link: "#insights" }
];


const Footer = () => {
  return (
<footer className="bg-[#101827] text-[#9ca3af] py-10 px-4 sm:px-6 md:px-12 relative rounded-t-4xl">
  {/* Main Grid */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
    
    {/* Logo & Description */}
    <div className="md:col-span-4">
      <img src={Logo} alt="dexpro" className="mb-4 w-32 sm:w-36 h-auto" />
      <p className="text-sm sm:text-base leading-relaxed">
        Delivering data-driven digital solutions that help businesses grow and thrive in an ever-evolving digital landscape.
      </p>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Facebook, url: 'https://www.facebook.com/people/Dexpro-Solutions/61562875354113/' },
                { Icon: Instagram, url: 'https://www.instagram.com/dexprosolutions/' },
                { Icon: twitter, url: 'https://x.com/DexproSolu18677' },
                { Icon: Linkedin, url: 'https://www.linkedin.com/company/dexpro-solutions' },
                { Icon: Youtube, url: 'https://www.youtube.com/@DexproSolutions' },
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition cursor-pointer"
                >
                  {typeof Icon === 'string' ? (
                    <img src={Icon} alt={`Social icon ${i}`} className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" aria-label={`Social icon ${i}`} />
                  )}
                </a>
              ))}
            </div>

    </div>

    {/* Quick Links and Services Side-by-Side on All Screens */}
    <div className="md:col-span-4 flex flex-row gap-8">
      
      {/* Quick Links */}
      <div className="w-1/2">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm sm:text-base">
          {NAV_ITEMS.map((item, i) => (
            <li key={i} className="hover:text-white cursor-pointer">
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="w-1/2">
        <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
        <ul className="space-y-2 text-sm sm:text-base">
          {[
            "Digital Marketing",
            "Web Development",
            "App Development",
            "Financial Services",
            "Business Strategy",
          ].map((item, i) => (
            <li key={i} className="hover:text-white cursor-pointer">{item}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* Contact Info */}
    <div className="md:col-span-4" id='contact'>
      <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
      <p className="flex items-center gap-2 text-gray-400 mb-2 text-sm sm:text-base">
        <MapPin size={20} className="text-gray-400" />
        Hyderabad, Telangana - 500018
      </p>
      <p className="flex items-center gap-2 text-gray-400 mb-2 text-sm sm:text-base">
        <Mail size={20} className="text-gray-400" />
        support@dexprosolutions.com
      </p>
      <p className="flex items-center gap-2 text-gray-400 mb-2 text-sm sm:text-base">
        <Phone size={20} className="text-gray-400" />
        +91 90009 46816
      </p>
      <p className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
        <Clock size={20} className="text-gray-400" />
        Mon–Sat: 10:00 AM – 7:00 PM
      </p>
    </div>
  </div>

  {/* Footer Bottom Line */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-gray-500 flex flex-col sm:flex-row justify-between items-center text-center gap-2 sm:gap-4 text-sm sm:text-base">
    <p>© 2025 Dexpro Solutions | All rights reserved.</p>
    <div className="flex flex-wrap justify-center gap-4">
      {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
        <a key={i} href="#" className="hover:text-white cursor-pointer">{item}</a>
      ))}
    </div>
  </div>

</footer>



  );
};

export default Footer;
