import { createContext, useState } from 'react';

type BookmarksContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark(id: number): void;
};

export const BookmarksContext = createContext<BookmarksContextType>({
  bookmarkedIds: [],
  handleToggleBookmark: () => {},
});
export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };
  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
