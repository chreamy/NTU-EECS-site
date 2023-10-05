import React, { useState, Component } from "react";
import { BgImg, BgVid } from "../components";
import "react-indiana-drag-scroll/dist/style.css";
import { useKeenSlider } from "keen-slider/react";
import timeline from "../assets/time_line.png";
import axios from "axios";
import timeline1 from "../assets/time_line1.png";
import timeline2 from "../assets/time_line2.png";
import timeline3 from "../assets/time_line3.png";
import title from "../assets/title.png";
import "keen-slider/keen-slider.min.css";
import "./style.css";
import { HOST } from "../const";
const displaydata = [
  {
    key: "2006",
    url: "/src/assets/06.png",
    position: { x: 64, y: 685 },
    line: "up",
    names: [],
  },
  {
    key: "2007",
    url: "/src/assets/07.png",
    position: { x: 447, y: 167 },
    line: "down",
    names: [],
  },
  {
    key: "2008",
    url: "/src/assets/08.png",
    position: { x: 829, y: 614 },
    line: "up",
    names: [],
  },
  {
    key: "2009",
    url: "/src/assets/09.png",
    position: { x: 1213, y: 393 },
    line: "down",
    names: [],
  },
  {
    key: "2010",
    url: "/src/assets/10.png",
    position: { x: 1602, y: 722 },
    line: "up",
    names: [],
  },
  {
    key: "2011",
    url: "/src/assets/11.png",
    position: { x: 1982, y: 265 },
    line: "down",
    names: [],
  },
  {
    key: "2012",
    url: "/src/assets/12.png",
    position: { x: 2366, y: 629 },
    line: "up",
    names: [],
  },
  {
    key: "2013",
    url: "/src/assets/13.png",
    position: { x: 2751, y: 404 },
    line: "down",
    names: [],
  },
  {
    key: "2014",
    url: "/src/assets/14.png",
    position: { x: 3135, y: 787 },
    line: "up",
    names: [],
  },
  {
    key: "2015",
    url: "/src/assets/15.png",
    position: { x: 3517, y: 265 },
    line: "down",
    names: [],
  },
  {
    key: "2016",
    url: "/src/assets/16.png",
    position: { x: 3903, y: 603 },
    line: "up",
    names: [],
  },
  {
    key: "2017",
    url: "/src/assets/17.png",
    position: { x: 4286, y: 334 },
    line: "down",
    names: [],
  },
  {
    key: "2018",
    url: "/src/assets/18.png",
    position: { x: 4671, y: 737 },
    line: "up",
    names: [],
  },
  {
    key: "2019",
    url: "/src/assets/19.png",
    position: { x: 5055, y: 227 },
    line: "down",
    names: [],
  },
  {
    key: "2020",
    url: "/src/assets/20.png",
    position: { x: 5440, y: 665 },
    line: "up",
    names: [],
  },
];

