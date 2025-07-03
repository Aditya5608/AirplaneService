import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Booking } from '../types';
import { apiClient } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const userBookings = await apiClient.getMyBookings();
      setBookings(userBookings);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.firstName}! Here are your upcoming flights.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">
                Start planning your next adventure by booking a flight.
              </p>
              <button
                onClick={() => window.location.href = '/flights'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search Flights
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Booking Confirmed</h3>
                      <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${booking.totalPrice}</p>
                    <p className="text-sm text-gray-600">Total paid</p>
                  </div>
                </div>

                {booking.flight && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Flight Info */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Flight Details</h4>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">{booking.flight.airline}</span>
                          </p>
                          <p className="text-sm text-gray-600">{booking.flight.flightNumber}</p>
                          <p className="text-sm text-gray-600">{booking.flight.aircraft}</p>
                        </div>
                      </div>

                      {/* Departure */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Departure</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {booking.flight.departure.city} ({booking.flight.departure.airport})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.flight.departure.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.flight.departure.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Arrival</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {booking.flight.arrival.city} ({booking.flight.arrival.airport})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.flight.arrival.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.flight.arrival.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Passengers */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Passengers</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</span>
                          </div>
                          {booking.passengerDetails.map((passenger, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              {passenger.firstName} {passenger.lastName}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;