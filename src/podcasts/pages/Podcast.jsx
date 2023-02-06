import React, { useEffect, useState, useMemo } from 'react';
import { useAxios } from '../hooks';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/Noi.jpg';
import './Podcast.css';

export const Podcast = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: '/us/rss/toppodcasts/limit=100/genre=1310/json',
  });

  const filteredPodcasts = useMemo(() => {
    if (response) {
      return response.feed.entry.filter(item => 
        item['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [response, searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>Podcasts</h1>
      <div className="search-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p style={{ marginRight: '1em', borderRadius: '50%', backgroundColor: 'blue', color: 'white', padding: '0.5em', width: '3em', height: '3em', textAlign: 'center' }}>{filteredPodcasts.length}</p>
        <input 
          type="text" 
          placeholder="Search podcasts" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      {filteredPodcasts.length > 0 ? (
        <div className="podcast-list"> 
          {filteredPodcasts.map((item, index) => (
            <Link 
              key={index} 
              to={`/podcasts/${item['id'].attributes['im:id']}`}
              className="podcast-card" 
              style={{ textDecoration: 'none' }}
            >
              <img src={item['im:image'][0].label || defaultImage} className="img img-responsive" alt={item['im:name'].label} />
              <div className="profile-name">{item['im:name'].label}</div>
              <div>Author: {item['im:artist'].label}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results">No podcasts found.</p>
      )}
    </div>
  );

};