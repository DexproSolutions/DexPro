/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Logo from '../assets/nav-logo.png';
import { Phone, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { title: 'Services', link: '#services' },
  { title: 'Projects', link: '#projects' },
  { title: 'About Us', link: '#about' },
  { title: 'Career', link: '#career' },
  { title: 'Insights', link: '#insights' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (e, link) => {
    e.preventDefault();
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    } else {
      sessionStorage.setItem('scrollTarget', link);
      navigate('/');
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-t from-[#100124] to-[#130129] backdrop-blur-sm'
            : 'bg-transparent'
        } text-white`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-2.5">
          {/* Logo */}
          <img
            src={Logo}
            alt="Dexpro"
            className="cursor-pointer w-24 sm:w-28 md:w-32"
            onClick={() => navigate('/')}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {NAV_ITEMS.map(({ title, link }, idx) => (
              <a
                key={idx}
                href={link}
                onClick={(e) => scrollToSection(e, link)}
                className="hover:text-purple-300 text-lg transition-colors duration-200 cursor-pointer"
              >
                {title}
              </a>
            ))}
          </div>

          {/* Contact Us Button (Desktop only) */}
          <a
            href="#contact"
            aria-label="Contact Us"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hidden md:flex cursor-pointer bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white text-sm px-4 py-1.5 rounded-lg items-center gap-2"
          >
            <Phone className="w-4 h-4 text-white" />
            Contact Us
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white ml-3"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-4 bg-[#130129] text-sm font-medium space-y-3">
            {NAV_ITEMS.map(({ title, link }, idx) => (
              <a
                key={idx}
                href={link}
                onClick={(e) => scrollToSection(e, link)}
                className="block hover:text-purple-300 transition-colors duration-200"
              >
                {title}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              aria-label="Contact Us"
              className="block text-white text-sm"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="min-h-[72px] md:min-h-[80px]" />
    </div>
  );
}

export default Navbar;
