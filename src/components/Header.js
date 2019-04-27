import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ children }) => {
    return (
        <header id='header'>
            <h1>Raffle Give-away!</h1>
            {children}
        </header>
    );
};

Header.propTypes = {
    children : PropTypes.node,
};

export default Header;