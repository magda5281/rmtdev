import { createContext, useMemo } from 'react';
import { useActiveId } from '../../lib/hooks';

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);
export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();
  const value = useMemo(() => ({ activeId }), [activeId]);
  return (
    <ActiveIdContext.Provider value={value}>
      {children}
    </ActiveIdContext.Provider>
  );
}
