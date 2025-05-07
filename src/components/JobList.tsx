import { JobItem } from '../types';
import JobListItem from './JobListItem';

type JobListProps = {
  jobItems: JobItem[];
};
export function JobList({ jobItems }: JobListProps) {
  return (
    <ul className='job-list'>
      {jobItems.map((jobItem) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
