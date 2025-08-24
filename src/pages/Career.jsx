import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import JobApplicationModal from '../components/JobApplicationModal';
import CursorGlow from '../components/CursorGlow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

function Career() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [jobType, setJobType] = useState('All Types');
  const [location, setLocation] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_DOMAIN}/job/get-all`);

        setJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = searchKeywords.toLowerCase();
      const jobTitle = job.title?.toLowerCase() || '';
      const jobCompany = job.company?.toLowerCase() || '';
      const jobDescription = job.description?.toLowerCase() || '';
      const jobLocation = job.location?.toLowerCase() || '';
      const requirementSkills = job.requirements || [];

      const matchesKeywords =
        !keyword ||
        jobTitle.includes(keyword) ||
        jobCompany.includes(keyword) ||
        jobDescription.includes(keyword) ||
        requirementSkills.some((skill) =>
          skill.toLowerCase().includes(keyword)
        );

      const matchesJobType =
        jobType === 'All Types' ||
        job.type?.toLowerCase() === jobType.toLowerCase();

      const matchesLocation =
        location.trim() === '' || jobLocation.includes(location.toLowerCase());

      return matchesKeywords && matchesJobType && matchesLocation;
    });
  }, [searchKeywords, jobType, location, jobs]);

  return (
    <div className="min-h-screen font-sans">
      <section id="color-header" className="relative overflow-hidden sm:px-6 md:px-8 py-25 bg-gradient-to-b from-[#100124] to-[#1c003f]">
        <CursorGlow targetId="color-header" />
        <Navbar />

        <div className="w-full text-center">
          <div className="bg-zinc-900 text-white px-4 py-1 rounded-full shadow text-sm inline-block">
            <span className="text-purple-400 font-semibold">Career</span> Opportunities!
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-4">
            Find Your Dream
            <br />
            <span className="text-purple-600 md:text-6xl">Job</span>
          </h1>
          <p className="text-sm text-gray-300 mt-4 max-w-xl mx-auto">
            Discover amazing opportunities with top companies. Whether you're looking for full-time positions, part-time work, or freelance gigs, we've got you covered.
          </p>
        </div>
      </section>

      <main className="bg-white">
        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Filter Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Available Positions
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader type="dots" text="Finding amazing opportunities for you..." size="large" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later for new opportunities.</p>
              <button 
                onClick={() => {
                  setSearchKeywords('');
                  setJobType('All Types');
                  setLocation('');
                }}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{filteredJobs.length} jobs found</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    {job.status === 'open' && (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                          job.type?.toLowerCase() === 'full-time'
                            ? 'bg-purple-100 text-purple-800'
                            : job.type?.toLowerCase() === 'part-time'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        Open
                        <span className="ml-2 capitalize">{job.type}</span>
                      </span>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-700 mb-4">{job.company}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm">{job.compensation || 'Not specified'}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {new Date(job.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {job.description && job.description.length > 150 
                        ? `${job.description.substring(0, 150)}...` 
                        : job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(job.skills || []).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/career-detail/${job.id}`)}
                        className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowApplicationModal(true);
                        }}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {showApplicationModal && (
            <JobApplicationModal
              jobId={selectedJobId}
              onClose={() => setShowApplicationModal(false)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Career;

