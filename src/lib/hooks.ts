import { useEffect, useState } from 'react';
import { JobItem, JobItemExpanded } from './types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const data = await response.json();
        setIsLoading(false);
        setJobItem(data?.jobItem ?? null);
      } catch (err) {
        setJobItem(null);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);
  return [jobItem, isLoading] as const;
}
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
}
