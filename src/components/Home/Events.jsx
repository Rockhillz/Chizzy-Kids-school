import { useNavigate } from "react-router-dom";
import Cardbox from "../CardList/Cardbox";
import HrElement from "./HrElement";
import { useEffect, useState } from "react";
import EventHomeCard from "./EventHomeCard";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/latest-events`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data.events || data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  //function to take us to event
  const handleClick = () => {
    navigate("/events");
  };
  return (
    <div className="container">
      <h1
        style={{
          fontWeight: "700",
          textAlign: "center",
          color: "#0a4275",
          marginTop: "10px",
        }}
      >
        Our Events
      </h1>
      <HrElement />
      <div className="row d-flex justify-content-center mt-2 px-2">
        {events.map((event) => (
          <div key={event._id} className="col-sm-4 col-12 d-flex justify-content-center mb-3">
            <EventHomeCard
              image={event.image}
              title={event.title}
              description={event.description}
              date={event.date}
              onClick={() => handleClick()}
            />
          </div>
        ))}
      </div>
      {/* 
            <div className="row d-flex justify-content-center mt-2">
                <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-653.jpg'}
                    Title={'CAPITAL PROJECT'}
                    Cardtext={'Three Projects from the government appropriation for the budget year have been completely executed. The others are yet to be cash-backed an'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>

                <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-838.JPG'}
                    Title={"PKC's PROFILE"}
                    Cardtext={'PROFILE OF OUR PRINCIPAL MR. AGADA ALI ANDREW PKC25 Mr. Agada Ali Andrew was born on the 25th of March, 1965 to the family of'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>

                <div className="col-sm-4 col-12 d-flex justify-content-center mb-3">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-572.jpg'}
                    Title={'OPEN DAY'}
                    Cardtext={'The Open Day for Second Term comes up on Tuesday, March 10th at the Main Campus. Parents and students of SS1 To SS3 are expected'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>
                
            </div> */}
    </div>
  );
};

export default Events;
