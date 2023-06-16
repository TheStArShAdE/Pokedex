import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './BookmarksPage.css';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const bookmarkedPokemon = JSON.parse(localStorage.getItem('bookmarkedPokemon')) || [];
    setBookmarks(bookmarkedPokemon);
  }, []);

  const removeBookmark = (pokemonId) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== pokemonId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
  };

  return (
    <div id='favourite'>
      <h1>Favourites</h1>
      {bookmarks.length === 0 ? (
        <p>No Favourites Available</p>
      ) : (
        <ul id='favourite-body'>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} id='favourite-card'>
              <div id='favourite-id'>
                <p id='favourite-idp'>{bookmark.id < 10 ? '#00' + bookmark.id : bookmark.id < 100 ? '#0' + bookmark.id : '#' + bookmark.id}</p>
              </div>
              <div id='favourite-nameImg'>
                <img src={bookmark.image} alt={bookmark.name} id='favourite-img' />
                <p id='favourite-name'>{bookmark.name}</p>
              </div>
              <div>
                <button id='favourite-button' onClick={() => removeBookmark(bookmark.id)}><FontAwesomeIcon icon={faXmark} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPage;
