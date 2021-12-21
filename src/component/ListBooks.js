import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from './../BooksAPI';
import Books from './Books';

function ListBooks() {
  const [myBooks, setMyBooks] = useState([]);
  const [error, setError] = useState(false);
  const bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
  ];
  useEffect(() => {
    BooksAPI.getAll()
      .then(books => {
        setMyBooks(books);
      })
      .catch(err => {
        setError(true);
      });
  });

  const moveBook = async (book, shelf) => {
    await BooksAPI.update(book, shelf).catch(err => {
      setError(true);
    });


    if (shelf === 'none') {
      setMyBooks(myBooks.filter(b => b.id !== book.id));
    } else {
      book.shelf = shelf;
      setMyBooks(myBooks.filter(b => b.id !== book.id).concat(book));
    }
    return false;
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          { bookshelves.map((shelf, key) => {
            const booksOnThisShelf = myBooks.filter(book => book.shelf === shelf.key);
            return (
              <div className="bookshelf" key={ key }>
                <h2 className="bookshelf-title">{ shelf.name }</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { booksOnThisShelf.map((book, key) => (
                      <Books { ...{ book, moveBook, key, shelf } } />
                    )) }
                  </ol>
                </div>
              </div>
            );
          }) }
        </div>
      </div>
      <div className="open-search">
        <Link to="Search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;