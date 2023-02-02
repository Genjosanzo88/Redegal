import React, { useEffect, useState } from 'react';
import { useAxios } from '../hooks';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/Noi.jpg';
import './Products.css';

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: '/us/rss/toppodcasts/limit=100/genre=1310/json',
  });

  useEffect(() => {
    if (response) {
      const filteredResults = response.feed.entry.filter(item => 
        item['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPodcasts(filteredResults);
    }
  }, [response, searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className='App'>
      <h1>Podcasts</h1>
      <input type="text" placeholder="Search podcasts" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      { filteredPodcasts.length > 0 ? (
        <div> 
          <p>{filteredPodcasts.length} podcast(s) found</p>
          { filteredPodcasts.map((item, index) => (
            <Link key={index} to="#" className="my-card" style={{ textDecoration: 'none' }}>
              <img src={item['im:image'][0].label || defaultImage} className="img img-responsive" alt={item['im:name'].label} />
              <div className="profile-name">{item['im:name'].label}</div>
              <div >Author: {item['im:artist'].label}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No podcasts found.</p>
      )}
    </div>
  );
};