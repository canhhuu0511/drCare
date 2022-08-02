import React, { useEffect, useState } from "react";
import { manageService } from "../services/ManageService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import "../styles/blog.scss";
import { Footer } from "../components/footer";
import { getOptionLabel } from "react-select/dist/Select-fd7cb895.cjs.prod";

export const BlogsPage = () => {
  const [content, setContent] = useState(null);
  const { state, pubDate } = useLocation();
  const [date, setDate] = useState(null);
  const [index,setIndex] = useState(0);

  useEffect(() => {

    manageService
      .getDetailOfNew(state.url)
      .then((result) => {
        setContent(result.data);
      })
      .catch((e) => {
        console.log(e);
      });

    moment.locale("vi");
    let date = moment(pubDate).format("dddd - DD/MM , h:mm");
    setDate(date);
  }, []);
  useEffect(() => {
    getIamgeSrc();
  });

  const getIamgeSrc = async() => {
    const imgs =
      document.getElementsByTagName("img") &&
      document.getElementsByClassName("lazy");
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute("data-src")) {
        await imgs[i].setAttribute("src", imgs[i].getAttribute("data-src"));
        imgs[i].removeAttribute("data-src"); //use only if you need to remove data-src attribute after setting src
        setIndex(1);
      }
    }
  };

  return (
    <div className="blog">
      <div style={{ marginTop: "4.6em" }}>
        <div style={{height:"10px"}}></div>
        <div className="header">
          <div className="container">
            <div className="left-content">
              <Link to={"/"}>Trang chủ</Link>
              {" / "}
              <Link to={"/blog"}>Tin tuc{index}</Link>
              {" / "}
            </div>
            <div className="right-content">
              <p>{date}</p>
            </div>
          </div>
        </div>
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};
