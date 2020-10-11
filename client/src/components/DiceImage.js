import one from '../images/d1.png'
import two from '../images/d2.png'
import three from '../images/d3.png'
import four from '../images/d4.png'
import five from '../images/d5.png'
import six from '../images/d6.png'
import React from "react";
import '../App.css'

export default ({ roll }) => {
  // const alt = roll.toString();
  if (roll === 1) {
    return <img className="dice-image" src={one} alt="1" />;
  } else if (roll === 2) {
    return <img className="dice-image" src={two} alt="2" />;
  } else if (roll === 3) {
    return <img className="dice-image" src={three} alt="3" />;
  } else if (roll === 4) {
    return <img className="dice-image" src={four} alt="4" />;
  } else if (roll === 5) {
    return <img className="dice-image" src={five} alt="5" />;
  } else if (roll === 6) {
    return <img className="dice-image" src={six} alt="6" />;
  }
};