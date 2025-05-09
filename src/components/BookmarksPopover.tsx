import { forwardRef } from 'react';
import { useBookmarksContext } from '../lib/hooks';
import JobList from './JobList';
import { createPortal } from 'react-dom';

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  const areBookmarkedItems = bookmarkedJobItems.length > 0 || isLoading;
  return createPortal(
    <div ref={ref} className='bookmarks-popover'>
      {areBookmarkedItems ? (
        <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      ) : (
        <EmptyPopover />
      )}
    </div>,
    document.body
  );
});

export default BookmarksPopover;

function EmptyPopover() {
  return (
    <section className='bookmarks-popover--empty'>
      <p>You did not bookmarked any jobs.</p>
    </section>
  );
}
