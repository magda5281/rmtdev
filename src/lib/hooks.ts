import { useEffect, useState } from 'react';
import { JobItem } from './types';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const jobItemsSliced = jobItems.slice(0, 7);
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

  return [jobItemsSliced, isLoading] as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  return activeId;
}
