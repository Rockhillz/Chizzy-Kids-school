import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default Events;
