import React from 'react';
import { useParams } from 'react-router-dom';

export const PodcastDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Podcast Detail</h2>
      <p>HOLA {id}</p>
    </div>
  );
};