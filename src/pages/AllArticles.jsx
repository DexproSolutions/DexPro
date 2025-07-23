import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Logo2 from '../assets/dex.png';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const categories = [
  { name: "Technology", count: 45 },
  { name: "Lifestyle", count: 38 },
  { name: "Workspace", count: 27 },
  { name: "Productivity", count: 31 },
  { name: "Wellness", count: 24 },
];

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Get top 5 featured post titles for sidebar
  const sidebarPopularPosts = articles.slice(0, 5).map(post => post.title);

  // Featured post: first article or fallback
  const featuredPost = articles[0] || {
    featured_image:
      "https://readdy.ai/api/search-image?query=modern%20minimalist%20workspace%20with%20laptop%20computer%20and%20coffee%20cup%20on%20white%20desk%2C%20soft%20natural%20lighting%2C%20clean%20and%20organized%20setting%2C%20professional%20photography&width=1200&height=600&seq=1&orientation=landscape",
    title: "The Future of Remote Work: Trends and Predictions for 2025",
    author: "Sarah Johnson",
    created_at: "2025-07-23T00:00:00Z",
    short_desc:
      "Explore how remote work continues to evolve and shape the future of our professional lives. From virtual reality meetings to AI-powered productivity tools...",
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar bgType="blog" logo={Logo2} showHome={true} />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Featured Post */}
        <section className="mb-16">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-[300px] sm:h-[400px]">
              <img
                src={featuredPost.featured_image}
                alt="Featured post"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h1>
                  <p className="mb-4 text-sm sm:text-base line-clamp-3">{featuredPost.short_desc}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Admin</div>
                        <div className="text-sm">{new Date(featuredPost.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                    </div>
                    <a href={articles[0] ? `/blog/${featuredPost.slug}` : '#'} className="bg-white text-gray-900 px-6 py-2 font-medium rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Blog Grid and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0).map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {article.readTime || ''}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.short_desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Admin</div>
                          <div className="text-gray-500">{new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                      </div>
                      <a href={`/blog/${article.slug}`} className="text-blue-600 font-medium hover:underline">Read More</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between cursor-pointer hover:text-blue-600"
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-500 text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Popular Posts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={article.id || index} className="cursor-pointer hover:text-blue-600">
                    <h4 className="font-medium">{article.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            {/* Newsletter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-4">Stay updated with our latest posts</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="w-full bg-blue-600 text-white py-2 font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap rounded-lg">Previous</button>
            {[1, 2, 3].map((page) => (
              <button key={page} className={`px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}>{page}</button>
            ))}
            <button className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap rounded-lg">Next</button>
          </div>
        </div>
      </main>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About Us</h4>
              <p className="text-gray-400">Exploring technology, lifestyle, and productivity in the digital age.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Home</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">About</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Contact</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <i className="fab fa-twitter text-gray-400 hover:text-white text-xl cursor-pointer"></i>
                <i className="fab fa-facebook text-gray-400 hover:text-white text-xl cursor-pointer"></i>
                <i className="fab fa-instagram text-gray-400 hover:text-white text-xl cursor-pointer"></i>
                <i className="fab fa-linkedin text-gray-400 hover:text-white text-xl cursor-pointer"></i>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 text-sm border-none" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-white">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 TechLife Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default AllArticles;
