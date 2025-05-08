import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: 'next' | 'previous') => void;
};
export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className='pagination'>
      <PaginationButton
        direction='previous'
        currentPage={currentPage}
        onClick={() => onClick('previous')}
      />
      <PaginationButton
        direction='next'
        currentPage={currentPage}
        onClick={() => onClick('next')}
      />
    </section>
  );
}

type PaginationButtonProps = {
  direction: 'next' | 'previous';
  currentPage: number;
  onClick: () => void;
};
function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  const previous = direction === 'previous';

  return (
    <button className='pagination__button' onClick={onClick}>
      {previous ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      Page {previous ? currentPage - 1 : currentPage + 1}
    </button>
  );
}
