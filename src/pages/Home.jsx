/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Award, Users, BarChart, GitFork, Gem,
  Calendar, Eye, Target, Clock, Check, Download, Headphones,
  X,
  TrendingUp,
  ShieldCheck,
  Headset
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CursorGlow from '../components/CursorGlow';
import services from '../Data/servicesData';
import ServiceCard from '../cards/ServiceCard';
import projects from '../Data/projectData';
// import blogPosts from '../Data/blogPosts';
import TestimonialCard from '../cards/TestimonialCard';
import testimonials from '../Data/testimonialsData';
import a from '../assets/1.png';
import b from '../assets/2.png';
import c from '../assets/3.png';
import d from '../assets/4.png';
import e from '../assets/5.png';
import WCU3 from '../assets/WCU3.gif';
import WCU from '../assets/WCU.webp';
import about from '../assets/About.gif';
import ebook from '../assets/book3.png';
import axios from 'axios';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const Counter = ({ targetValue, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (label === "Dedicated Support") return; // Skip animation for static 24/7

    const easeOutQuad = (t) => t * (2 - t);
    const duration = 6000;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutQuad(progress);
          setCount(Math.floor(eased * targetValue));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    const node = ref.current;
    if (node) observer.observe(node);
    return () => node && observer.unobserve(node);
  }, [targetValue, label]);

  const suffix = label === "Average Growth" || label === "Success Rate" ? "%" : "+";
  const displayValue = `${count}${suffix}`;

  return (
    <span ref={ref} aria-label={`${count}${suffix} ${label.toLowerCase()}`}>
      {label === "Dedicated Support" ? "24/7" : displayValue}
    </span>
  );
};

