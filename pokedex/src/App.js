import React from 'react';
import SearchPage from './SearchPage/SearchPage';
import ListingPage from './ListingPage/ListingPage';
import ListingPageGen1 from './ListingPage/ListingPageGen1';
import ListingPageGen2 from './ListingPage/ListingPageGen2';
import ListingPageGen3 from './ListingPage/ListingPageGen3';
import ListingPageGen4 from './ListingPage/ListingPageGen4';
import ListingPageGen5 from './ListingPage/ListingPageGen5';
import ListingPageGen6 from './ListingPage/ListingPageGen6';
import ListingPageGen7 from './ListingPage/ListingPageGen7';
import ListingPageGen8 from './ListingPage/ListingPageGen8';
import ListingPageGen9 from './ListingPage/ListingPageGen9';
import DetailsPage from './DetailsPage/DetailsPage';
import BookmarksPage from './BookmarksPage/BookmarksPage';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

const App = () => {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<SearchPage />} />
        <Route path='/PokemonList' element={<ListingPage />} />
        <Route path='/ListGen1' element={<ListingPageGen1 />} />
        <Route path='/ListGen2' element={<ListingPageGen2 />} />
        <Route path='/ListGen3' element={<ListingPageGen3 />} />
        <Route path='/ListGen4' element={<ListingPageGen4 />} />
        <Route path='/ListGen5' element={<ListingPageGen5 />} />
        <Route path='/ListGen6' element={<ListingPageGen6 />} />
        <Route path='/ListGen7' element={<ListingPageGen7 />} />
        <Route path='/ListGen8' element={<ListingPageGen8 />} />
        <Route path='/ListGen9' element={<ListingPageGen9 />} />
        <Route path='/Details/:id' element={<DetailsPage />} />
        <Route path='/Bookmarks' element={<BookmarksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
