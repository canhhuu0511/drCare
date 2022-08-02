import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { settingSlider } from '../../constants/setting_slider'
import { BlogCard } from '../card/blog_card'
import { manageService } from '../../services/ManageService';

export const SliderBlog = () => {
  const [listNews,setLisNews] = useState([]);

  useEffect(() => {
    manageService.getNews().then((result)=>{
      setLisNews(result.data)
      console.log(result.data)
    }).catch((e)=>console.log(e))
  }, []);

  return (
    <div className="home-news">
        <div className="container">
          <Slider {...settingSlider}>
            {listNews.map((e)=>{
              let text = e.description+"";
              const feed = {
                title:e.title,
                image:text.slice(text.indexOf("src=")+5,text.indexOf(" ></a>")-1),
                link : e.link,
                pubDate:e.pubDate,
                description:text.slice(text.indexOf("</br>")+5),
              };
              return <BlogCard key={e.link} aNew={feed}/>
            })}
            
          </Slider>
        </div>
      </div>
  )
}
