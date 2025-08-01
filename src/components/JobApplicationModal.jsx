import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function JobApplicationModal({ onClose, jobId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumePDF: null,
    coverLetter: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('resumePDF', formData.resumePDF);
    form.append('coverLetter', formData.coverLetter);
    form.append('jobId', jobId);

    try {
      const response = await axios.post(`http://localhost:3000/applicant/save/${jobId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

         if (response.status === 201) {
             setMessage('Application submitted successfully!');
             setMessageType('success');
         }
         else{
             setMessage('Please Check Details!');
             setMessageType('error');
         }

      // Optional: clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        resumePDF: null,
        coverLetter: '',
      });

      // Auto-close after short delay (optional)
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 2000);
      
    } catch (error) {
      setMessage('Failed to submit application. Please try again.');
      setMessageType('error');
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>

        {/* Message display */}
        {message && (
          <div
            className={`p-3 rounded-md mb-4 text-sm ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resume (PDF)*</label>
            <input
              name="resumePDF"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Letter (Optional)</label>
            <textarea
              name="coverLetter"
              rows="3"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you're interested in this position..."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-[#140228] hover:bg-[#20033d] text-white rounded-md"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
