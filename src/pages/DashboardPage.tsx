
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  cities, 
  CrimeCategory, 
  getCityData, 
  generateYearlyTrend,
  generateCategoryComparison,
  searchCities
} from '../services/crimeDataService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const RADIAN = Math.PI / 180;

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [selectedTab, setSelectedTab] = useState<CrimeCategory>('Violence');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(cities);
  const [cityData, setCityData] = useState(getCityData('delhi'));
  const [yearlyTrend, setYearlyTrend] = useState(generateYearlyTrend(cities[0]));
  const [categoryComparison, setCategoryComparison] = useState(generateCategoryComparison('Violence'));
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Update data when city or category changes
  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(c => c.id === selectedCity);
      if (city) {
        const data = getCityData(selectedCity);
        setCityData(data);
        setYearlyTrend(generateYearlyTrend(city));
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    setCategoryComparison(generateCategoryComparison(selectedTab));
  }, [selectedTab]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCities(cities);
    } else {
      setFilteredCities(searchCities(searchQuery));
    }
  }, [searchQuery]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as CrimeCategory);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Convert categoryData to array for pie chart
  const categoryDataArray = cityData ? Object.entries(cityData.categories).map(([name, value]) => ({
    name,
    value
  })) : [];

  // Format monthly data for bar chart
  const monthlyData = cityData?.monthlyCrimes || [];

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-crime-blue-800 mb-2">Crime Statistics Dashboard</h1>
          <p className="text-gray-600">
            Explore crime data across major Indian cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with city filters */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Cities</CardTitle>
                <CardDescription>Select a city to view data</CardDescription>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mb-2"
                  />
                </div>
              </CardHeader>
              <CardContent className="max-h-[40vh] overflow-y-auto">
                <div className="space-y-2">
                  {filteredCities.map((city) => (
                    <Button
                      key={city.id}
                      variant={selectedCity === city.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCitySelect(city.id)}
                    >
                      <span className="truncate">{city.name}</span>
                      <span className={`ml-auto ${city.changeFromLastYear < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {city.changeFromLastYear > 0 ? '+' : ''}{city.changeFromLastYear}%
                      </span>
                    </Button>
                  ))}
                  
                  {filteredCities.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No cities found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-3 space-y-6">
            {/* City overview */}
            {cityData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{cityData.city} Crime Overview</CardTitle>
                  <CardDescription>
                    Overall crime rate: <span className="font-semibold">{cityData.crimeRate.toFixed(1)}</span> per 100,000 people
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Crime category tabs */}
            <Tabs defaultValue="Violence" value={selectedTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-2">
                <TabsTrigger value="Violence">Violence</TabsTrigger>
                <TabsTrigger value="Theft">Theft</TabsTrigger>
                <TabsTrigger value="Cybercrime">Cybercrime</TabsTrigger>
                <TabsTrigger value="Women">Women</TabsTrigger>
                <TabsTrigger value="Children">Children</TabsTrigger>
              </TabsList>

              {/* Tab content */}
              <TabsContent value={selectedTab} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Distribution Pie Chart */}
                  <Card className="chart-container">
                    <CardHeader>
                      <CardTitle>Crime Distribution</CardTitle>
                      <CardDescription>Category breakdown for {cityData?.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryDataArray}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryDataArray.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} incidents`, '']} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Year-on-Year Trend Line Chart */}
                  <Card className="chart-container">
                    <CardHeader>
                      <CardTitle>Yearly Trend</CardTitle>
                      <CardDescription>5-year crime rate trend for {cityData?.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={yearlyTrend}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`${value} per 100k`, 'Crime Rate']} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="rate"
                              stroke="#0A2463"
                              activeDot={{ r: 8 }}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Crime Bar Chart */}
                <Card className="chart-container">
                  <CardHeader>
                    <CardTitle>Monthly Crime Incidents (2023)</CardTitle>
                    <CardDescription>Number of incidents reported each month in {cityData?.city}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} incidents`, '']} />
                          <Legend />
                          <Bar dataKey="count" name="Incidents" fill="#3E92CC" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Comparison Bar Chart */}
                <Card className="chart-container">
                  <CardHeader>
                    <CardTitle>{selectedTab} Comparison</CardTitle>
                    <CardDescription>Compare {selectedTab} crime rates across major cities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={categoryComparison}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="city" type="category" width={80} />
                          <Tooltip formatter={(value) => [`${value} incidents`, '']} />
                          <Legend />
                          <Bar dataKey="value" name={selectedTab} fill="#0A2463" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
