import { useEffect, useState } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';
import { JobItem } from '../types';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log('searchText', searchText);
  console.log('isLoading', isLoading);
  useEffect(() => {
    if (!searchText.trim()) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}?search=${searchText}`);
        const data = await response.json();
        setJobItems(data?.jobItems ?? []);
      } catch (err) {
        setJobItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchText, API_BASE_URL]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
