import React, { useState,Component }  from 'react';
import { Nav } from '../components'
import 'react-indiana-drag-scroll/dist/style.css';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import './style.css'

const displaydata = [{title:'a',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'b',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'c',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'d',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'e',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'f',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'g',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'},
{title:'h',url:'https://i.ibb.co/YXf9nF7/ezgif-com-video-to-gif-1.gif'}] //main content from DB

const Home = () => {
  const Nav = () => {
    
    return (
        <div id="nav">
          {displaydata.map(ID => (
      <span key={displaydata.indexOf(ID)+1}>
        <button
                onClick={() => {
                  instanceRef.current?.moveToIdx(Math.min(displaydata.indexOf(ID)+1,displaydata.length-2))
                }}
              >{ID.title}</button>
      </span>
    ))}
        </div>
    );
}
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 15,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const handleClickScroll = () => {
    const element = document.getElementById('n');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' })
    }
  };

  return (
    <div ref={sliderRef} className="keen-slider app">
      <div className='keen-slider__slide'>
        <Nav/>
      </div>
      {displaydata.map(ID => (
      <div className='keen-slider__slide'><h1>{ID.title}</h1><img src={ID.url}/></div>
    ))}
    </div>
  )
}

export default Home;