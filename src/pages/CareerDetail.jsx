import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  BadgeCheck,
  DollarSign,
  Info,
  IndianRupee,
  ExternalLink,
} from 'lucide-react';
import JobApplicationModal from '../components/JobApplicationModal';
import CursorGlow from '../components/CursorGlow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

function CareerDetail() {
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/job/get/${id}`);
        setSelectedJob(response.data || null);
        setSelectedJobId(response.data?.id)
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    if (id) getData();
  }, [id]);

  if (!selectedJob) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader type="ring" text="Loading job details..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <section id="color-header" className="relative overflow-hidden sm:px-6 md:px-8 py-25 bg-gradient-to-b from-[#100124] to-[#1c003f]">
        <CursorGlow targetId="color-header" />
        <Navbar />

        <div className="w-full text-center">
          <div className="bg-zinc-900 text-white px-4 py-1 rounded-full shadow text-sm inline-block">
            <span className="text-purple-400 font-semibold">Job</span> Details
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-4">
            {selectedJob.title}
          </h1>
          <p className="text-sm text-gray-300 mt-4 max-w-xl mx-auto">
            {selectedJob.company} • {selectedJob.location}
          </p>
        </div>
      </section>

      <main className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Listings
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      selectedJob.status === 'open'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    {selectedJob.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {selectedJob.type?.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedJob.title}</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Posted on{' '}
                      {new Date(selectedJob.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {selectedJob.compensation && (
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">{selectedJob.compensation}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {selectedJob.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <Info className="h-5 w-5 mr-2 text-purple-600" />
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                    <BadgeCheck className="h-5 w-5 mr-2 text-purple-600" />
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {selectedJob.status === 'open' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-purple-700 mb-4">
                    Join our team and be part of something great. We're excited to meet you!
                  </p>
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full inline-flex items-center justify-center px-6 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Apply for this Job <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Company Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Info</h4>
                <div className="text-sm text-gray-700 space-y-3">
                  <div className="flex justify-between">
                    <span>Industry:</span>
                    <span className="font-medium">Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">30–50 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Founded:</span>
                    <span className="font-medium">2024</span>
                  </div>
                </div>
              </div>

              {/* Apply Button for Mobile */}
              {selectedJob.status === 'open' && (
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>

        {showApplicationModal && (
          <JobApplicationModal
            jobId={selectedJobId}
            onClose={() => setShowApplicationModal(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CareerDetail;