const Display = (props) => {
  const { data } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      origin: "center",
      perView: "auto",
      spacing: 0,
    },
    initial: 1,
    range: { min: 3, max: 5 },
  });

  return (
    <>
      <BgVid />
      <div
        className="z-1 position-absolute"
        style={{ marginLeft: "2560px", marginTop: "33px", background: "none" }}>
        <img src={title} />
      </div>
      <div
        ref={sliderRef}
        className="keen-slider app"
        style={{
          maxWidth: 5760,
          minWidth: 5760,
          height: "1080px",
          background: "none",
        }}>
        {/*<div className='keen-slider__slide' style={{ maxWidth: 150, minWidth: 150 }}>
        <Nav/>
  </div>*/}
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          <img
            src={timeline1}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          <img
            src={timeline2}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1916, minWidth: 1916 }}>
          <img
            src={timeline3}
            style={{ width: "1916px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          {data.map((item) => (
            <>
              <div
                key={item.key}
                className="z-1 position-fixed"
                style={{
                  marginLeft: `${item.position.x}px`,
                  marginTop: `${item.position.y}px`,
                }}>
                <img src={item.url} />
              </div>
              <div
                key={`${item.key}-line`}
                className="z-1 position-fixed"
                style={
                  item.line == "up"
                    ? {
                        marginLeft: `${item.position.x + 53}px`,
                        marginTop: `${
                          item.position.y -
                          (item.names.length <= 2
                            ? 288
                            : item.names.length >= 4
                            ? 432
                            : 380)
                        }px`,
                      }
                    : {
                        marginLeft: `${item.position.x + 56}px`,
                        marginTop: `${item.position.y + 267}px`,
                      }
                }>
                <img
                  src={`/src/assets/line${
                    item.names.length <= 1
                      ? 2
                      : item.names.length > 4
                      ? 4
                      : item.names.length
                  }.png`}
                />
                <img
                  className="z-2 position-fixed"
                  src="/src/assets/dot.png"
                  style={
                    item.line == "down"
                      ? { marginLeft: "-4px" }
                      : {
                          marginLeft: "-4px",
                          marginTop: `${
                            item.names.length <= 2
                              ? 288
                              : item.names.length >= 4
                              ? 432
                              : 380
                          }px`,
                        }
                  }
                />
                <div
                  className="position-fixed align-bottom"
                  style={
                    item.line == "up"
                      ? {
                          top: `${
                            item.position.y +
                            5 -
                            (item.names.length <= 2
                              ? 288
                              : item.names.length >= 4
                              ? 432
                              : 380)
                          }px`,
                          marginLeft: "24px",
                        }
                      : {
                          top: `${
                            item.position.y +
                            (item.names.length <= 2
                              ? 412
                              : item.names.length >= 4
                              ? 409
                              : 432)
                          }px`,
                          marginLeft: "24px",
                        }
                  }>
                  {item.names.map((name) => {
                    return (
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/post/${name.id}`}>
                        <h2
                          style={{
                            color: "#f6c381",
                            fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                            fontSize: "30px",
                          }}>
                          {name.name}
                        </h2>
                        <h2
                          style={{
                            color: "#f6c381",
                            fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                            fontSize: "18px",
                          }}>
                          {name.englishName}
                        </h2>
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          ))}
          <img
            src={timeline1}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          {displaydata.map((item) => {
            let x = item.position.x - 1920;
            return (
              <>
                <div
                  key={item.key}
                  className="z-1 position-fixed"
                  style={{
                    marginLeft: `${x}px`,
                    marginTop: `${item.position.y}px`,
                  }}>
                  <img src={item.url} />
                </div>
                <div
                  key={`${item.key}-line`}
                  className="z-1 position-fixed"
                  style={
                    item.line == "up"
                      ? {
                          marginLeft: `${x + 53}px`,
                          marginTop: `${
                            item.position.y -
                            (item.names.length <= 2
                              ? 288
                              : item.names.length >= 4
                              ? 432
                              : 380)
                          }px`,
                        }
                      : {
                          marginLeft: `${x + 56}px`,
                          marginTop: `${item.position.y + 267}px`,
                        }
                  }>
                  <img
                    src={`/src/assets/line${
                      item.names.length <= 2
                        ? 2
                        : item.names.length > 4
                        ? 4
                        : item.names.length
                    }.png`}
                  />
                  <img
                    className="z-2 position-fixed"
                    src="/src/assets/dot.png"
                    style={
                      item.line == "down"
                        ? { marginLeft: "-4px" }
                        : {
                            marginLeft: "-4px",
                            marginTop: `${
                              item.names.length <= 2
                                ? 288
                                : item.names.length >= 4
                                ? 432
                                : 380
                            }px`,
                          }
                    }
                  />
                  <div
                    className="position-fixed align-bottom"
                    style={
                      item.line == "up"
                        ? {
                            top: `${
                              item.position.y +
                              5 -
                              (item.names.length <= 2
                                ? 288
                                : item.names.length >= 4
                                ? 432
                                : 380)
                            }px`,
                            marginLeft: "24px",
                          }
                        : {
                            top: `${
                              item.position.y +
                              (item.names.length <= 2
                                ? 412
                                : item.names.length >= 4
                                ? 409
                                : 432)
                            }px`,
                            marginLeft: "24px",
                          }
                    }>
                    {item.names.map((name) => {
                      return (
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/post/${name.id}`}>
                          <h2
                            style={{
                              color: "#f6c381",
                              fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                              fontSize: "30px",
                            }}>
                            {name.name}
                          </h2>
                          <h2
                            style={{
                              color: "#f6c381",
                              fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                              fontSize: "18px",
                            }}>
                            {name.englishName}
                          </h2>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
          <img
            src={timeline2}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>

        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1916, minWidth: 1916 }}>
          {displaydata.map((item) => {
            let x = item.position.x - 3840;
            return (
              <>
                <div
                  key={item.key}
                  className="z-1 position-fixed"
                  style={{
                    marginLeft: `${x}px`,
                    marginTop: `${item.position.y}px`,
                  }}>
                  <img src={item.url} />
                </div>
                <div
                  key={`${item.key}-line`}
                  className="z-1 position-fixed"
                  style={
                    item.line == "up"
                      ? {
                          marginLeft: `${x + 53}px`,
                          marginTop: `${
                            item.position.y -
                            (item.names.length <= 2
                              ? 288
                              : item.names.length >= 4
                              ? 432
                              : 380)
                          }px`,
                        }
                      : {
                          marginLeft: `${x + 56}px`,
                          marginTop: `${item.position.y + 267}px`,
                        }
                  }>
                  <img
                    src={`/src/assets/line${
                      item.names.length <= 1
                        ? 2
                        : item.names.length > 4
                        ? 4
                        : item.names.length
                    }.png`}
                  />
                  <img
                    className="z-2 position-fixed"
                    src="/src/assets/dot.png"
                    style={
                      item.line == "down"
                        ? { marginLeft: "-4px" }
                        : {
                            marginLeft: "-4px",
                            marginTop: `${
                              item.names.length <= 2
                                ? 288
                                : item.names.length >= 4
                                ? 432
                                : 380
                            }px`,
                          }
                    }
                  />
                  <div
                    className="position-fixed align-bottom"
                    style={
                      item.line == "up"
                        ? {
                            top: `${
                              item.position.y +
                              5 -
                              (item.names.length <= 2
                                ? 288
                                : item.names.length >= 4
                                ? 432
                                : 380)
                            }px`,
                            marginLeft: "24px",
                          }
                        : {
                            top: `${
                              item.position.y +
                              (item.names.length <= 2
                                ? 412
                                : item.names.length >= 4
                                ? 409
                                : 432)
                            }px`,
                            marginLeft: "24px",
                          }
                    }>
                    {item.names.map((name) => {
                      return (
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/post/${name.id}`}>
                          <h2
                            style={{
                              color: "#f6c381",
                              fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                              fontSize: "30px",
                            }}>
                            {name.name}
                          </h2>
                          <h2
                            style={{
                              color: "#f6c381",
                              fontFamily: "NotoSansCJKtc-Regular, sans-serif",
                              fontSize: "18px",
                            }}>
                            {name.englishName}
                          </h2>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
          <img
            src={timeline3}
            style={{ width: "1916px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          <img
            src={timeline1}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1920, minWidth: 1920 }}>
          <img
            src={timeline2}
            style={{ width: "1920px", height: "386px", marginTop: "441px" }}
          />
        </div>
        <div
          className="keen-slider__slide"
          style={{ maxWidth: 1916, minWidth: 1916 }}>
          <img
            src={timeline3}
            style={{ width: "1916px", height: "386px", marginTop: "441px" }}
          />
        </div>
      </div>
    </>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", displaydata: [] };
  }
  componentDidMount() {
    axios
      .get(`http://${HOST}:8081/post`)
      .then((res) => {
        this.setState({
          posts: res.data,
        });
        let newDisplay = displaydata;
        newDisplay.map((year) => {
          let posts = this.state.posts.filter((post) => post.year == year.key);
          if (posts.length != 0) {
            posts.map((post) => {
              year.names.push({
                name: post.name,
                englishName: post.englishName,
                id: post._id,
              });
            });
          }
          this.setState({ displaydata: [...newDisplay] });
        });
      })
      .catch((err) => {
        console.log(err.response || err);
      });
  }
  render() {
    return (
      <>
        {this.state.posts ? <Display data={this.state.displaydata} /> : <></>}
      </>
    );
  }
}

export default Home;
