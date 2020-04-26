import React from 'react';
import {Link} from 'react-router-dom';

import './header.sass';


const Header = () => {
    return (
        <div className='header-block'>
            <h4 className="header-label">
                <Link to='/'>
                Game of Thrones
                </Link>
            </h4>
            <div className='header-link'>
                <li>
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books/'>Books</Link>  
                </li>
            </div>
        </div>
    );
};

export default Header;