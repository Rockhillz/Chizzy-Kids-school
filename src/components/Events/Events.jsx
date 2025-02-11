// // import { Carousel } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import "./event.css";
// import Cardbox from "../CardList/Cardbox";
// // import { Link } from "react-router-dom";
// import HrElement from "../Home/HrElement";

// const Events = () => {
//   const [events, setEvents] = useState([]);

//   // fetch events from database
//   const fetchEvents = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/events`
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setEvents(data.events || data);
//       console.log(events);
//     } catch (error) {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scrolls to the top of the page
//     fetchEvents();
//   }, []);

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <main className="container py-5">
//         <div className="cont2 text-center">
//           <h5>Upcoming Events</h5>
//           <h1>BE UP TO DATE WITH OUR EVENTS</h1>
//           <HrElement />
//         </div>

//         <div className="row d-flex justify-content-center mt-2">
//           {events.map((event) => (
//             <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
//               <Cardbox
//                 Image={event.image}
//                 Title={event.title}
//                 Cardtext={event.description}
//                 date={event.date}
//                 linkout={() => handleNavigate()}
//               />
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Events;

import React, { useEffect, useState } from "react";
// import "./event.css";
import EventCard from "./EventCard"; // Import new card component
import HrElement from "../Home/HrElement";

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/eventsPage`);
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
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <main className="container py-5">
        <div className="cont2 text-center">
          <h5>Upcoming Events</h5>
          <h1>BE UP TO DATE WITH OUR EVENTS</h1>
          <HrElement />
        </div>

        <div className="row d-flex justify-content-center mt-2">
          {events.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
              <EventCard
                image={event.image}
                title={event.title}
                description={event.description}
                date={event.date}
                onClick={() => console.log(`Clicked on ${event.title}`)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
