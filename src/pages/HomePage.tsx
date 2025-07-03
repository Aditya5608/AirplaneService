import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Users, Shield, Clock } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import { SearchParams } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setSearchLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to results page with search params
    const searchParams = new URLSearchParams({
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      passengers: params.passengers.toString(),
    });
    
    navigate(`/flights?${searchParams.toString()}`);
    setSearchLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Fly with <span className="text-blue-600">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the world with SkyLine Airlines. Book your next adventure 
              with unbeatable prices and exceptional service.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} loading={searchLoading} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SkyLine?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our premium travel services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                Your personal information and payment details are protected with 
                industry-leading security measures.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated customer support team is available around the clock 
                to assist you with any questions or concerns.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted by Millions</h3>
              <p className="text-gray-600">
                Join millions of satisfied customers who trust SkyLine for their 
                travel needs and have made us their preferred airline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore the world's most beautiful cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'New York', price: '$299', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { city: 'Los Angeles', price: '$329', image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { city: 'London', price: '$599', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { city: 'Miami', price: '$249', image: 'https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((destination, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={destination.image} 
                  alt={destination.city}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.city}</h3>
                  <p className="text-gray-600 mb-4">Starting from</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;