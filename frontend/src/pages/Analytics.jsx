import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function Analytics() {
  const { shortCode } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/api/analytics/${shortCode}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            'Failed to load'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [shortCode]);

  if (loading) {
    return (
      <p className="text-center mt-16">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-16 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <h1 className="text-2xl font-bold mb-2">
        Analytics for {data.shortCode}
      </h1>

      <p className="text-gray-500 mb-6">
        Total clicks: {data.totalClicks}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Breakdown
          title="Devices"
          data={data.deviceBreakdown}
        />

        <Breakdown
          title="Browsers"
          data={data.browserBreakdown}
        />

        <Breakdown
          title="Countries"
          data={data.countryBreakdown}
        />
      </div>

      <div className="mt-6">
        <Breakdown
          title="Daily Clicks"
          data={data.dailyClicks}
        />
      </div>
    </div>
  );
}

function Breakdown({ title, data }) {
  const entries = Object.entries(data || {});

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">
        {title}
      </h2>

      {entries.length === 0 ? (
        <p className="text-sm text-gray-400">
          No data
        </p>
      ) : (
        entries.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))
      )}
    </div>
  );
}