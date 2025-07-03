export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  availableSeats: number;
  aircraft: string;
  class: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  passengers: number;
  passengerDetails: PassengerDetail[];
  totalPrice: number;
  createdAt: string;
  status: string;
  flight?: Flight;
}

export interface PassengerDetail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  passengers: number;
}