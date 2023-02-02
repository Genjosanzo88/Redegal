import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://itunes.apple.com';

export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
      const cachedData = localStorage.getItem(params.url);
      const now = new Date().getTime();
      if (cachedData && now - JSON.parse(cachedData).timestamp < 24 * 60 * 60 * 1000) {
          setResponse(JSON.parse(cachedData).data);
          setLoading(false);
          return;
      }

      try {
          const result = await axios.request(params);
          setResponse(result.data);
          localStorage.setItem(params.url, JSON.stringify({ data: result.data, timestamp: now }));
      } catch (error) {
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchData(axiosParams);
  }, []); // execute once only

  return { response, error, loading };
};
