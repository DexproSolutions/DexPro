import React, { useState } from 'react';
import { X, Upload, User, Mail, Phone, FileText, Send } from 'lucide-react';
import axios from 'axios';
import MessageAlert from './MessageAlert';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export default function JobApplicationModal({ onClose, jobId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumePDF: null,
    coverLetter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resumePDF') {
      setFormData((prev) => ({ ...prev, resumePDF: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('resumePDF', formData.resumePDF);
    form.append('coverLetter', formData.coverLetter);
    form.append('jobId', jobId);

    try {
      const response = await axios.post(`${API_DOMAIN}/applicant/save/${jobId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setAlertType('success');
        setAlertMessage('Application submitted successfully! We\'ll get back to you soon.');
        setShowAlert(true);
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          resumePDF: null,
          coverLetter: '',
        });

        // Auto-close after delay
        setTimeout(() => {
          setShowAlert(false);
          onClose();
        }, 3000);
      } else {
        setAlertType('error');
        setAlertMessage('Please check your details and try again.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertType('error');
      
      // Check if there's a specific error message in the response
      if (error.response?.data?.message) {
        setAlertMessage(error.response.data.message);
      } else if (error.response?.data?.error) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage('Failed to submit application. Please try again.');
      }
      
      setShowAlert(true);
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Job Application</h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Please fill in your details below</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Form - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="resumePDF"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center gap-2 w-full p-2.5 border border-gray-300 rounded-md cursor-pointer hover:border-purple-400 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Upload className="text-gray-400" size={14} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">
                        {formData.resumePDF ? formData.resumePDF.name : 'Choose file'}
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX files only</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cover Letter <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 text-gray-400" size={14} />
                  <textarea
                    name="coverLetter"
                    rows="3"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're interested in this position..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none text-sm"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer - Fixed */}
          <div className="flex gap-2 p-4 sm:p-6 border-t border-gray-100 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 sm:px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 sm:px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {showAlert && (
        <MessageAlert
          type={alertType}
          title={alertType === 'success' ? 'Success!' : 'Error!'}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          autoClose={true}
          duration={3000}
        />
      )}
    </>
  );
}

