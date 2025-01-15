import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Caurosel.css"

function Courosel() {
  const [index, setIndex] = useState(0);

  // carousel image style
  const styles = {
    imgPic: {
      width: "100%",
      height: "800px",
      filter: "blur(1px)",
    },
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className=''>
      <Carousel.Item>
        <img
         src="./public/CarouselAssets/students.jpg"
         alt=""
         className='carousel-img'
         style={styles.imgPic} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img 
        src="https://thumbs.dreamstime.com/b/african-university-students-group-happy-looking-camera-52803479.jpg"
        alt=""
        className='carousel-img' 
        style={styles.imgPic}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://www.oxfordlearning.com/wp-content/uploads/2023/03/GettyImages-846567624-scaled.jpg"
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