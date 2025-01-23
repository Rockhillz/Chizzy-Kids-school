import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Caurosel.css"

function Courosel() {
  const [index, setIndex] = useState(0);

  // carousel image style
  const styles = {
    imgPic: {
      width: "100%",
      height: "550px",
      objectFit: "cover",
      objectPosition: "center top",
      filter: "blur(1px)",
    },
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='topside'>
      <Carousel.Item className='carr'>
        <img
        //  src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1737633566/chizzyJPEG_oegn2d.jpg"
        src='https://res.cloudinary.com/djbtdlzrj/image/upload/v1736338474/ChizzyKids_DB/students/bsa1qogsxmptu9s0dd6o.jpg'
         alt="Group of students"
         className='carousel-img'
         style={styles.imgPic} />
        <Carousel.Caption>
          <h3>Group Picture</h3>
          <p>
            Children Posing for picture.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
        
        // src='https://res.cloudinary.com/djbtdlzrj/image/upload/v1737571972/Joyful_Classroom_Celebration_rgkpcm.jpg'
        src='https://res.cloudinary.com/djbtdlzrj/image/upload/v1737637798/IMG-20241117-WA0032_faeg7w.jpg'
        alt="New"
        className='carousel-img' 
        style={styles.imgPic}/>
        <Carousel.Caption>
          <h3></h3>
          <p>Football team taking a group photograph.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
       
          src='https://res.cloudinary.com/djbtdlzrj/image/upload/v1737571972/Joyful_Young_Girl_Ready_for_School_xarrpp.jpg'
         alt=""
         className='carousel-img'
         style={styles.imgPic} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default Courosel;