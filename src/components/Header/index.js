import question from './assets/question.png';
import React from 'react';
import './style.css';

export const Header = () => {
  return (
    <header>
        <p>Sea-Bird Scientific</p>
        <a href='https://github.com/agtTwilight/Sea-Bird-Challenge#readme' target='_blank' rel='noreferrer'><img id='help' src={question} alt='a question mark for tutorial info'></img></a>
    </header>
  )
}

export default Header;
