import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Caurosel.css";

function Courosel() {
  const [index, setIndex] = useState(0);

  // Styles
  const styles = {
    carouselItem: {
      position: "relative",
    },
    imgPic: {
      width: "100%",
      height: "550px",
      objectFit: "cover",
      objectPosition: "center top",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.3)", // Semi-transparent overlay
      backdropFilter: "blur(1px)", // Soft background blur
    },
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="topside">
      {/* First Slide */}
      <Carousel.Item style={styles.carouselItem}>
        <img
          src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741686903/secSchool_x1at1v.jpg"
          alt="Group of students"
          className="carousel-img"
          loading="lazy"
          style={styles.imgPic}
        />
        <div style={styles.overlay}></div> {/* Blurred overlay */}
        <Carousel.Caption className="carousel-caption">
          <h1>
            Tomorrow’s Leaders: Striving for Excellence
          </h1>
          {/* <p>Children posing for a picture.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/* Second Slide */}
      <Carousel.Item style={styles.carouselItem}>
        <img
          src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/PriSch_dkrrxa.jpg"
          alt="Football team"
          className="carousel-img"
          loading="lazy"
          style={styles.imgPic}
        />
        <div style={styles.overlay}></div> {/* Blurred overlay */}
        <Carousel.Caption className="carousel-caption">
          <h1>Young Minds, Big Dreams</h1>
          {/* <p>Team taking a group photograph.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third Slide */}
      <Carousel.Item style={styles.carouselItem}>
        <img
          src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/newSec_va81np.jpg"
          alt="Primary student"
          className="carousel-img"
          loading="lazy"
          style={styles.imgPic}
        />
        <div style={styles.overlay}></div> {/* Blurred overlay */}
        <Carousel.Caption className="carousel-caption">
          <h1>Ambition, Excellence, Success: The School Spirit</h1>
          {/* <p>Excited for a new school day!</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Courosel;
