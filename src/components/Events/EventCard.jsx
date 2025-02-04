import React from "react";
import { Card } from "react-bootstrap";
import "./EventCard.css"; // Optional for extra styles

const EventCard = ({ image, title, description, date, onClick }) => {
  return (
    <Card className="event-card shadow-sm" onClick={onClick}>
      <Card.Img variant="top" src={image} alt={title} className="event-card-img" />
      <Card.Body>
        <Card.Title className="event-title">{title}</Card.Title>
        <Card.Text className="event-date text-muted">
          📅 {new Date(date).toLocaleDateString()}
        </Card.Text>
        <Card.Text className="event-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
