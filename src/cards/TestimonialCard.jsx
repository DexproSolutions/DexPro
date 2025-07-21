import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, title, rating }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-full"> {/* Adjusted shadow and rounded corners */}
    <div className="flex justify-between items-start mb-4">
      <Quote className="text-red-500 w-6 h-6" /> {/* Adjusted size to match image */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} // Changed fill-yellow-400 to fill-current for better consistency
          />
        ))}
      </div>
    </div>
    <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">{quote}</p> {/* Ensured text-left alignment */}
    <div>
      <h3 className="font-bold text-gray-900 text-lg">{name}</h3> {/* Adjusted font-weight and size */}
      <p className="text-gray-500 text-base">{title}</p> {/* Adjusted font-size */}
    </div>
  </div>
);


export default TestimonialCard;
