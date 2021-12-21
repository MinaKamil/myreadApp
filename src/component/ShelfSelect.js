import React, { useState } from 'react';
function ShelfSelect(props) {
    const [value, setValue] = useState(props.shelf ? props.shelf.key : 'move');
    const handleChange = event => {
        const { value } = event.target;
        setValue(value);
        props.onMove(props.book, value);
    };
    return (
        <select value={ value } onChange={ handleChange }>
            <option value="move" disabled>
                Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>

    );
}
export default ShelfSelect;