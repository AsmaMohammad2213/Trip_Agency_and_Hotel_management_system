import React, { useState } from 'react';
import { Database, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { populateDatabase } from '../services/sampleData';

export default function DatabasePopulator() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePopulateDatabase = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await populateDatabase();
      setSuccess(true);
    } catch (err) {
      setError('Failed to populate database. Please make sure you are logged in as an admin and the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Populate Database</h3>
        <p className="text-gray-600 text-sm">
          Add sample hotels and destinations to the database for testing purposes.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Database populated successfully! You can now browse hotels and destinations.
        </div>
      )}

      <button
        onClick={handlePopulateDatabase}
        disabled={loading}
        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <>
            <Loader className="h-5 w-5 animate-spin mr-2" />
            Populating Database...
          </>
        ) : (
          <>
            <Database className="h-5 w-5 mr-2" />
            Add Sample Data
          </>
        )}
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>This will add:</p>
        <p>• 6 sample hotels with amenities and images</p>
        <p>• 7 popular destinations with attractions</p>
        <p>Requires admin authentication</p>
      </div>
    </div>
  );
}
