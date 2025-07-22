// src/pages/ProjectRequirement.jsx

import React, { useState } from "react";
import {
  Phone, PanelTop, TabletSmartphone, ChartLine, Briefcase, EllipsisVertical,
  AlarmClockPlus, Calendar, CalendarDays, CalendarCheck, ArrowRight
} from "lucide-react";

import CursorGlow from "../components/CursorGlow";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ Imported Footer component

const ProjectRequirement = () => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectTimeline, setProjectTimeline] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [budgetRange, setBudgetRange] = useState(2510000);
  const [featuresRequirements, setFeaturesRequirements] = useState("");

  const maxAdditionalLength = 500;
  const minBudget = 10000;
  const maxBudget = 5000000;

  const handleProjectTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setProjectTypes((prev) => [...prev, value]);
    } else {
      setProjectTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleProjectTimelineChange = (value) => {
    setProjectTimeline(value);
  };

  const formatCurrency = (value) => {
    if (value >= maxBudget) return "₹50,00,000+";
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      projectTypes,
      projectTimeline,
      additionalRequirements,
      keepUpdated,
      budgetRange: formatCurrency(budgetRange),
      featuresRequirements,
    });
    alert("Form submitted! Check the console for details.");
  };

  const handleSaveDraft = () => {
    console.log("Draft Saved:", {
      projectTypes,
      projectTimeline,
      additionalRequirements,
      keepUpdated,
      budgetRange: formatCurrency(budgetRange),
      featuresRequirements,
    });
    alert("Draft saved! Check the console for details.");
  };

  return (
    <div className="min-h-screen min-w-screen font-sans">
      <section id="color-header" className="relative overflow-hidden sm:px-6 md:px-8 py-25 bg-gradient-to-b from-[#100124] to-[#1c003f]">
        <CursorGlow targetId="color-header" />
        <Navbar/>

        {/* Hero Section */}
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
            {/* Project Types */}
            <div className="space-y-3">
              {[
                { label: "Website Development", icon: PanelTop },
                { label: "Mobile App Development", icon: TabletSmartphone },
                { label: "Digital Marketing Campaign", icon: ChartLine },
                { label: "Business Consulting", icon: Briefcase },
                { label: "Other", icon: EllipsisVertical }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center border rounded-lg px-4 py-3 border-gray-300">
                    <input
                      type="checkbox"
                      value={item.label}
                      checked={projectTypes.includes(item.label)}
                      onChange={handleProjectTypeChange}
                      className="mr-3 accent-purple-800"
                    />
                    <Icon className="w-5 h-5 text-black mr-3" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Budget Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Budget Range</h3>
              <div className="bg-gray-50 p-5 rounded-lg shadow">
                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={10000}
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                  className="w-full accent-purple-700"
                />
                <div className="flex justify-between mt-3 text-sm font-medium text-gray-700">
                  <span>Minimum<br />₹10,000</span>
                  <span className="text-purple-700 text-center">Selected<br />{formatCurrency(budgetRange)}</span>
                  <span className="text-right">Maximum<br />₹50,00,000+</span>
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
                      onClick={() => handleProjectTimelineChange(item.label)}
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

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Features & Requirements</h3>
              <textarea
                placeholder="Describe any specific features or technical requirements..."
                value={featuresRequirements}
                onChange={(e) => setFeaturesRequirements(e.target.value)}
                className="w-full min-h-[100px] p-3 border rounded-lg border-gray-300 resize-none"
              />
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
                  type="button"
                  onClick={handleSaveDraft}
                  className="border-2 font-medium text-purple-950 px-4 py-2 rounded-lg hover:bg-purple-950 hover:text-white w-full sm:w-auto"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-purple-950 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <p className="font-medium">Submit Requirements</p>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>

          </div>
        </form>
      </main>

      {/*Footer included here */}
      <Footer />
    </div>
  );
};

export default ProjectRequirement;
