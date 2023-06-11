import React from 'react';
const Nav = () => {
    
    return (
        <div className = 'keen-slider__slide' id="nav">
          {['section1','section2','section3','section4'].map(ID => (
      <span key={ID}>
        <a href={'/home#'+ID}><button >
          {ID}
        </button></a>
      </span>
    ))}
        </div>
    );
}

export default Nav