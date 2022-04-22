import React from "react";
import { Navbar } from "../components/navbar";
import "../styles/home.scss";
import { SliderSpecialty } from "../components/slider/slider_specialties";
import "../styles/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderDoctor } from "../components/slider/slider_doctor";
import { HomeBanner } from "../components/home_banner";
import { SliderBlog } from "../components/slider/slider_blog";

export const HomePage = () => {


  return (
    <div className="home">
      <Navbar />
      <HomeBanner/>
      <SliderBlog/>
      <SliderSpecialty/>
      <SliderDoctor/>
      <div style={{height:"300px"}}></div>
    </div>
  );
};
