import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import BookingModal from '../components/BookingModal';
import { Flight, SearchParams, PassengerDetail } from '../types';
import { apiClient } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const FlightsPage: React.FC = () => {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: urlParams.get('from') || '',
    to: urlParams.get('to') || '',
    departureDate: urlParams.get('departureDate') || '',
    passengers: parseInt(urlParams.get('passengers') || '1'),
  });

  useEffect(() => {
    if (searchParams.from && searchParams.to && searchParams.departureDate) {
      searchFlights(searchParams);
    }
  }, []);

  const searchFlights = async (params: SearchParams) => {
    setLoading(true);
    try {
      const results = await apiClient.searchFlights(params);
      setFlights(results);
      setSearchParams(params);
    } catch (error) {
      toast.error('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelect = (flight: Flight) => {
    if (!isAuthenticated) {
      toast.error('Please log in to book a flight');
      navigate('/login');
      return;
    }
    setSelectedFlight(flight);
  };

  const handleBookingConfirm = async (passengerDetails: PassengerDetail[]) => {
    if (!selectedFlight) return;

    try {
      const booking = await apiClient.createBooking({
        flightId: selectedFlight.id,
        passengers: searchParams.passengers,
        passengerDetails,
      });

      toast.success('Booking confirmed successfully!');
      setSelectedFlight(null);
      navigate('/my-bookings');
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={searchFlights} loading={loading} />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching for flights...</p>
            </div>
          ) : flights.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {flights.length} flight{flights.length !== 1 ? 's' : ''} found
                </h2>
                <p className="text-gray-600">
                  {searchParams.from} → {searchParams.to} • {searchParams.departureDate}
                </p>
              </div>
              
              <div className="space-y-4">
                {flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={handleFlightSelect}
                  />
                ))}
              </div>
            </>
          ) : searchParams.from && searchParams.to && searchParams.departureDate ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check back later for more options.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search for flights</h3>
              <p className="text-gray-600">
                Enter your travel details above to find available flights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedFlight && (
        <BookingModal
          flight={selectedFlight}
          passengers={searchParams.passengers}
          onClose={() => setSelectedFlight(null)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default FlightsPage;