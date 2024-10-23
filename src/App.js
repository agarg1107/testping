import React, { useState, useEffect } from 'react';
import Board from './components/Board';

function App() {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('status'); // Default sort by status

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(jsonData => {
        setData({ 
          tickets: jsonData.tickets || [], 
          users: jsonData.users || []
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <select value={sortOption} onChange={handleSortChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
      <Board tickets={data.tickets} users={data.users} sortOption={sortOption} />
    </div>
  );
}

export default App;
