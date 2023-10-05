import React from 'react';
import background from "../assets/map.png";
const BgImg = () => {
    
    return (
        <div style={{ backgroundImage: `url(${background})`, width: '5760px',height: '1080px'}} className='position-absolute z-n1'>
        </div>
    );
}

export default BgImg