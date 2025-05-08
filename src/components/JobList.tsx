import { useActiveId } from '../lib/hooks';
import { JobItem } from '../lib/types';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProps) {
  const isActive = useActiveId();

  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => {
          return (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isActive={jobItem.id === isActive}
            />
          );
        })}
    </ul>
  );
}

export default JobList;
