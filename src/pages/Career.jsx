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
        const response = await axios.get('http://localhost:3000/job/get-all');
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
    <div className="min-h-screen ">
      <div className="bg-[#140228] text-white" id="color-header">
              <Navbar />
        <CursorGlow targetId="color-header" />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover amazing opportunities with top companies. Whether you're
            looking for full-time positions, part-time work, or freelance gigs,
            we've got you covered.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mt-3 p-4 mb-8 border border-gray-200 rounded-xl bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Filter Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter keywords..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 bg-white"
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto px-4 mb-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Available Positions
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{filteredJobs.length} jobs found</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  {job.status === 'open' && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                        job.type?.toLowerCase() === 'full-time'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.type?.toLowerCase() === 'part-time'
                          ? 'bg-cyan-100 text-cyan-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      Open
                      <span className="ml-2 capitalize">{job.type}</span>
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-700 mb-4">{job.company}</p>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                    <span>{job.compensation || 'Not specified'}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(job.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    {job.description}
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
                      className="px-4 py-2 text-[#140228] border border-[#140228] rounded-md hover:bg-blue-50"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setShowApplicationModal(true);
                      }}
                      className="px-6 py-2 bg-[#140228] hover:bg-[#20033d] text-white rounded-md"
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
      <Footer/>
    </div>
  );
}

export default Career;
