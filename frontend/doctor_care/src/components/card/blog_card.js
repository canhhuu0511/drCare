import React from "react";
import "../../styles/card.scss";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ aNew }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    let link = aNew.link;
    let link_short = link.slice(link.indexOf(".net/")+5,link.indexOf("html")+4);
    navigate(`/b/${link_short}`, { state: { url: link,pubDate:aNew.pubDate } });
  };

  return (
    <div style={{ border: "none" }} className="card">
      <div
        style={{ backgroundImage: `url(${aNew.image})` }}
        className="card-image card-bg-image"
      >
        <label>NEW</label>
        {/* <img src="https://cdn.bookingcare.vn/fo/2021/07/27/140801-test-covid.jpg" alt="" /> */}
      </div>
      <h3 className="card-title">{aNew.title}</h3>
      <div className="card-content mt-3">
        <p className="card-decription">{aNew.description}</p>
      </div>
      <button onClick={() => handleSubmit()}>Xem chi tiết</button>
    </div>
  );
};
