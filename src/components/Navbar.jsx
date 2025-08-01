/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Logo from '../assets/nav-logo.png';
import { Phone, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { title: 'Services', link: '#services' },
  { title: 'Projects', link: '#projects' },
  { title: 'About Us', link: '#about' },
  { title: 'Career', link: '/career' }, // Route navigation
  { title: 'Our Blog', link: '/blogs' },
];

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll or route based on link type
  const scrollToSection = (e, link) => {
    e.preventDefault();

    if (!link.startsWith('#')) {
      // If it's a route (like '/jobs')
      navigate(link);
      setMenuOpen(false);
      return;
    }

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

  // Background logic
  const navBg = isScrolled
    ? (bgType === 'blog' ? 'bg-[#f7f7fa] text-gray-900 shadow' : 'bg-gradient-to-t from-[#100124] to-[#130129] backdrop-blur-sm text-white')
    : (bgType === 'blog' ? 'bg-[#f7f7fa] text-gray-900' : 'bg-transparent text-white');

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3">
          {/* Logo */}
          <img
            src={logo}
            alt="Dexpro"
            className="cursor-pointer w-24 sm:w-28 md:w-32"
            onClick={() => navigate('/')}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6 text-sm font-medium">
            {NAV_ITEMS.map(({ title, link }, idx) => (
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}
                className="hover:text-purple-300 text-lg transition-colors duration-200 cursor-pointer"
              >
                Home
              </a>
            )}
            {navItems.map(({ title, link }, idx) => (
              title === 'Our Blog' ? (
                <a
                  key={idx}
                  href={link}
                  onClick={(e) => { e.preventDefault(); navigate('/blogs'); setMenuOpen(false); }}
                  className="hover:text-purple-300 text-lg transition-colors duration-200 cursor-pointer"
                >
                  {title}
                </a>
              ) : (
                <a
                  key={idx}
                  href={link}
                  onClick={(e) => scrollToSection(e, link)}
                  className="hover:text-purple-300 text-lg transition-colors duration-200 cursor-pointer"
                >
                  {title}
                </a>
              )
            ))}
          </div>
            {/* Contact Us (Desktop Only) */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-gradient-to-r from-[#9859fe] to-[#602fea] px-4 py-2 rounded-lg flex items-center gap-2 text-white text-sm"
            >
              <Phone size={16} />
              Contact Us
            </a>          


          {/* Mobile Menu Toggle */}
          <button

            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-4 bg-[#130129] text-sm font-medium space-y-4">
            {NAV_ITEMS.map(({ title, link }, idx) => (

              <a
                href="/"
                onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}
                className="block hover:text-purple-300 transition-colors duration-200"
              >
                Home
              </a>
            )}
            {navItems.map(({ title, link }, idx) => (
              title === 'Our Blog' ? (
                <a
                  key={idx}
                  href={link}
                  onClick={(e) => { e.preventDefault(); navigate('/blogs'); setMenuOpen(false); }}
                  className="block hover:text-purple-300 transition-colors duration-200"
                >
                  {title}
                </a>
              ) : (
                <a
                  key={idx}
                  href={link}
                  onClick={(e) => scrollToSection(e, link)}
                  className="block hover:text-purple-300 transition-colors duration-200"
                >
                  {title}
                </a>
              )
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="block bg-gradient-to-r from-[#9859fe] to-[#602fea] px-4 py-2 rounded-lg text-white text-center"
            >
              <Phone size={16} className="inline mr-2" />
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="min-h-[72px] md:min-h-[84px]" />
    </div>
  );
}
