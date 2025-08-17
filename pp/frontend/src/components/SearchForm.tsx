import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';

interface SearchFormProps {
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination Input */}
        <div className="relative">
          <label htmlFor="destination" className="sr-only">Destination</label>
          <div className="relative">
            <input
              type="text"
              id="destination"
              placeholder="Where are you going?"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              required
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="relative">
          <label htmlFor="checkIn" className="sr-only">Check-in Date</label>
          <div className="relative">
            <input
              type="date"
              id="checkIn"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="relative">
          <label htmlFor="checkOut" className="sr-only">Check-out Date</label>
          <div className="relative">
            <input
              type="date"
              id="checkOut"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Guests Input */}
        <div className="relative">
          <label htmlFor="guests" className="sr-only">Number of Guests</label>
          <div className="relative">
            <input
              type="number"
              id="guests"
              min="1"
              max="10"
              placeholder="Guests"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
              required
            />
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
}