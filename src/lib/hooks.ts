import { SetStateAction, useContext, useEffect, useState } from 'react';
import { JobItem, JobItemExpanded } from './types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useQueries, useQuery } from '@tanstack/react-query';
import { handleError } from './utils';
import { BookmarksContext } from '../components/context/BookmarksContextProvider';
import { ActiveIdContext } from '../components/context/ActiveIdContextProvider';
import { SearchTextContext } from '../components/context/SearchTextContextProvider';
import { JobItemsContext } from '../components/context/JobItemsContextProvider';

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
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

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
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
//-------------------------------------------------------------------------------

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => (id ? fetchJobItem(id) : null),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      //in react-query 5 unknown type is replaced with Error type
      onError: handleError,
    })),
  });
  const raw = results.map((result) => result.data?.jobItem);

  const jobItems: JobItemExpanded[] = raw.filter(
    (jobItem): jobItem is JobItemExpanded => jobItem !== undefined
  );

  const isLoading = results.some((result) => result.isLoading);
  return { jobItems, isLoading };
}

//-----------------------------------------------------------------------------

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
export function useSearchQuery(searchText: string) {
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

  return {
    jobItems: data?.jobItems ?? [],
    isLoading: isInitialLoading,
  } as const;
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
  return [value, setValue];
}

//--------------------------------------------------------------------------------
export function useOnOutsideClick(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, handler]);
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

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw Error(
      'useContext(ActiveIdContext) must be used within a ActiveIdContextProvider'
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw Error(
      'useContext(SearchTextContext) must be used within a SearchTextContextContextProvider'
    );
  }
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw Error(
      'useContext(JobItemsContext) must be used within a JobItemsContextContextProvider'
    );
  }
  return context;
}
