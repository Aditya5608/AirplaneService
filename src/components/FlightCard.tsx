import React from 'react';
import { Plane, Clock, MapPin, Users } from 'lucide-react';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
            <p className="text-sm text-gray-600">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
          <p className="text-sm text-gray-600">per person</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Departure */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{flight.departure.time}</p>
            <p className="text-sm text-gray-600">{flight.departure.city} ({flight.departure.airport})</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div className="text-center">
            <p className="font-medium text-gray-900">{flight.duration}</p>
            <div className="w-full h-px bg-gray-300 mt-1"></div>
          </div>
        </div>

        {/* Arrival */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{flight.arrival.time}</p>
            <p className="text-sm text-gray-600">{flight.arrival.city} ({flight.arrival.airport})</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{flight.availableSeats} seats left</span>
          </div>
          <span>{flight.aircraft}</span>
        </div>
        <button
          onClick={() => onSelect(flight)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Select Flight
        </button>
      </div>
    </div>
  );
};

export default FlightCard;