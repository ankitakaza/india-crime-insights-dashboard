
import React from 'react';

interface StatCardProps {
  number: string;
  description: string;
  icon: React.ReactNode;
}

export const StatCard = ({ number, description, icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 animate-slide-in">
      <div className="text-crime-blue-500 mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{number}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
