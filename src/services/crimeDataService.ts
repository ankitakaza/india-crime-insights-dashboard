
// Types for our crime data
export type CrimeCategory = 'Violence' | 'Theft' | 'Cybercrime' | 'Women' | 'Children';

export interface CrimeData {
  city: string;
  year: number;
  crimeRate: number;
  categories: {
    [key in CrimeCategory]?: number;
  };
  monthlyCrimes: { month: string; count: number }[];
}

export interface City {
  id: string;
  name: string;
  state: string;
  population: number;
  crimeIndex: number; // overall crime index
  changeFromLastYear: number; // percentage change
}

// List of available cities
export const cities: City[] = [
  { 
    id: 'delhi', 
    name: 'Delhi', 
    state: 'Delhi NCR', 
    population: 16787941, 
    crimeIndex: 143.8,
    changeFromLastYear: -4.2
  },
  { 
    id: 'mumbai', 
    name: 'Mumbai', 
    state: 'Maharashtra', 
    population: 12442373, 
    crimeIndex: 129.5,
    changeFromLastYear: -2.1
  },
  { 
    id: 'bengaluru', 
    name: 'Bengaluru', 
    state: 'Karnataka', 
    population: 8443675, 
    crimeIndex: 118.2,
    changeFromLastYear: -0.8
  },
  { 
    id: 'hyderabad', 
    name: 'Hyderabad', 
    state: 'Telangana', 
    population: 6809970, 
    crimeIndex: 112.4,
    changeFromLastYear: -1.5
  },
  { 
    id: 'chennai', 
    name: 'Chennai', 
    state: 'Tamil Nadu', 
    population: 4646732, 
    crimeIndex: 97.6,
    changeFromLastYear: -3.2
  },
  { 
    id: 'kolkata', 
    name: 'Kolkata', 
    state: 'West Bengal', 
    population: 4496694, 
    crimeIndex: 87.3,
    changeFromLastYear: -5.4
  },
  { 
    id: 'ahmedabad', 
    name: 'Ahmedabad', 
    state: 'Gujarat', 
    population: 5577940, 
    crimeIndex: 91.2,
    changeFromLastYear: -1.9
  },
  { 
    id: 'pune', 
    name: 'Pune', 
    state: 'Maharashtra', 
    population: 3124458, 
    crimeIndex: 89.4,
    changeFromLastYear: -0.6
  },
  { 
    id: 'jaipur', 
    name: 'Jaipur', 
    state: 'Rajasthan', 
    population: 3046163, 
    crimeIndex: 96.8,
    changeFromLastYear: -2.3
  },
  { 
    id: 'lucknow', 
    name: 'Lucknow', 
    state: 'Uttar Pradesh', 
    population: 2815601, 
    crimeIndex: 102.5,
    changeFromLastYear: -1.1
  },
];

// Generate random monthly data for a city
const generateMonthlyData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => ({
    month,
    count: Math.floor(Math.random() * 1000) + 500
  }));
};

// Generate fake crime data for a city
const generateCityData = (city: City): CrimeData => {
  const baseRate = city.crimeIndex;
  
  return {
    city: city.name,
    year: 2023,
    crimeRate: baseRate,
    categories: {
      'Violence': Math.floor(baseRate * (0.2 + Math.random() * 0.1)),
      'Theft': Math.floor(baseRate * (0.3 + Math.random() * 0.15)),
      'Cybercrime': Math.floor(baseRate * (0.15 + Math.random() * 0.1)),
      'Women': Math.floor(baseRate * (0.2 + Math.random() * 0.1)),
      'Children': Math.floor(baseRate * (0.15 + Math.random() * 0.05)),
    },
    monthlyCrimes: generateMonthlyData(),
  };
};

// Generate yearly trend data (5 years)
export const generateYearlyTrend = (city: City) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
  
  return years.map(year => {
    // Start with base rate and adjust it randomly for past years
    // Make sure the trend roughly matches the city's changeFromLastYear
    const yearDiff = currentYear - year;
    let adjustedRate;
    
    if (year === currentYear) {
      adjustedRate = city.crimeIndex;
    } else {
      // Apply compounded change going backward
      const compoundFactor = 1 + (city.changeFromLastYear / 100) * -1;
      adjustedRate = city.crimeIndex * Math.pow(compoundFactor, yearDiff);
      
      // Add some randomness
      adjustedRate *= (0.95 + Math.random() * 0.1);
    }
    
    return {
      year,
      rate: Math.round(adjustedRate * 10) / 10,
    };
  });
};

// Generate comparison data for all cities for a specific category
export const generateCategoryComparison = (category: CrimeCategory) => {
  return cities.map(city => {
    const cityData = generateCityData(city);
    return {
      city: city.name,
      value: cityData.categories[category] || 0
    };
  }).sort((a, b) => b.value - a.value);
};

// Function to get data for a specific city
export const getCityData = (cityId: string): CrimeData | null => {
  const city = cities.find(c => c.id === cityId);
  if (!city) return null;
  
  return generateCityData(city);
};

// Function to get data for all cities
export const getAllCitiesData = (): CrimeData[] => {
  return cities.map(city => generateCityData(city));
};

// Function to search cities by name
export const searchCities = (query: string): City[] => {
  const lowercaseQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) || 
    city.state.toLowerCase().includes(lowercaseQuery)
  );
};
