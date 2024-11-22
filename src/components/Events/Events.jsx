import { Carousel } from "react-bootstrap";
import "./event.css";
import Cardbox from "../CardList/Cardbox";
import { Link } from "react-router-dom";
import HrElement from "../Home/HrElement";

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
              src="https://t4.ftcdn.net/jpg/04/91/76/63/360_F_491766301_yF6pxwvJnyY4I43PlU6zPEPoY5ZjJLEL.jpg" 
              alt="Single Slide"
              style={style.img}
            />
            <Carousel.Caption>
              <h3 className="text-color text">Upcoming Events</h3>
              <div>
                <Link to="/" className=" btn btn-dark second-color mx-3">
                  Home
                </Link>

                <Link to="/ourGallery" className="btn btn-dark caption second-color mx-3">
                  Gallery
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>

      <main className="container">
        <div className="cont2">
          <h5>Upcoming Event</h5>
          <h1>BE UP TO DATE WITH OUR EVENTS</h1>
        <HrElement/>
        </div>

        <div className="cont1  align-items-content">
          <div className="row ">
            <div className="col-12 col-sm-3">
              <Cardbox 
              Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-224.jpg'}
              Title={'INTER-HOUSE SPORTS COMPETITION'}
              Cardtext={'The Inter-House Sports Competition is a fantastic opportunity for our students to showcase their talents and skills. It is a great way for our students to gain experience in various sports, and to showcase their skills to their parents and peers.'}
              btntext={'22/11/2024'}

              />
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
