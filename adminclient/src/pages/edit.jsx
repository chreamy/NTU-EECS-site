import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { getAuthToken, getAuthUser } from "../components/auth";
import { HOST } from "../const";
import ReactPlayer from "react-player";
import { Editor } from "@tinymce/tinymce-react";
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
const GlobalStyles = createGlobalStyle`
.error {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
h5{
  font-weight:1000;
}
@media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

class Edit extends Component {
  constructor() {
    super();
    this.onChangeMultiple = this.onChangeMultiple.bind(this);
    this.state = {
      files: [],
      tab: 1,
      title: "",
      subtitle: "",
      desc: "",
      name: "",
      tags: [],
      englishName: "",
      year: undefined,
      post: undefined,
      type: 0,
      nameError: "",
      titleError: "",
      englishNameError: "",
      yearError: "",
      descError: "",
      actionLock: false,
    };
  }
  async fetchData(id) {
    this.setState({
      id: id,
    });
    await axios
      .get(`http://${HOST}:8080/post/${id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((res) => {
        this.setState({
          post: res.data,
          desc: res.data[0].description,
        });

        this.setState({
          type: res.data[0].category.includes("outstanding")
            ? 1
            : res.data[0].category.includes("regular")
            ? 2
            : res.data[0].category.includes("research")
            ? 3
            : 4,
          tags: [
            ...res.data[0].category.filter(
              (item) =>
                !["research", "outstanding", "regular", "honor"].includes(item)
            ),
          ],
        });
      })
      .catch((err) => {
        console.log(err.response || err);
      });
  }
  componentDidMount() {
    const { id } = this.props.params;
    this.fetchData(id);
  }
  deleteFiles = () => {
    this.setState({ files: [] });
    document.getElementById("delete_btn").classList.add("hide");
    document.getElementById("delete_btn").classList.remove("show");
    const fileInput = document.getElementById("upload_file");
    if (fileInput) {
      fileInput.value = ""; // Reset the input value to an empty string
    }
  };
  deleteFile = (link) => {
    let filename = link.split("file/")[1];
    axios
      .delete(`http://${HOST}:8080/file/${filename}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((res) => {
        const filtered = this.state.post[0].media.filter(
          (item) => item.link !== link
        );
        console.log(filtered);
        let newpost = this.state.post;
        newpost[0].media = filtered;
        this.setState({ post: newpost });
        axios
          .post(
            `http://${HOST}:8080/post/update/${this.state.id}`,
            {
              user: getAuthUser(),
              name: this.state.name || this.state.post[0].name,
              englishName:
                this.state.englishName || this.state.post[0].englishName,
              year: this.state.year || this.state.post[0].year,
              title: this.state.title || this.state.post[0].title,
              subtitle: this.state.subtitle || this.state.post[0].subtitle,
              description: this.state.desc || this.state.post[0].description,
              media: [...this.state.post[0].media, ...res.data],
              category: [
                ...this.state.tags,
                this.state.type == 1
                  ? "outstanding"
                  : this.state.type == 2
                  ? "regular"
                  : this.state.type == 3
                  ? "research"
                  : "honor",
              ],
              layout: 0,
              updated: Date.now,
              status: 0,
              order: 0,
            },
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
          )
          .then(alert("image deleted"));
      });
  };

  async onChangeMultiple(e) {
    var files = e.target.files;
    var filesArr = await Array.prototype.slice.call(files);
    let i = 0;
    while (i < filesArr.length) {
      if (
        filesArr[i].type !== "image/jpeg" &&
        filesArr[i].type !== "image/png" &&
        filesArr[i].type !== "video/mp4"
      ) {
        alert("Type error: Only accepting PNG, JPG/JPEG, and MP4");
        await filesArr.splice(i, 1);
      } else {
        i += 1;
      }
    }
    await this.setState({ files: [...filesArr] });
    if (this.state.files.length != 0) {
      document.getElementById("delete_btn").classList.add("show");
      document.getElementById("delete_btn").classList.remove("hide");
    }
  }
  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
    if (!e.target.value.trim() && this.state.type == 3) {
      this.setState({ titleError: "Title cannot be blank" });
    } else {
      this.setState({ titleError: "" });
    }
  };
  onChangeSubtitle = (e) => {
    this.setState({ subtitle: e.target.value });
  };

  onChangeName = (e) => {
    const name = e.target.value;
    this.setState({ name: name });
    if (!name.trim()) {
      this.setState({ nameError: "Name cannot be blank" });
    } else if (/\d/.test(name)) {
      this.setState({ nameError: "Name cannot contain numbers" });
    } else {
      this.setState({ nameError: "" });
    }
  };
  onChangeEnglishName = (e) => {
    const englishName = e.target.value;
    this.setState({ englishName });
  };

  onChangeYear = (e) => {
    const year = e.target.value;
    const currentYear = new Date().getFullYear();
    this.setState({ year });
    const validYearRegex = /^\d{4}$/; // Only accepts a 4-digit number
    if (!validYearRegex.test(year) || year > currentYear) {
      this.setState({ yearError: "Please enter a valid 4-digit year" });
    } else {
      this.setState({ yearError: "" });
    }
  };

  onChangeDesc = (e) => {
    const desc = e.target.value;
    this.setState({ desc });
    console.log(this.state.desc);
  };
  onChangeTags = (e) => {
    const lower = e.target.value
      .replace(/\s/g, "")
      .split(",")
      .map((element) => {
        return element.toLowerCase();
      });
    this.setState({ tags: lower });
  };

  submit = () => {
    if (this.state.actionLock) {
      return;
    }
    this.setState({
      actionLock: true,
    });
    let error = false;

    if (error) {
      alert("There are errors in the form");
      this.setState({
        actionLock: false,
      });
      return;
    }
    if (this.state.files.length == 0) {
      axios
        .post(
          `http://${HOST}:8080/post/update/${this.state.id}`,
          {
            user: getAuthUser(),
            name: this.state.name || this.state.post[0].name,
            englishName:
              this.state.englishName || this.state.post[0].englishName,
            year: this.state.year || this.state.post[0].year,
            title: this.state.title || this.state.post[0].title,
            subtitle: this.state.subtitle || this.state.post[0].subtitle,
            description: this.state.desc || this.state.post[0].description,
            media: [...this.state.post[0].media],
            category: [
              ...this.state.tags,
              this.state.type == 1
                ? "outstanding"
                : this.state.type == 2
                ? "regular"
                : this.state.type == 3
                ? "research"
                : "honor",
            ],
            layout: 0,
            updated: Date.now,
            status: 0,
            order: 0,
          },
          { headers: { Authorization: `Bearer ${getAuthToken()}` } }
        )
        .then(async (res) => {
          axios.post(`http://${HOST}:8080/log/add`, {
            username: getAuthUser(),
            postid: this.state.id,
            postTitle: this.state.post[0].name,
            action: "Edit Post",
            comments: `User ${getAuthUser()} edited post titled ${
              this.state.post[0].name
            } with the post ID of ${this.state.id}`,
          });
          alert(res.data);
          window.location.replace(`/review/${this.state.id}`);
        });
      return;
    } else {
      let formData = new FormData();
      for (let i = 0; i < this.state.files.length; i += 1) {
        formData.append("files", this.state.files[i]);
      }
      axios
        .post(`http://${HOST}:8080/file/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          axios
            .post(
              `http://${HOST}:8080/post/update/${this.state.id}`,
              {
                user: getAuthUser(),
                name: this.state.name || this.state.post[0].name,
                englishName:
                  this.state.englishName || this.state.post[0].englishName,
                year: this.state.year || this.state.post[0].year,
                title: this.state.title || this.state.post[0].title,
                subtitle: this.state.subtitle || this.state.post[0].subtitle,
                description: this.state.desc,
                media: [...this.state.post[0].media, ...res.data],
                category: [
                  ...this.state.tags,
                  this.state.type == 1
                    ? "outstanding"
                    : this.state.type == 2
                    ? "regular"
                    : this.state.type == 3
                    ? "research"
                    : "honor",
                ],
                layout: 0,
                updated: Date.now,
                status: 0,
                order: 0,
              },
              { headers: { Authorization: `Bearer ${getAuthToken()}` } }
            )
            .then(async (res) => {
              alert(res.data);
              axios
                .post(`http://${HOST}:8080/log/add`, {
                  username: getAuthUser(),
                  postid: this.state.id,
                  postTitle: this.state.post[0].name,
                  action: "Edit Post",
                  comments: `User ${getAuthUser()} edited post titled ${
                    this.state.post[0].name
                  } with the post ID of ${this.state.id}`,
                })
                .then(async (res) => {
                  window.location.replace(`/review/${this.state.id}`);
                  return;
                });
            });
        });
    }
  };
  state = {
    isActive: false,
  };
  unlockClick = () => {
    this.setState({
      isActive: true,
    });
  };
  unlockHide = () => {
    this.setState({ isActive: false });
  };
  onCheck = (e) => {
    let newType;
    if (e.target.checked) {
      switch (e.target.id) {
        case "outstanding":
          newType = 1;
          break;
        case "regular":
          newType = 2;
          break;
        case "research":
          newType = 3;
          break;
        case "honor":
          newType = 4;
          break;
      }
    }
    this.setState({ type: newType });
  };
  handleEditorChange = (content, editor) => {
    this.setState({ desc: content || " " });
  };
  render() {
    return (
      <>
        {this.state.post ? (
          <div>
            <GlobalStyles />
            <div className="container">
              <div className="row">
                <div className="col mb-5">
                  <form className="form-border">
                    <div className="field-set">
                      <div>
                        <input
                          id="outstanding"
                          onChange={this.onCheck}
                          checked={this.state.type == 1}
                          type="checkbox"
                        />
                        <label>&nbsp;&nbsp;傑出校友&nbsp;&nbsp;</label>
                        <input
                          id="regular"
                          onChange={this.onCheck}
                          checked={this.state.type == 2}
                          type="checkbox"
                        />
                        <label>&nbsp;&nbsp;一般校友&nbsp;&nbsp;</label>
                        <input
                          id="research"
                          onChange={this.onCheck}
                          checked={this.state.type == 3}
                          type="checkbox"
                        />
                        <label>&nbsp;&nbsp;研究成果&nbsp;&nbsp;</label>
                        <input
                          id="honor"
                          onChange={this.onCheck}
                          checked={this.state.type == 4}
                          type="checkbox"
                        />
                        <label>&nbsp;&nbsp;名譽博士&nbsp;&nbsp;</label>
                      </div>
                      <div className="spacer-single"></div>
                      <h5>校友名字</h5>
                      <input
                        type="text"
                        defaultValue={this.state.post[0].name}
                        name="item_title"
                        id="item_title"
                        className={`form-control ${
                          this.state.nameError && "error"
                        }`}
                        placeholder=""
                        onChange={this.onChangeName}
                      />
                      {this.state.nameError && (
                        <p className="error-message">{this.state.nameError}</p>
                      )}
                      <h5>校友英文名</h5>
                      <input
                        type="text"
                        defaultValue={this.state.post[0].englishName}
                        name="item_title"
                        id="item_title"
                        className="form-control"
                        placeholder=""
                        onChange={this.onChangeEnglishName}
                      />
                      <h5>標題</h5>
                      <input
                        type="text"
                        defaultValue={this.state.post[0].title}
                        name="item_title"
                        id="item_title"
                        className={`form-control ${
                          this.state.titleError && "error"
                        }`}
                        placeholder=""
                        onChange={this.onChangeTitle}
                      />
                      {this.state.titleError && (
                        <p className="error-message">{this.state.titleError}</p>
                      )}
                      <h5>副標題</h5>
                      <input
                        type="text"
                        defaultValue={this.state.post[0].subtitle}
                        name="item_title"
                        id="item_title"
                        className="form-control"
                        placeholder=""
                        onChange={this.onChangeSubtitle}
                      />
                      <h5>詳細描述</h5>
                      <div className="editor-container">
                        <Editor
                          name="item_desc"
                          id="item_desc"
                          value={this.state.desc}
                          className={`form-control ${
                            this.state.descError && "error"
                          }`}
                          init={{
                            height: 500,
                            selector: "#editor",
                            menubar: true,
                            plugins:
                              "powerpaste casechange searchreplace autolink directionality visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount editimage help formatpainter permanentpen charmap linkchecker emoticons advtable export autosave advcode fullscreen",
                            toolbar:
                              "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | code",
                            extended_valid_elements: "iframe[*]",
                            advcode_inline: true,
                          }}
                          onEditorChange={this.handleEditorChange}
                        />
                      </div>
                      <div className="spacer-10"></div>
                      <h5>標籤</h5>
                      <input
                        type="text"
                        defaultValue={this.state.post[0].category
                          .filter(
                            (item) =>
                              ![
                                "research",
                                "outstanding",
                                "regular",
                                "honor",
                              ].includes(item)
                          )
                          .map((tag) => tag)}
                        name="item_title"
                        id="item_title"
                        className="form-control"
                        placeholder=""
                        onChange={this.onChangeTags}
                      />
                      <h5>
                        {this.state.type == 1
                          ? "獲獎年份"
                          : this.state.type == 2
                          ? "入學年份"
                          : this.state.type == 3
                          ? "發表年份"
                          : "獲獎年份"}
                      </h5>
                      <input
                        type="number"
                        defaultValue={this.state.post[0].year}
                        name="item_title"
                        id="item_title"
                        className={`form-control ${
                          this.state.yearError && "error"
                        }`}
                        placeholder=""
                        onChange={this.onChangeYear}
                      />
                      {this.state.yearError && (
                        <p className="error-message">{this.state.yearError}</p>
                      )}
                      <div className="spacer-single"></div>
                      <div>
                        <h5>檔案</h5>
                        {this.state.post[0].media.map((media) => (
                          <>
                            {media.extension == "mp4" ? (
                              <ReactPlayer url={media.link} />
                            ) : (
                              <img
                                src={media.link}
                                className="img-fluid img-rounded mb-sm-30"
                              />
                            )}
                            <div
                              id="delete_btn"
                              className="btn-main mb-2"
                              style={{ backgroundColor: "#900000" }}
                              onClick={() => {
                                this.deleteFile(media.link);
                              }}>
                              Delete File
                            </div>
                          </>
                        ))}
                        <div className="d-create-file">
                          <p id="file_name">PNG, JPG/JPEG or MP4. Max 200mb.</p>
                          {this.state.files.map((x) => (
                            <p key={x.name}>{x.name}</p>
                          ))}
                          <div className="browse">
                            <input
                              type="button"
                              className="btn-main"
                              id="get_file"
                              value="Browse"
                            />

                            <input
                              id="upload_file"
                              type="file"
                              multiple
                              onChange={this.onChangeMultiple}
                              accept=".mp4,.png,.jpg,.jpeg"
                            />
                          </div>
                          <div className="spacer-10"></div>
                        </div>
                        <div
                          id="delete_btn"
                          className="btn-main hide mt-2"
                          style={{ backgroundColor: "#900000" }}
                          onClick={this.deleteFiles}>
                          Delete Files
                        </div>
                        <div className="spacer-5"></div>
                        <input
                          type="button"
                          id="submit"
                          onClick={this.submit}
                          className="btn-main"
                          value="Update Post"
                        />
                      </div>
                    </div>
                  </form>
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

export default withParams(Edit);
