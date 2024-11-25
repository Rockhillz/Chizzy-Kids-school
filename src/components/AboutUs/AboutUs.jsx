import { Carousel } from "react-bootstrap";
import "./AboutUs.css";
import { Link } from "react-router-dom";


const AboutUs = () => {
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
              <div className= "capt">
              <h3 className="text-color text">About Us</h3>
              <p>
              <div>
                <Link to="/" className=" btn btn-dark second-color mx-3">
                  Home
                </Link>

                <Link to="/ourGallery" className="btn btn-dark caption second-color mx-3">
                  About Us
                </Link>
              </div>
              </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
      <main className="container">
      <div className="cont">
        <h5>History</h5>
        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae incidunt dignissimos quas eius iure neque perferendis perspiciatis ad, molestias veniam. Voluptate, vero! Aut veniam nobis reprehenderit animi ducimus. Error, fugiat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias unde, repellendus saepe laudantium error corporis totam assumenda? Sunt, rem fugit facilis dolores repudiandae quam eius? Aut provident vitae modi dolorum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat beatae officia voluptatum commodi cumque quidem similique inventore quo soluta corporis sed, magnam illum possimus quia exercitationem repellendus fuga magni. Excepturi?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia velit cupiditate vero quasi explicabo doloremque reiciendis rem. Dolorum nostrum sunt fugiat expedita tenetur laudantium deserunt possimus magnam sit. Commodi, quos?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet atque, nemo adipisci labore, explicabo at vero illo corporis ipsam eum placeat, eligendi libero. Unde est atque perspiciatis dicta officiis voluptatum? </p>
      </div>
      </main>
      
      </div>
      
);
};
export default AboutUs