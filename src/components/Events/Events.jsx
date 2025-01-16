// import { Carousel } from "react-bootstrap";
import "./event.css";
import Cardbox from "../CardList/Cardbox";
// import { Link } from "react-router-dom";
import HrElement from "../Home/HrElement";

const Events = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <main className="container py-5">
        <div className="cont2">
          <h5>Upcoming Events</h5>
          <h1>BE UP TO DATE WITH OUR EVENTS</h1>
          <HrElement />
        </div>

        <div className="row d-flex justify-content-center mt-2">
          <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
            <Cardbox
              Image={
                "https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-224.jpg"
              }
              Title={"INTER-HOUSE SPORTS COMPETITION"}
              Cardtext={
                "The Inter-House Sports Competition is a fantastic opportunity for our students to showcase their talents and skills. It is a great way for our students to gain experience in various sports, and to showcase their skills."
              }
              btntext={"22/11/2024"}
            />
          </div>

          <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
            <Cardbox Image={"./public/CarouselAssets/students.jpg"} />
          </div>

          <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
            <Cardbox
              Image={
                "https://thumbs.dreamstime.com/b/african-university-students-group-happy-looking-camera-52803479.jpg"
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
