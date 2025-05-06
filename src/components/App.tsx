import { useEffect, useState } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItems, setJobItems] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}?search=${searchText}`);
      const data = await response.json();
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText, API_BASE_URL]);
  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
