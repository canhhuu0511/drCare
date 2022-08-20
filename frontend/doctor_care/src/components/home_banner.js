import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon_Search } from "../constants/icons";
import { searchKeys } from "../fake_data/searchkey";
import { searchService } from "../services/SearchService";

export const HomeBanner = () => {
  const [index, setIndex] = useState(0);
  const [inputSearch, setInputSearch] = useState({
    "input":""
  });
  const [initData,setInitData] = useState({});
  const [searchResult,setSearchResult] = useState({
    doctors : [],
    specialties : [],
    clinics:[]
  });

  useEffect(() => {
    searchService.getInitData().then((result) => {
      setInitData(result.data);
      setSearchResult(result.data);
    });
  }, []);

  useEffect(() => {
    document.title = "DoctorCare";
    const time = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === searchKeys.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    ); // Change image every 2 seconds
    return () => {
      clearTimeout(time);
    };
  }, [index]);

  const handleInputChange = async (e) =>{
    // e.preventDefault();
    let {value} = e.target;
    console.log(value);
    if(inputSearch===''){
      setSearchResult(initData);
      return;
    }else{
      await setInputSearch({"input":value});
      await setTimeout(null,500);
      await searchService.search(inputSearch).then((result) => {
        setSearchResult(result.data.data);
        console.log(result.data);
        console.log(inputSearch);
      });
    }
  }

  const focusSearchBox = () =>{
    let boxResult = document.getElementsByClassName("box-result");
    boxResult[0].classList.add("show");
  }
  const blurSearchBox = () =>{
    // let boxResult = document.getElementsByClassName("box-result");
    // boxResult[0].classList.remove("show");
  }
  return <div className="home-banner">
  <div className="home-search mt-6">
    <div className="title">
      <h1>
        NỀN TẢNG Y TẾ <hr style={{ opacity: "0", marginTop: "0" }} />
        <b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b>
      </h1>
    </div>
    <div className="home-search-box">
      <div className="icon-search">
        <Icon_Search />
      </div>
      <input onChange={handleInputChange} onFocus={focusSearchBox} onBlur={blurSearchBox} type="text" placeholder={searchKeys[index]} />
    </div>
    <div  className="box-result">
          {searchResult.doctors&&searchResult.doctors.length>0&&
          <ul>
            <p>Bác sĩ</p>
              {searchResult.doctors.map((doctor,index)=>
                <Link key={index} to={`/doctor/${doctor.id}`}>
                  <li >
                  <img srcSet={`${doctor.image} 5x`} alt="" />
                  Bác sĩ {doctor.position}, {doctor.lastName} {doctor.firstName}
                  </li>
                </Link>
              )}
          </ul>
          }
          {searchResult.specialties&&searchResult.specialties.length>0&&
          <ul>
            <p>Chuyên khoa</p>
              {searchResult.specialties.map((specialty,index)=>
                <Link key={index} to={`/specialty/${specialty.id}`}>
                  <li>
                    <img srcSet={`${specialty.image} 5x`} alt="" />
                    {specialty.name}
                  </li>
                </Link>
              )}
          </ul>
          }{searchResult.clinics&&searchResult.clinics.length>0&&
            <ul>
              <p>Chuyên khoa</p>
                {searchResult.clinics.map((clinic,index)=>
                  <Link key={index} to={`/clinic/${clinic.id}`}>
                    <li>
                      <img srcSet={`${clinic.image} 5x`} alt="" />
                      {clinic.name}
                    </li>
                  </Link>
                )}
            </ul>
            }
      </div>
  </div>
  <div className="list-service">
    <ul className="service">
      <li className="item">
        <div className="icon-service service1" />
        Khám chuyên khoa
      </li>
      <li className="item">
        <div className="icon-service service2" />
        Khám từ xa
      </li>
      <li className="item">
        <div className="icon-service service3" />
        Khám tổng quát
      </li>
      <li className="item">
        <div className="icon-service service4" />
        xét nghiệm y học
      </li>
      <li className="item">
        <div className="icon-service service5" />
        Sức khỏe tinh thần
      </li>
      <li className="item">
        <div className="icon-service service6" />
        Khám nha khoa
      </li>
      <li className="item">
        <div className="icon-service service7" />
        Gói phẩu thuật
      </li>
      <li className="item">
        <div className="icon-service service8" />
        Sản phẩm y tế
      </li>
    </ul>
  </div>
</div>;
};
