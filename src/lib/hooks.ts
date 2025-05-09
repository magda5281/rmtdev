import { SetStateAction, useContext, useEffect, useState } from 'react';
import { JobItem, JobItemExpanded } from './types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useQuery } from '@tanstack/react-query';
import { handleError } from './utils';
import { BookmarksContext } from '../components/context/BookmarksContextProvider';

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};
const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${API_BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      //in react-query 5 unknown type is replaced with Error type
      onError: handleError,
    }
  );

  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}
// ----------------------------------------------------------------------
export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}
//-------------------------------------------------------------------------
export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
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

//--------------------------------------------------------------------------------

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
}

//--------------------------------------------------------------------------------

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw Error(
      'useContext(BookmarksContext) must be used within a BookmarksContextProvider'
    );
  }
  return context;
}

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     if (!id) return;

//     const fetchJob = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${API_BASE_URL}/${id}`);
//         const data = await response.json();
//         setIsLoading(false);
//         setJobItem(data?.jobItem ?? null);
//       } catch (err) {
//         setJobItem(null);
//         setIsLoading(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchJob();
//   }, [id]);
//   return { jobItem, isLoading } as const;
// }

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText.trim()) {
//       return;
//     }
//     const fetchData = async () => {
//       setIsLoading(true);

//       try {
//         const response = await fetch(`${API_BASE_URL}?search=${searchText}`);
//         const data = await response.json();
//         setJobItems(data?.jobItems ?? []);
//       } catch (err) {
//         setJobItems([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [searchText]);

//   return { jobItems, isLoading } as const;
// }
