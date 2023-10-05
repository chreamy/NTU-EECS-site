import React from "react";
import map from '../assets/map.mp4'
import map2 from '../assets/map2.mp4'
const BgVid = () => {
    const url = map
    return(
        <div style={{width: '5760px',height: '1080px'}} className='position-absolute z-n1'>
            <video autoPlay='autoplay' loop='loop' muted>
                <source src={url} type='video/mp4'/>
            </video>
        </div>
    )
}
const BgVid2 = () => {
    const url = map2
    return(
        <div style={{width: '5760px',height: '1080px'}} className='position-absolute z-n1'>
            <video autoPlay='autoplay' loop='loop' muted>
                <source src={url} type='video/mp4'/>
            </video>
        </div>
    )
}
export{
    BgVid,
    BgVid2
}