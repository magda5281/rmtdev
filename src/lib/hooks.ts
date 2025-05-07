import { useEffect, useState } from 'react';
import { JobItem } from './types';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!searchText.trim()) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}?search=${searchText}`);
        const data = await response.json();
        setJobItems(data?.jobItems ?? []);
      } catch (err) {
        setJobItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchText, API_BASE_URL]);

  return {
    jobItems,
    isLoading,
  };
}
