const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Flights
  async searchFlights(params: {
    from: string;
    to: string;
    departureDate: string;
    passengers: number;
  }) {
    const queryParams = new URLSearchParams(params as any);
    return this.request(`/flights/search?${queryParams}`);
  }

  async getFlightById(id: string) {
    return this.request(`/flights/${id}`);
  }

  // Bookings
  async createBooking(bookingData: {
    flightId: string;
    passengers: number;
    passengerDetails: any[];
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getMyBookings() {
    return this.request('/bookings/my-bookings');
  }

  // User
  async getUserProfile() {
    return this.request('/users/profile');
  }
}

export const apiClient = new ApiClient();