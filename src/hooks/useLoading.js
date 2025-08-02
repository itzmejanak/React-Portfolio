import { useState, useEffect } from 'react';

export const useLoading = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await asyncFunction();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

export const useDelayedLoading = (asyncFunction, minDelay = 300, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const startTime = Date.now();
        const result = await asyncFunction();
        const elapsed = Date.now() - startTime;
        
        // Ensure minimum loading time for better UX
        const remainingDelay = Math.max(0, minDelay - elapsed);
        
        setTimeout(() => {
          if (isMounted) {
            setData(result);
            setLoading(false);
          }
        }, remainingDelay);
        
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
          setData(null);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};