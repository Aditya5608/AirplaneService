import React, { useState } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { Flight, PassengerDetail } from '../types';

interface BookingModalProps {
  flight: Flight;
  passengers: number;
  onClose: () => void;
  onConfirm: (passengerDetails: PassengerDetail[]) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  flight, 
  passengers, 
  onClose, 
  onConfirm 
}) => {
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetail[]>(
    Array(passengers).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }))
  );

  const handleInputChange = (index: number, field: keyof PassengerDetail, value: string) => {
    const updated = [...passengerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerDetails(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(passengerDetails);
  };

  const totalPrice = flight.price * passengers;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Flight Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Flight Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Flight</p>
                <p className="font-medium">{flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{flight.departure.date}</p>
              </div>
              <div>
                <p className="text-gray-600">Route</p>
                <p className="font-medium">{flight.departure.city} → {flight.arrival.city}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Price</p>
                <p className="font-medium text-blue-600">${totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Passenger Information</h3>
            {passengerDetails.map((passenger, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-gray-900">Passenger {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={passenger.firstName}
                        onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;