import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Logo2 from '../assets/dex.png';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTags, setExpandedTags] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  
  const fallbackFeaturedPost = {
    featured_image:
      "https://readdy.ai/api/search-image?query=modern%20minimalist%20workspace%20with%20laptop%20computer%20and%20coffee%20cup%20on%20white%20desk%2C%20soft%20natural%20lighting%2C%20clean%20and%20organized%20setting%2C%20professional%20photography&width=1200&height=600&seq=1&orientation=landscape",
    title: "The Future of Remote Work: Trends and Predictions for 2025",
    author: "Sarah Johnson",
    created_at: "2025-07-23T00:00:00Z",
    short_desc:
      "Explore how remote work continues to evolve and shape the future of our professional lives. From virtual reality meetings to AI-powered productivity tools...",
  };
  const [featuredPost, setFeaturedPost] = useState(fallbackFeaturedPost);

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/api/blogs`);
        const allArticles = res.data.blogs || [];

        // Sort from latest to oldest
        const sortedArticles = [...allArticles].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setArticles(sortedArticles);

        // Set featured post as the one with is_pinned: true
        const pinnedPost = sortedArticles.find(post => post.is_pinned);
        setFeaturedPost(
          pinnedPost || {
            featured_image:
              "https://readdy.ai/api/search-image?query=modern%20minimalist%20workspace%20with%20laptop%20computer%20and%20coffee%20cup%20on%20white%20desk%2C%20soft%20natural%20lighting%2C%20clean%20and%20organized%20setting%2C%20professional%20photography&width=1200&height=600&seq=1&orientation=landscape",
            title: "The Future of Remote Work: Trends and Predictions for 2025",
            author: "Sarah Johnson",
            created_at: "2025-07-23T00:00:00Z",
            short_desc:
              "Explore how remote work continues to evolve and shape the future of our professional lives. From virtual reality meetings to AI-powered productivity tools...",
          }
        );
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/api/categories/with-count`);
        console.log('Fetched categories:', res.data.categories);
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchArticles();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7fa]">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader type="pulse" text="Loading articles..." size="large" />
        </div>
      </div>
    );
  }

  // Filter articles based on selected category and search query
  const filteredArticles = articles.filter(article => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      article.title?.toLowerCase().includes(searchLower) ||
      article.category?.toLowerCase().includes(searchLower) ||
      article.short_desc?.toLowerCase().includes(searchLower) ||
      (article.tags && Array.isArray(article.tags) && 
        article.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    
    return matchesCategory && matchesSearch;
  });

  // Get top 5 featured post titles for sidebar
  const sidebarPopularPosts = articles.slice(0, 5).map(post => post.title);

  const POSTS_PER_PAGE = 6;
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);

  // Generate tags for articles (you can modify this based on your data structure)
  const generateTags = (article) => {
    const tags = [];
    if (article.category) tags.push(article.category);
    if (article.tags && Array.isArray(article.tags)) {
      tags.push(...article.tags);
    }
    // Add some default tags based on content if no tags exist
    if (tags.length === 0) {
      const defaultTags = ['Technology', 'Development', 'Design', 'Innovation', 'Digital', 'Creative'];
      tags.push(...defaultTags.slice(0, 3));
    }
    return tags; // Return all tags, we'll handle display logic in the component
  };

  // Tag color schemes for variety
  const tagColors = [
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-red-100 text-red-800 border-red-200',
    'bg-yellow-100 text-yellow-800 border-yellow-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
  ];

  const getTagColor = (index) => {
    return tagColors[index % tagColors.length];
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

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles by title, tags, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Found {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({articles.length})
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.category} ({category.post_count})
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {searchQuery ? 'No search results found' : 'No articles found'}
                </h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? `No articles found for "${searchQuery}". Try different keywords or browse all categories.`
                    : 'No articles available in the selected category.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article) => {
                  const tags = generateTags(article);
                  return (
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
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
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
                        
                        {/* Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, expandedTags[article.id] ? tags.length : 4).map((tag, index) => (
                              <span
                                key={index}
                                className={`${getTagColor(index)} text-xs px-2.5 py-1 rounded-full border font-medium hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}
                                title={`Click to filter by ${tag}`}
                              >
                                #{tag}
                              </span>
                            ))}
                            {tags.length > 4 && !expandedTags[article.id] && (
                              <button
                                onClick={() => setExpandedTags(prev => ({ ...prev, [article.id]: true }))}
                                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full border font-medium cursor-pointer hover:bg-gray-200 transition-colors hover:scale-105"
                              >
                                +{tags.length - 4} more
                              </button>
                            )}
                            {expandedTags[article.id] && tags.length > 4 && (
                              <button
                                onClick={() => setExpandedTags(prev => ({ ...prev, [article.id]: false }))}
                                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full border font-medium cursor-pointer hover:bg-gray-200 transition-colors hover:scale-105"
                              >
                                Show less
                              </button>
                            )}
                          </div>
                        </div>

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
                          <a href={`/blog/${article.slug}`} className="text-purple-600 font-medium hover:underline">Read More</a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-between cursor-pointer transition-colors ${
                    selectedCategory === 'All' ? 'text-purple-600 font-medium' : 'hover:text-purple-600'
                  }`}
                  onClick={() => setSelectedCategory('All')}
                >
                  <span>All Categories</span>
                  <span className="text-gray-500 text-sm">{articles.length}</span>
                </div>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between cursor-pointer transition-colors ${
                      selectedCategory === category.category ? 'text-purple-600 font-medium' : 'hover:text-purple-600'
                    }`}
                    onClick={() => setSelectedCategory(category.category)}
                  >
                    <span>{category.category}</span>
                    <span className="text-gray-500 text-sm">{category.post_count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Popular Posts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <a
                    key={article.id || index}
                    href={`/blog/${article.slug}`}
                    className="cursor-pointer hover:text-purple-600 block"
                  >
                    <h4 className="font-medium">{article.title}</h4>
                  </a>
                ))}
              </div>
            </div>
            {/* Newsletter */}
            <div className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-[#9859fe] via-[#602fea] to-[#130129] text-white">
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="mb-4 text-white/80">Stay updated with our latest posts</p>
              <div className="space-y-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9859fe] border-none shadow"
                  style={{ background: 'rgba(255,255,255,0.9)' }}
                />
                <button
                  className="w-full bg-transparent border border-white text-white py-2 font-semibold rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shadow"
                  onClick={async () => {
                    if (!newsletterEmail) {
                      setNewsletterStatus("Please enter your email.");
                      setShowNewsletterPopup(true);
                      setTimeout(() => setShowNewsletterPopup(false), 2500);
                      return;
                    }
                    try {
                      await axios.post(`${API_DOMAIN}/api/newsletter`, { email: newsletterEmail });
                      setNewsletterStatus("Subscribed successfully!");
                      setNewsletterEmail("");
                    } catch (err) {
                      setNewsletterStatus("Subscription failed. Try again.");
                    }
                    setShowNewsletterPopup(true);
                    setTimeout(() => setShowNewsletterPopup(false), 2500);
                  }}
                >
                  Subscribe
                </button>
                {showNewsletterPopup && (
                  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#9859fe] text-white px-6 py-3 rounded-xl shadow-lg z-50 text-center font-semibold animate-fade-in-out">
                    {newsletterStatus}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
        {/* Pagination */}
        {filteredArticles.length > POSTS_PER_PAGE && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white font-semibold shadow hover:from-[#602fea] hover:to-[#9859fe] transition-colors cursor-pointer whitespace-nowrap"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg font-semibold shadow cursor-pointer whitespace-nowrap border-none transition-colors ${currentPage === page ? 'bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white' : 'bg-white text-[#602fea] hover:bg-gradient-to-r hover:from-[#9859fe] hover:to-[#602fea] hover:text-white'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9859fe] to-[#602fea] text-white font-semibold shadow hover:from-[#602fea] hover:to-[#9859fe] transition-colors cursor-pointer whitespace-nowrap"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
      {/* Footer Section */}
        <Footer />
        {/* Back to Top Button */}
    </div>
  );
};

export default AllArticles;
