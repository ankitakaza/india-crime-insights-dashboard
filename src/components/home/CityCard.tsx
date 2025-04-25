
import React from 'react';
import { Link } from 'react-router-dom';

interface CityCardProps {
  name: string;
  image: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export const CityCard = ({ name, image, stats }: CityCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover-scale">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{name}</h3>
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{stat.label}:</span>
              <span className="font-semibold text-crime-blue-600">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link 
            to="/dashboard" 
            className="text-crime-blue-600 font-medium hover:text-crime-blue-800 flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
