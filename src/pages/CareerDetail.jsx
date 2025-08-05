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

function CareerDetail() {
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/job/get/${id}`);
        setSelectedJob(response.data || null);
        setSelectedJobId(response.data?.id)
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    if (id) getData();
  }, [id]);

  if (!selectedJob) {
    return <div className="text-center py-10 text-gray-500">Loading job details...</div>;
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-yellow-100 text-yellow-800';
      case 'freelance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#140228] cursor-pointer hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Listings
        </button>

        {/* Job Header Card */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedJob.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <BadgeCheck className="h-4 w-4" />
                  {selectedJob.status === 'open' ? 'Open' : 'Closed'}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    selectedJob.type
                  )}`}
                >
                  {selectedJob.type?.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>

              <div className="flex flex-wrap items-center text-gray-600 gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedJob.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Posted on{' '}
                  {new Date(selectedJob.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                {selectedJob.compensation && (
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    {selectedJob.compensation}
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-4 lg:mt-0">
              {selectedJob.status === 'open' ? (
                <button
                  onClick={()=>{
                     setShowApplicationModal(true)
                  }}
                  className="inline-flex cursor-pointer items-center justify-center bg-[#140228] hover:bg-[#240346] text-white px-6 py-3 rounded-md text-sm font-medium transition"
                >
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md text-sm font-medium cursor-not-allowed"
                >
                  Position Closed
                </button>
              )}
            </div>
          </div>

          {/* Skills */}
          {selectedJob.skills?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {selectedJob.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                <Info className="h-5 w-5 mr-2" />
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </section>

            {selectedJob.requirements?.length > 0 && (
              <section>
                <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                  <BadgeCheck className="h-5 w-5 mr-2" />
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {selectedJob.status === 'open' && (
              <div className="bg-[#f4eef7] border-[#e8dcef] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#140228] mb-2">Ready to Apply?</h3>
                <p className="text-sm text-[#2e084f] mb-4">
                  Join our team and be part of something great. We're excited to meet you!
                </p>
                <button
                  onClick={()=>{
                     setShowApplicationModal(true)
                  }}
                  className="inline-block cursor-pointer px-6 py-2 text-sm font-medium bg-[#140228] hover:bg-[#240346] text-white rounded-md transition"
                >
                  Apply for this Job →
                </button>
              </div>
            )}

            {/* Optional company info section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Company Info</h4>
              <div className="text-sm text-gray-700 space-y-1">
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
          </aside>
        </div>
      </div>
          {showApplicationModal && (
            <JobApplicationModal
                jobId={selectedJobId}
                onClose={() => setShowApplicationModal(false)}
             />
           )}
    </div>
  );
}

export default CareerDetail;