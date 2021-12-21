import * as React from 'react';
import ShelfSelect from './ShelfSelect';
function Books(props) {
  const { book, key, moveBook, shelf } = props;
  return (
    <li key={ key }>
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={ {
              width: 128, height: 193, backgroundImage: `url(${book.imageLinks
                ? book.imageLinks.thumbnail
                : 'icons/book-placeholder.svg'
                })`
            } }></div>
          <div className="book-shelf-changer">
            <ShelfSelect book={ book } shelf={ shelf } onMove={ moveBook } />
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.authors ? book.authors.join(', ') : 'Unknown Author' }</div>
      </div>
    </li>
  );
};

export default Books;