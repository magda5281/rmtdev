import { createContext, useMemo, useState } from 'react';
import { RESULTS_PER_PAGE } from '../../lib/constants';
import { useSearchQuery, useSearchTextContext } from '../../lib/hooks';
import { SortBy, PaginationDirection, JobItem } from '../../lib/types';

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  jobItemsSliced: JobItem[];
  sortBy: SortBy;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  handleChangePage: (direction: PaginationDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);
export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //dependency derived from other context
  const { debouncedSearchText } = useSearchTextContext();
  //state

  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevant');

  //derived/computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])]?.sort((a, b) => {
      if (sortBy === 'relevant') {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  //event handlers/actions

  const handleChangePage = (direction: PaginationDirection) => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };
  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        isLoading,
        jobItemsSliced,
        sortBy,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
