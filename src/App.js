import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import SearchBooksPage from './component/SearchBooksPage';
import ListBooks from './component/ListBooks';
function BooksApp() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={ <ListBooks /> } />
                <Route path="/ListBooks" element={ <ListBooks /> } />
                <Route path="/Search" element={ <SearchBooksPage /> } />
            </Routes>
        </div>
    );
}

export default BooksApp;
