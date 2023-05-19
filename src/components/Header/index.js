import question from './assets/question.png';
import React from 'react';
import './style.css';

export const Header = () => {
  return (
    <header>
        <p>Sea-Bird Scientific</p>
        <img id='help' src={question} alt='a question mark for tutorial info'></img>
    </header>
  )
}

export default Header;
