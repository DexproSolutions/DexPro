import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Logo2 from '../assets/dex.png';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/api/blogs`);
        setArticles(res.data.blogs || []);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7fa] text-gray-900 font-inter">
     <Navbar bgType="blog" logo={Logo2} showHome={true} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">All Articles</h1>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-xl text-gray-500 animate-pulse">Loading articles...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-xl text-red-500 font-semibold">No articles found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden max-w-sm mx-auto transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                <img src={article.featured_image} alt={article.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x200/8A2BE2/FFFFFF?text=Image+Not+Found'; }} />
                <div className="p-6">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span className="font-medium text-purple-700">{article.category}</span>
                    <span>{new Date(article.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h2>
                  {/* <p className="text-gray-600 text-base mb-4">{article.short_desc}</p> */}
                  <a href={`/blog/${article.slug}`} className="text-[#140228] font-medium flex items-center group">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticles;
