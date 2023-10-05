import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { BgVid2 } from "../components";
import "react-indiana-drag-scroll/dist/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "keen-slider/keen-slider.min.css";
import HTMLRenderer from "../components/HTMLRenderer";
import "./style.css";
import { HOST } from "../const";

import dots from "../assets/dots.png";
import back from "../assets/back.png";
import next from "../assets/next.png";
import threeline from "../assets/threeline.png";
import longline from "../assets/longline.png";
import shortline from "../assets/shortline.png";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: undefined,
      id: "",
      firstImg: undefined,
      firstVid: undefined,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.setState({ id: id });
    axios
      .get(`http://${HOST}:8081/post/${id}`)
      .then((res) => {
        this.setState({
          post: res.data,
        });
        if (res.data.media.length != 0) {
          res.data.media.map((file) => {
            if (
              !this.state.firstImg &&
              (file.extension == "png" ||
                file.extension == "jpg" ||
                file.extension == "jpeg")
            ) {
              this.setState({ firstImg: file.link });
            } else if (!this.state.firstVid && file.extension == "mp4") {
              this.setState({ firstVid: file.link });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.response || err);
      });
  }
  render() {
    return (
      <>
        <BgVid2 />

        {this.state.post ? (
          <div
            className="page container position-absolute"
            style={{ background: "none" }}>
            <a href={"/"}>
              <img
                className="position-absolute z-1"
                src={back}
                style={{ marginTop: "40px", marginLeft: "3638px" }}
              />
            </a>
            <div
              className="position-absolute title z-1"
              style={{
                marginTop: "213px",
                marginLeft: "2042px",
              }}>
              <div style={{ width: "60px", position: "relative" }}>
                <h2 className="title">{this.state.post.name}</h2>
              </div>
              <div
                style={{
                  width: "60px",
                  position: "relative",
                  marginTop: `${
                    25 + this.state.post.englishName.length * 16
                  }px`,
                  marginLeft: "5px",
                }}>
                <h2 className="vertical">{this.state.post.englishName}</h2>
              </div>
            </div>
            <img
              className="position-absolute z-1"
              src={next}
              style={{ marginTop: "900px", marginLeft: "3638px" }}
            />
            <img
              className="position-absolute z-1"
              src={dots}
              style={{ marginTop: "140px", marginLeft: "3490px" }}
            />
            <img
              className="position-absolute z-1"
              src={threeline}
              style={{ marginTop: "169px", marginLeft: "2070px" }}
            />
            <img
              className="position-absolute z-1"
              src={longline}
              style={{ marginTop: "168px", marginLeft: "2102px" }}
            />
            <img
              className="position-absolute z-1"
              src={shortline}
              style={{ marginTop: "815px", marginLeft: "2029px" }}
            />
            <h2
              className="vertical2 position-absolute z-1"
              style={{
                marginTop: "940px",
                marginLeft: "2018px",
                fontFamily: "AFBB",
              }}>
              {this.state.post.year}
            </h2>
            <div
              className="row page"
              style={{
                maxWidth: 5760,
                minWidth: 5760,
                height: "1080px",
                left: "0px",
              }}>
              <div className="col page">
                <div
                  className="wrapper"
                  style={{ marginLeft: "280px", width: "1438px" }}>
                  {this.state.post.description.split("//").length >= 3 ? (
                    <HTMLRenderer
                      htmlString={this.state.post.description.split("//")[0]}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col page ">
                <div
                  className="wrapper"
                  style={{ marginLeft: "228px", width: "1438px" }}>
                  <div className="box">
                    {this.state.firstImg ? (
                      <img
                        src={this.state.firstImg}
                        style={{
                          float: "left",
                          marginRight: "46px",
                          marginBottom: "10px",
                          height: "372px",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                    <div className="float">
                      {this.state.firstVid ? (
                        <ReactPlayer
                          url={this.state.firstVid}
                          playing={true}
                          loop={true}
                          height={"309px"}
                          width={"100%"}
                          style={{ height: "309px" }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    {this.state.post.description.split("//").length >= 3 ? (
                      <HTMLRenderer
                        htmlString={this.state.post.description.split("//")[1]}
                      />
                    ) : this.state.post.description.split("//").length == 2 ? (
                      <HTMLRenderer
                        htmlString={this.state.post.description.split("//")[0]}
                      />
                    ) : (
                      <HTMLRenderer htmlString={this.state.post.description} />
                    )}
                  </div>
                </div>
              </div>
              <div className="col page">
                <div
                  className="wrapper"
                  style={{ marginLeft: "131px", width: "1642px" }}>
                  {this.state.post.description.split("//").length >= 3 ? (
                    <HTMLRenderer
                      htmlString={this.state.post.description.split("//")[2]}
                    />
                  ) : this.state.post.description.split("//").length == 2 ? (
                    <HTMLRenderer
                      htmlString={this.state.post.description.split("//")[1]}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default withParams(Post);
