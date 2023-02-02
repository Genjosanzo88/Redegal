import React, { useEffect } from 'react';
import { useAxios } from '../hooks';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/Noi.jpg';
import './Products.css';


export const Products = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPodcasts, setFilteredPodcasts] = React.useState([]);
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: '/us/rss/toppodcasts/limit=100/genre=1310/json',
  });

  useEffect(() => {
    if (response) {
      setFilteredPodcasts(response.feed.entry.filter(item => item['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase())));
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
          { filteredPodcasts.map((item, index) => (
            <Link key={index} to="#" className="my-card">
              <img src={item['im:image'][0].label || defaultImage} className="img img-responsive" alt={item['im:name'].label} />
              <div className="profile-name">{item['im:name'].label}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No podcasts found.</p>
      )}
    </div>
  );
};