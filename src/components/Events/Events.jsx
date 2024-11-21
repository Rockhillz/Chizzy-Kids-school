import { Carousel } from "react-bootstrap";
import "./event.css";
import Cardbox from "../CardList/Cardbox";
import { Link } from "react-router-dom";

const Events = () => {
  const style = {
    carousel: {
      height: "550px",
      width: "100%",
      margin: "auto",
      overflow: "hidden",
      position: "relative",
      background: "#f1f1f1",
    },

    img: {
      height: "500px",
      width: "100%",
    },
  };
  return (
    <div>
      <header>
        <Carousel indicators={false} controls={false} style={style.carousel}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://t4.ftcdn.net/jpg/04/91/76/63/360_F_491766301_yF6pxwvJnyY4I43PlU6zPEPoY5ZjJLEL.jpg" // Replace with your image URL
              alt="Single Slide"
              style={style.img}
            />
            <Carousel.Caption>
              <h3 className="text-color text">Upcoming Events</h3>
              <p>
                <Link to="/" className="text-color">
                  Home
                </Link>

                <Link to="/ourGallery" className="caption text-color">
                  Gallery
                </Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>

      <main className="container">
        <div className="cont2">
          <h5>Upcoming Event</h5>
          <h1>BE UP TO DATE WITH OUR EVENTS</h1>
        </div>

        <div className="cont1  align-items-content">
          <div className="row ">
            <div className="col-12 col-sm-3">
              <Cardbox />
            </div>
            <div className="col-12 col-sm-3">
              <Cardbox />
            </div>
            <div className="col-12 col-sm-3">
              <Cardbox />
            </div>
            <div className="col-12 col-sm-3">
              <Cardbox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