const Home = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  
  const [blogPosts, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/api/featured`);
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target) {
      const section = document.querySelector(target);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Delay ensures the DOM is ready
        sessionStorage.removeItem('scrollTarget');
      }
    }
  }, [location]);

// Stats Data
const stats = [
  { label: 'Clients Served', value: 100, icon: Users, color: 'text-red-500' },
  { label: 'Average Growth', value: 27, icon: TrendingUp, color: 'text-blue-500' },
  { label: 'Success Rate', value: 99, icon: ShieldCheck, color: 'text-green-500' },
  { label: 'Dedicated Support', value: 24, icon: Headset, color: 'text-yellow-500' },
];

  const features = [
    {
      title: 'Data-Driven Approach',
      desc: 'Our proprietary analytics framework measures every aspect of your digital presence to make informed, results-focused decisions.',
      icon: <BarChart size={24} />,
    },
    {
      title: 'Industry Expertise',
      desc: 'Specialized teams with deep knowledge in fintech, healthcare, e-commerce, SaaS, and manufacturing sectors.',
      icon: <Gem size={24} />,
    },
    {
      title: 'Integrated Solutions',
      desc: 'Seamlessly connected marketing, development, and business strategies that work together to amplify results.',
      icon: <GitFork size={24} />,
    },
  ];

  const clients = [a, b, c, d, e];

 {/* testimonials cards auto scroll  */}

  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const intervalRef = useRef(null);

  // Determine cards per view
  const getCardsPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      setCurrentIndex(0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cloned data for infinite loop
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, cardsPerView)];

  const totalSlides = testimonials.length;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
        setTransitionEnabled(true);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, cardsPerView]);

  // Loop reset logic
  useEffect(() => {
    if (currentIndex === totalSlides) {
      // After the transition ends, reset to 0 without animation
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 700); // Match this with transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    handleSwipe(diff);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    handleSwipe(diff);
  };

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleSwipe = (diff) => {
    if (diff > 50) {
      setCurrentIndex((prev) => prev + 1);
      setTransitionEnabled(true);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTransitionEnabled(true);
    }
    setIsDragging(false);
  };

    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Project Section
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryColorMap = {
    'Web Development': 'bg-blue-100 text-blue-800',
    'Digital Marketing': 'bg-green-100 text-green-800',
    'App Development': 'bg-yellow-100 text-yellow-800',
    'Business Strategy': 'bg-red-100 text-red-800',
    'Business Solutions': 'bg-pink-100 text-pink-800',
    'E-commerce': 'bg-indigo-100 text-indigo-800'
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen min-w-screen text-white font-inter">
      <div id="color-header" className="relative overflow-hidden bg-[#140228] text-white">
        <CursorGlow targetId="color-header" />
        <Navbar />

        {/* Hero Section */}
        <section className="w-screen px-4 sm:px-6 lg:px-8 pt-6 pb-6 text-center">
          <div className="inline-block bg-zinc-900 bg-opacity-50 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 shadow">
            <span className="text-[#895fff]">TRUSTED</span> BY 50+ BUSINESSES
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight mb-4">
            Data-Driven Digital Solutions{' '}
            <span className="text-[#895fff] block sm:inline">
              That <br className="hidden sm:inline md:hidden" /> Grow Your Business
            </span>{' '}
            <span className="block sm:inline">10x Faster</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto px-2 sm:px-0">
            Helping 50+ startups and enterprises increase conversions by an average of 67% through
            integrated digital strategies tailored to your industry needs.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md mx-auto">
            <button
              onClick={() => navigate('/project')}
              className="cursor-pointer bg-gradient-to-r from-[#9859fe] to-[#602fea] hover:from-[#602fea] hover:to-[#9859fe] px-6 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => {
                const section = document.querySelector('#services');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-2 border-white text-white px-6 py-3 rounded-full font-medium w-full sm:w-auto  cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#9859fe] to-[#602fea] hover:border-[#9859fe] transition duration-300 ease-in-out transform hover:scale-105">
              Explore Services
            </button>

          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-20 -mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map(({ label, value, icon: Icon, color }, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">
                <Counter targetValue={value} label={label} />
              </h3>
              <p className="text-gray-300 text-sm">{label}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Services Section */}
      <section id='services' className="bg-white text-gray-800">
        <div className="py-16 px-4 text-center bg-white">
          <p className="text-purple-600 uppercase tracking-wide text-sm font-semibold mb-2">
            Our Expertise
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Digital Services
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            We deliver integrated solutions tailored to your specific industry needs, focusing on
            measurable results and sustainable growth.
          </p>
        </div>

        {/* Service Cards */}
        <div className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>

        {/* Clients Section */}
        <div className="py-12 px-4 text-center bg-gray-50">
          <p className="text-sm uppercase tracking-widest text-gray-950 mb-2">
            Trusted by Industry Leaders
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Valued Clients</h1>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 px-4">
              {clients.map((image, i) => (
                <div key={i} className="w-24 sm:w-30 h-auto flex justify-center items-center">
                  <img
                    src={image}
                    alt="client-logo"
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>
              ))}
            </div>

        {/* Why Dexpro Section */}
          <div className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-end items-center">
              <img
                src={WCU3}
                alt="Dexpro Illustration"
                className="w-full max-w-lg lg:max-w-xl h-auto object-contain"
              />
            </div>
            <div className="md:pl-12 text-start">
              <p className="text-sm tracking-widest text-purple-600 mb-2">Why Choose Dexpro</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Dexpro Delivers Smart, Scalable Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Unlike traditional agencies that focus on activities, we obsess over outcomes. Our
                integrated approach combines cutting-edge technology with strategic expertise to
                deliver measurable business growth.
              </p>
              <div className="space-y-6">
                {features.map(({ title, desc, icon }, i) => (
                  <div className="flex items-start" key={i}>
                    <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full text-purple-600 mr-4 shadow-sm">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

        {/* Projects Section */}
          <section className="text-center py-6 bg-white" id="projects">
            <h3 className="text-purple-500 text-sm font-semibold uppercase tracking-wider mb-1">
              OUR PORTFOLIO
            </h3>
            <h1 className="text-4xl sm:text-5xl text-black font-bold mb-3">
              Featured Projects
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Explore our successful projects that showcase our expertise and commitment
              to delivering exceptional results.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { name: 'All', color: 'bg-gray-200 text-gray-800' },
                { name: 'Web Development', color: 'bg-blue-100 text-blue-800' },
                { name: 'Digital Marketing', color: 'bg-green-100 text-green-800' },
                { name: 'App Development', color: 'bg-yellow-100 text-yellow-800' },
                { name: 'Business Strategy', color: 'bg-red-100 text-red-800' },
                { name: 'Business Solutions', color: 'bg-pink-100 text-pink-800' },
                { name: 'E-commerce', color: 'bg-indigo-100 text-indigo-800' }
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 cursor-pointer rounded-full font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category.name
                      ? `${category.color} ring-2 ring-purple-500`
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-purple-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-[#faf5ff] rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-52 sm:h-60 md:h-48 object-cover rounded-t-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/800080/FFFFFF?text=${encodeURIComponent(
                          project.title
                        )}`;
                      }}
                    />
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                          {project.title}
                        </h2>
                        <span
                          className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${
                            categoryColorMap[project.category] ||
                            'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View All Projects */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/project')}
                className="inline-flex items-center px-8 py-3 cursor-pointer bg-[#140228] hover:bg-[#20033d] text-white font-semibold rounded-md"
              >
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </section>


          {/* CTA Section */}
      <section id="color-cta" className="bg-[#140228] w-full py-30 pt-10 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        <CursorGlow targetId="color-cta" />

        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-white w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Ready to Transform Your Digital Presence?
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90">
              Partner with Dexpro to unlock your business's full potential with our data-driven
              approach and industry-specific expertise.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-2">
              <button onClick={()=>navigate('/project')} className="cursor-pointer bg-gradient-to-r from-[#9859fe] to-[#602fea] hover:from-[#602fea] hover:to-[#9859fe] transition duration-300 ease-in-out transform hover:scale-105 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" /> Schedule Consultation
              </button>
            </div>
          </div>

          {/* Illustration and Floating Button */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center">
            {/* Illustration Image */}
            <div className="w-full max-w-lg sm:max-w-xl">
              <img
                src={WCU}
                alt="Digital Transformation Illustration"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Floating Support Button */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full px-3 sm:px-4 py-2 shadow-lg flex items-center text-sm sm:text-base">
              <div className="bg-white p-1.5 sm:p-2 rounded-full mr-2">
                <Headphones className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-xs sm:text-sm">24/7 Support</span>
                <span className="text-[10px] sm:text-xs opacity-90">Always here to help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <div className="bg-white font-inter py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center" id='insights'>
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-[#ff6b6b] uppercase text-sm font-semibold mb-2">Our Blog</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and news from the digital world.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden max-w-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
              <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x200/8A2BE2/FFFFFF?text=Image+Not+Found'; }} />
              <div className="p-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="font-medium text-purple-700">{post.category}</span>
                 <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-base mb-4">{post.short_desc}</p>
                <div className="flex justify-between items-center">
                  <a  href={`/blog/${post.slug}`} className="text-[#140228] font-medium flex items-center group">
                    Read More <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  {/* <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> {post.readTime}
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="mt-12">
          <button className="bg-[#140228] hover:bg-[#20033d] text-white font-semibold py-3 px-6 rounded-md flex items-center cursor-pointer">
            View All Articles <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white" id='about'>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-16">
          {/* Left: Text */}
          <div>
            <p className="text-red-500 font-semibold uppercase text-sm mb-2">ABOUT US</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              We're a Team of Digital Experts
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              With over 10+ years of combined experience, our 360-degree expert team specializes
              in transforming businesses through innovative digital solutions. We combine
              cutting-edge technology with strategic thinking to deliver results that exceed
              expectations.
            </p>

            {/* Mission and Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Target size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                  <p className="text-gray-600">Delivering smart, affordable solutions that drive real results</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Eye size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">Empowering small businesses to grow with ease</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="flex items-center justify-center px-8 py-4 bg-[#140228] hover:bg-[#20033d] text-white font-semibold rounded-lg  cursor-pointer self-start">
              Join Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center items-center">
            <img
              src={about}
              alt="Team of Digital Experts"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>      

        {/* Ebook CTA Section */}
        <section className="py-16 sm:py-20 md:py-32 bg-[#140228] relative overflow-hidden" id="color-ebook">
          <CursorGlow targetId="color-ebook" />
          <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="inline-block bg-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4 shadow-md">
                Free Ebook
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
                The Complete Guide to Digital Marketing in 2025
              </h1>

              <p className="text-base sm:text-lg text-gray-300 mb-6">
                Learn the latest strategies, tools, and techniques to grow your business online.
                This comprehensive guide covers everything from SEO to social media marketing.
              </p>

              <ul className="space-y-4 text-gray-200 mb-6 text-left md:text-left max-w-md mx-auto md:mx-0">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1" />
                  <span>200+ pages of actionable insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1" />
                  <span>Real-world case studies and examples</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1" />
                  <span>Step-by-step implementation guides</span>
                </li>
              </ul>

              <div className="flex justify-center md:justify-start">
                <button
                  onClick={openModal}
                  className="bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white font-semibold text-md py-2 px-6 rounded cursor-pointer flex items-center"
                >
                  <Download className="mr-2" size={16} />
                  Download
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-4 text-center md:text-left">
                By downloading, you agree to our{" "}
                <a href="#" className="underline hover:text-gray-300">Privacy Policy</a> and{" "}
                <a href="#" className="underline hover:text-gray-300">Terms of Service</a>.
              </p>
            </div>

            {/* Ebook Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={ebook}
                alt="Ebook Cover"
                className="max-w-[90%] md:max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>



      {/* Testimonial Carousel Section */}
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-pink-500 uppercase tracking-widest font-semibold text-sm mb-2">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Hear from our clients about their experience working with our team and the results we've delivered.
        </p>

        <div
          className="overflow-hidden rounded-xl select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`flex`}
            style={{
              width: `${(100 / cardsPerView) * extendedTestimonials.length}%`,
              transform: `translateX(-${(100 / extendedTestimonials.length) * currentIndex}%)`,
              transition: transitionEnabled ? 'transform 0.7s ease-in-out' : 'none',
            }}
          >
            {extendedTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="px-3"
                style={{
                  width: `${100 / extendedTestimonials.length}%`,
                }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      <Footer /> 
      
      {/* Modal content - rendered conditionally */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-inter">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 relative transform transition-all duration-300 scale-100 opacity-100">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
             <X className="h-6 w-6 cursor-pointer text-red-500 hover:text-red-600" />
            </button>

            {/* Modal title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get Your Free Ebook</h2>

            {/* Form fields */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Download button */}
                  <button
                    className="w-fit bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white font-semibold text-md py-2 px-7 rounded cursor-pointer flex items-center justify-center mx-auto md:mx-3"
                  >
                    <Download className="mr-2" size={16} />
                    Download
                  </button>
            </form>
          </div>
        </div>
      )}   
    </div>
  );
};

export default Home;
