import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks available</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <img src={bookmark.image} alt={bookmark.name} />
              <p>{bookmark.name}</p>
              <button onClick={() => removeBookmark(bookmark.id)}>Remove Bookmark</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPage;
