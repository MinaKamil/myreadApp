// @flow strict
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from './../BooksAPI';
import Books from './Books';


function SearchBooksPage(props) {
  const [myBooks, setMyBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    BooksAPI.getAll()
      .then(books => {
        setMyBooks(books);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  });

  const moveBook = (book, shelf) => {

    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      setError(true);
    });


    if (shelf === 'none') {
      setMyBooks(myBooks.filter(b => b.id !== book.id));
    } else {
      book.shelf = shelf;
      setMyBooks(myBooks.filter(b => b.id !== book.id).concat(book));
    }
    console.log(book, shelf);
    return false;
  };

  const search = (val) => {
    if (val.length > 0) {
      BooksAPI.search(val).then(books => {
        if (books.error) {
          setSearchBooks([]);
        } else {
          setSearchBooks(books);
        }
      });
    } else {
      setSearchBooks([]);
    }
  };
  const handleChange = event => {
    const val = event.target.value;
    search(val);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>

        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={ handleChange } />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { searchBooks && searchBooks.map((book, key) => (
            <Books { ...{ book, moveBook, key } } />
          )) }
        </ol>

      </div>
    </div>
  );
};

export default SearchBooksPage;