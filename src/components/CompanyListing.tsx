import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  verification_status: string;
}

const CompanyListing = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('verification_status', 'verified')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDrivers(data || []);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Drivers</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">
              {driver.first_name} {driver.last_name}
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>Email: {driver.email}</p>
              <p>Phone: {driver.phone}</p>
              <p className="text-green-600">Status: {driver.verification_status}</p>
            </div>
            <button className="mt-4 w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
              Contact Driver
            </button>
          </div>
        ))}
      </div>
      {drivers.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No verified drivers available at the moment.
        </div>
      )}
    </div>
  );
};

export default CompanyListing;