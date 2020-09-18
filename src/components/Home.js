import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image1 from "../Images/pexels-marta-ortigosa-3480494.jpg";
import Image2 from "../Images/pexels-photo-3983400.jpeg";
import Image3 from "../Images/pexels-matthias-zomer-339620.jpg";
import "../css/Home.css";

function Home() {
  return (
    <div>
      <Carousel interval="2000">
        <Carousel.Item className="carousel-item1">
          <img className="d-block w-100" src={Image1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className="carousel-item2">
          <img className="d-block w-100" src={Image2} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item className="carousel-item3">
          <img className="d-block w-100" src={Image3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
