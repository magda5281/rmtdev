import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { PaginationDirection } from '../lib/types';

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: 'next' | 'previous') => void;
  totalNumberOfPages: number;
};
export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className='pagination'>
      {totalNumberOfPages > 0 && (
        <>
          <PaginationButton
            direction='previous'
            onClick={() => onClick('previous')}
            disabled={currentPage === 1 || totalNumberOfPages === 0}
          />

          <span>{currentPage}</span>

          <PaginationButton
            direction='next'
            onClick={() => onClick('next')}
            disabled={
              totalNumberOfPages === currentPage || totalNumberOfPages === 0
            }
          />
        </>
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PaginationDirection;
  onClick: () => void;
  disabled: boolean;
};
function PaginationButton({
  direction,
  onClick,
  disabled,
}: PaginationButtonProps) {
  const previous = direction === 'previous';

  return (
    <button
      className={`pagination__button `}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      disabled={disabled}
    >
      {previous ? (
        <>
          <ArrowLeftIcon /> <span>{direction}</span>
        </>
      ) : (
        <>
          <span>{direction}</span> <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
