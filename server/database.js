import { v4 as uuidv4 } from 'uuid';

// In-memory database for demo purposes
// In production, this would be replaced with a real database
export const database = {
  flights: [
    {
      id: uuidv4(),
      flightNumber: 'AD101',
      airline: 'Adiairline',
      departure: {
        airport: 'JFK',
        city: 'New York',
        time: '08:00',
        date: '2024-02-15'
      },
      arrival: {
        airport: 'LAX',
        city: 'Los Angeles',
        time: '11:30',
        date: '2024-02-15'
      },
      duration: '5h 30m',
      price: 299,
      availableSeats: 45,
      aircraft: 'Boeing 737',
      class: 'Economy'
    },
    {
      id: uuidv4(),
      flightNumber: 'AD102',
      airline: 'Adiairline',
      departure: {
        airport: 'LAX',
        city: 'Los Angeles',
        time: '14:00',
        date: '2024-02-15'
      },
      arrival: {
        airport: 'JFK',
        city: 'New York',
        time: '22:15',
        date: '2024-02-15'
      },
      duration: '5h 15m',
      price: 329,
      availableSeats: 38,
      aircraft: 'Boeing 737',
      class: 'Economy'
    },
    {
      id: uuidv4(),
      flightNumber: 'AD201',
      airline: 'Adiairline',
      departure: {
        airport: 'ORD',
        city: 'Chicago',
        time: '09:30',
        date: '2024-02-16'
      },
      arrival: {
        airport: 'MIA',
        city: 'Miami',
        time: '13:45',
        date: '2024-02-16'
      },
      duration: '3h 15m',
      price: 249,
      availableSeats: 52,
      aircraft: 'Airbus A320',
      class: 'Economy'
    },
    {
      id: uuidv4(),
      flightNumber: 'AD301',
      airline: 'Adiairline',
      departure: {
        airport: 'JFK',
        city: 'New York',
        time: '18:00',
        date: '2024-02-16'
      },
      arrival: {
        airport: 'LHR',
        city: 'London',
        time: '06:30',
        date: '2024-02-17'
      },
      duration: '7h 30m',
      price: 599,
      availableSeats: 28,
      aircraft: 'Boeing 787',
      class: 'Economy'
    }
  ],
  users: [],
  bookings: []
};

export const initDatabase = () => {
  console.log('📊 Database initialized with sample data');
  console.log(`✈️  ${database.flights.length} flights available`);
};

export const findFlights = (from, to, departureDate, passengers = 1) => {
  return database.flights.filter(flight => {
    const matchesRoute = flight.departure.city.toLowerCase().includes(from.toLowerCase()) &&
                         flight.arrival.city.toLowerCase().includes(to.toLowerCase());
    const matchesDate = flight.departure.date === departureDate;
    const hasAvailableSeats = flight.availableSeats >= passengers;
    
    return matchesRoute && matchesDate && hasAvailableSeats;
  });
};

export const findFlightById = (id) => {
  return database.flights.find(flight => flight.id === id);
};

export const createUser = (userData) => {
  const user = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  database.users.push(user);
  return user;
};

export const findUserByEmail = (email) => {
  return database.users.find(user => user.email === email);
};

export const findUserById = (id) => {
  return database.users.find(user => user.id === id);
};

export const createBooking = (bookingData) => {
  const booking = {
    id: uuidv4(),
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  database.bookings.push(booking);
  
  // Update available seats
  const flight = database.flights.find(f => f.id === bookingData.flightId);
  if (flight) {
    flight.availableSeats -= bookingData.passengers;
  }
  
  return booking;
};

export const findBookingsByUserId = (userId) => {
  return database.bookings.filter(booking => booking.userId === userId);
};