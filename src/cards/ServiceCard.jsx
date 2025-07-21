import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  icon,
  title,
  description,
  features,
  linkText,
  linkHref,
}) => {
  return (
<div className="relative p-6 rounded-2xl shadow-lg max-w-sm bg-[#faf5ff] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#f3ebff]">
  {/* Top-left blob */}
  <div className="absolute top-0 left-0 w-24 h-24 bg-[#e1d1fd] rounded-br-full opacity-50 z-0"></div>

  {/* Icon positioned on top of the blob */}
  <img
    src={icon}
    alt="icon"
    className="absolute top-4 left-6 z-10 w-20 h-20"
  />

  {/* Bottom-right blob */}
  <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#f5d4eb] rounded-tl-full opacity-50 z-0"></div>

  {/* Title */}
  <h3 className="relative z-10 text-lg font-semibold text-gray-900 mb-2 mt-20">
    {title}
  </h3>

  {/* Description */}
  <p className="relative z-10 text-sm text-gray-600 mb-4">
    {description}
  </p>

  {/* Features */}
  <ul className="relative z-10 text-sm text-gray-700 space-y-2 mb-4">
    {features?.length > 0 ? (
      features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
          {feature}
        </li>
      ))
    ) : (
      <li className="text-gray-400 italic">No features listed</li>
    )}
  </ul>

  {/* Link */}
  {linkHref && linkText && (
    <Link
      to={linkHref}
      className="relative z-10 text-sm text-purple-600 font-medium hover:underline"
      aria-label={`Learn more about ${title}`}
    >
      {linkText}
    </Link>
  )}
</div>

  );
};

export default ServiceCard;
