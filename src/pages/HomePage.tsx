
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const statsRef = useRef<HTMLDivElement>(null);
  
  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-crime-blue-800 to-crime-blue-600 text-white pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              India Crime Tracker
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-lg">
              Track and compare crime statistics across major Indian cities
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Button 
                size="lg" 
                className="bg-white text-crime-blue-800 hover:bg-blue-50 transition-all"
                onClick={scrollToStats}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                  {isAuthenticated ? "View Dashboard" : "Sign up for Free"}
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="India Crime Statistics" 
                className="rounded-lg shadow-xl max-w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key stats section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-crime-blue-800">Key Crime Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              number="32%" 
              description="Decrease in violent crimes across major cities" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              }
            />
            
            <StatCard 
              number="65K+" 
              description="Data points collected across 50+ cities" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            
            <StatCard 
              number="28%" 
              description="Increase in cybercrime reports since 2021" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              }
            />
            
            <StatCard 
              number="18%" 
              description="Increase in conviction rates nationwide" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
      
      {/* Featured cities section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-crime-blue-800">Featured Cities</h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Explore detailed crime data from major metropolitan areas across India
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CityCard 
              name="Delhi" 
              image="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "143.8" },
                { label: "YoY Change", value: "-4.2%" }
              ]} 
            />
            
            <CityCard 
              name="Mumbai" 
              image="https://images.unsplash.com/photo-1566552881863-2ec713cce4ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "129.5" },
                { label: "YoY Change", value: "-2.1%" }
              ]} 
            />
            
            <CityCard 
              name="Bengaluru" 
              image="https://images.unsplash.com/photo-1580751302544-62abce6298b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "118.2" },
                { label: "YoY Change", value: "-0.8%" }
              ]} 
            />
            
            <CityCard 
              name="Hyderabad" 
              image="https://images.unsplash.com/photo-1621496503717-028b714c3c54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "112.4" },
                { label: "YoY Change", value: "-1.5%" }
              ]} 
            />
            
            <CityCard 
              name="Chennai" 
              image="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "97.6" },
                { label: "YoY Change", value: "-3.2%" }
              ]} 
            />
            
            <CityCard 
              name="Kolkata" 
              image="https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              stats={[
                { label: "Total Crime Rate", value: "87.3" },
                { label: "YoY Change", value: "-5.4%" }
              ]} 
            />
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-crime-blue-600 hover:bg-crime-blue-700"
              asChild
            >
              <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                Explore All Cities
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-crime-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore crime data?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get access to comprehensive crime statistics and analysis tools to better understand safety trends across India.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-crime-blue-800 hover:bg-blue-50"
            asChild
          >
            <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
              {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ 
  number, 
  description, 
  icon 
}: { 
  number: string; 
  description: string; 
  icon: React.ReactNode 
}) => {
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

const CityCard = ({ 
  name, 
  image, 
  stats 
}: { 
  name: string; 
  image: string; 
  stats: { label: string; value: string }[] 
}) => {
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

export default HomePage;
