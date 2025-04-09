
import React from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle, Leaf } from 'lucide-react';

const HealthAndSafety = () => {
  const cleaningPractices = [
    "Enhanced cleaning protocols using hospital-grade disinfectants",
    "High-touch surfaces sanitized regularly",
    "Rooms sealed after cleaning until guest check-in",
    "All linens sanitized in high-temperature wash",
    "Staff trained in comprehensive hygiene protocols"
  ];

  const safetyMeasures = [
    "Contactless check-in and check-out available",
    "Temperature checks for staff and guests",
    "Hand sanitizer stations throughout the property",
    "Masks required in public areas",
    "Social distancing enforced in common areas",
    "Protective shields at front desk"
  ];

  const sustainabilityEfforts = [
    "Energy-efficient lighting throughout the property",
    "Water conservation program",
    "Reduced single-use plastics",
    "Locally-sourced food items when possible",
    "Digital receipts to reduce paper waste"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-6">Health & Safety Measures</h2>
        <p className="text-stone-600 mb-8">
          We're committed to providing a safe and clean environment for all our guests and staff. 
          Our enhanced health and safety protocols follow the latest guidelines to ensure your stay is comfortable and worry-free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-lg">Enhanced Cleaning</h3>
          </div>
          <ul className="space-y-3">
            {cleaningPractices.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <h3 className="font-semibold text-lg">Safety Measures</h3>
          </div>
          <ul className="space-y-3">
            {safetyMeasures.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <Leaf className="h-6 w-6 text-green-600" />
          <h3 className="font-semibold text-lg">Sustainability Initiatives</h3>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <p className="text-green-800 mb-4">
            Our hotel is committed to reducing our environmental impact while providing an exceptional stay experience.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {sustainabilityEfforts.map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-green-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-3">Certification & Compliance</h3>
        <p className="text-blue-700">
          Our health and safety protocols have been certified by local health authorities and comply with all government regulations. 
          We regularly update our practices to align with the latest health advisories and industry standards.
        </p>
      </div>
    </div>
  );
};

export default HealthAndSafety;
