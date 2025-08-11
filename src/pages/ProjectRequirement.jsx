import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AlarmClockPlus, Calendar, CalendarDays, CalendarCheck, ArrowRight
} from "lucide-react";

import CursorGlow from "../components/CursorGlow";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const ProjectRequirement = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState({});
  const [projectTimeline, setProjectTimeline] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [budgetRange, setBudgetRange] = useState(2510000);

  // User input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Submit state
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false);

  const maxAdditionalLength = 500;
  const minBudget = 10000;
  const maxBudget = 5000000;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_DOMAIN}/services/get-all`);
        const data = await res.json();
        setServicesData(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (title, checked) => {
    if (checked) {
      setSelectedServices((prev) => [...prev, title]);
      setSelectedSubServices((prev) => ({ ...prev, [title]: [] }));
    } else {
      setSelectedServices((prev) => prev.filter((s) => s !== title));
      setSelectedSubServices((prev) => {
        const updated = { ...prev };
        delete updated[title];
        return updated;
      });
    }
  };

  const handleSubServiceChange = (serviceTitle, sub, checked) => {
    setSelectedSubServices((prev) => {
      const currentSubs = prev[serviceTitle] || [];
      if (checked) {
        return {
          ...prev,
          [serviceTitle]: [...currentSubs, sub],
        };
      } else {
        return {
          ...prev,
          [serviceTitle]: currentSubs.filter((s) => s !== sub),
        };
      }
    });
  };

  const formatCurrency = (value) => {
    if (value >= maxBudget) return "₹50,00,000+";
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSelectedServices([]);
    setSelectedSubServices({});
    setProjectTimeline("");
    setAdditionalRequirements("");
    setKeepUpdated(false);
    setBudgetRange(2510000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const formData = {
      username,
      email,
      phone,
      address,
      selectedServices,
      selectedSubServices,
      projectTimeline,
      additionalRequirements,
      keepUpdated,
      budgetRange,
    };

    try {
      const response = await axios.post(
        `${API_DOMAIN}/project-requirements/save`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus("success");
        resetForm(); // optional reset on success
        console.log("Submission success:", response.data);
      } else {
        setSubmitStatus("error");
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Axios error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen font-sans">
      <section id="color-header" className="relative overflow-hidden sm:px-6 md:px-8 py-25 bg-gradient-to-b from-[#100124] to-[#1c003f]">
        <CursorGlow targetId="color-header" />
        <Navbar />

        <div className="w-full text-center">
          <div className="bg-zinc-900 text-white px-4 py-1 rounded-full shadow text-sm inline-block">
            <span className="text-purple-400 font-semibold">Custom</span> Project Planner!
          </div>
          <h1 className=" text-white text-4xl md:text-5xl font-bold mt-4">
            Project
            <br />
            <span className="text-purple-600 md:text-6xl">Requirements</span>
          </h1>
          <p className="text-sm text-gray-300 mt-4 max-w-xl mx-auto">
            Tell us about your project needs and let's create something amazing together.
          </p>
        </div>
      </section>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-gray-800 bg-white min-h-screen mt-10">

            {/* User Details */}
            <div>
              <label className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="example@domain.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Address (optional)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your city / full address"
              />
            </div>


            {/* Project Types (Service Titles) */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">Project Types</h3>
              {loading ? (
                <Loader />
              ) : (
                servicesData.map((service) => (
                  <div key={service._id} className="flex items-center border rounded-lg px-4 py-3 border-gray-300">
                    <input
                      type="checkbox"
                      value={service.title}
                      checked={selectedServices.includes(service.title)}
                      onChange={(e) => handleServiceChange(service.title, e.target.checked)}
                      className="mr-3 accent-purple-800"
                    />
                    <span className="text-sm">{service.title}</span>
                  </div>
                ))
              )}
            </div>

            {/* Budget Range */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Budget Range</h3>
            <div className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6 rounded-2xl shadow-sm border border-purple-200">

              {/* Slider Container with 3D effect */}
              <div className="relative w-full h-12 flex items-center justify-center">
                {/* Slider track background */}
                <div className="absolute w-full h-3 bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 rounded-full shadow-inner" />

                {/* Slider input */}
                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={10000}
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                  className="w-full appearance-none bg-transparent cursor-pointer z-10"
                />

                {/* Custom thumb using pseudo-3D */}
                <style jsx>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 24px;
                    width: 24px;
                    background: radial-gradient(circle, #a855f7 0%, #7e22ce 70%);
                    border-radius: 50%;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    border: 2px solid white;
                    margin-top: -10px;
                    transition: transform 0.2s;
                  }

                  input[type='range']::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                  }

                  input[type='range']::-moz-range-thumb {
                    height: 24px;
                    width: 24px;
                    background: radial-gradient(circle, #a855f7 0%, #7e22ce 70%);
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    transition: transform 0.2s;
                  }

                  input[type='range']::-moz-range-thumb:hover {
                    transform: scale(1.2);
                  }
                `}</style>

                {/* Marker bubble */}
                <div
                  className="absolute -top-12 transform -translate-x-1/2 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg"
                  style={{
                    left: `${((budgetRange - minBudget) / (maxBudget - minBudget)) * 100}%`,
                  }}
                >
                  {formatCurrency(budgetRange)}
                  <div className="absolute left-1/2 -bottom-1 w-2 h-2 transform -translate-x-1/2 rotate-45 bg-purple-700"></div>
                </div>
              </div>

              {/* Budget Range Labels */}
              <div className="mt-10 flex justify-between text-sm font-medium text-gray-700">
                <div className="text-left">
                  <p className="text-xs text-gray-500">Min</p>
                  <p className="font-semibold">₹10,000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Max</p>
                  <p className="font-semibold">₹50,00,000+</p>
                </div>
              </div>
            </div>
          </div>




            {/* Timeline */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Urgent", duration: "1–2 weeks", icon: AlarmClockPlus },
                  { label: "Short Term", duration: "1–2 months", icon: Calendar },
                  { label: "Medium Term", duration: "3–6 months", icon: CalendarDays },
                  { label: "Long Term", duration: "6+ months", icon: CalendarCheck }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setProjectTimeline(item.label)}
                      className={`border rounded-lg p-4 text-center cursor-pointer ${projectTimeline === item.label ? "border-purple-600 bg-purple-50" : "border-gray-300"}`}
                    >
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.duration}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features (Sub-Services) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              {loading ? (
                <Loader />
              ) : selectedServices.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Select a service to view features.</p>
              ) : (
                selectedServices.map((title) => {
                  const service = servicesData.find((s) => s.title === title);
                  return (
                    <div key={title} className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">{title}</h4>
                      <div className="ml-2 space-y-1">
                        {service?.sub_services?.map((sub, idx) => (
                          <label key={idx} className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={selectedSubServices[title]?.includes(sub) || false}
                              onChange={(e) =>
                                handleSubServiceChange(title, sub, e.target.checked)
                              }
                              className="mr-2 accent-purple-600"
                            />
                            {sub}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Additional Requirements */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Additional Requirements</h3>
              <textarea
                placeholder="Any other notes or considerations..."
                value={additionalRequirements}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= maxAdditionalLength) setAdditionalRequirements(value);
                }}
                className="w-full min-h-[80px] p-3 border rounded-lg border-gray-300 resize-none"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-0">
                <p>Be as detailed as possible</p>
                <p>{additionalRequirements.length}/{maxAdditionalLength} characters</p>
              </div>
            </div>

            {/* Keep Updated */}
            <div className="flex items-center col-span-1">
              <input
                type="checkbox"
                checked={keepUpdated}
                onChange={(e) => setKeepUpdated(e.target.checked)}
                className="mr-2 accent-purple-600"
              />
              <span className="text-sm text-gray-700">Keep me updated with new features & offers.</span>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-end items-end sm:items-center col-span-1 md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-purple-950 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p className="font-medium">{submitting ? "Submitting..." : "Submit Requirements"}</p>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Submission Feedback */}
            {submitStatus === "success" && (
              <p className="text-green-600 font-medium col-span-2 text-sm">
                Your project requirements have been submitted successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 font-medium col-span-2 text-sm">
                There was an error submitting the form. Please try again later.
              </p>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectRequirement;
