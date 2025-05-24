import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaRegClock } from 'react-icons/fa';

const EventHomeCard = ({ image, title, description, date, onClick }) => {
  return (
    <Card
      style={{
        width: '23rem',
        height: '450px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="event-card"
    >
      <Card.Img
        variant="top"
        src={image}
        style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
      />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Card.Title style={{ color: '#0a4275', fontWeight: 'bold', textAlign: 'center' }}>{title}</Card.Title>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#757575', marginBottom: '10px' }}>
            <FaRegClock style={{ marginRight: '5px' }} />
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <Card.Text style={{ textAlign: 'center', fontSize: '14px', flexGrow: 1 }}>
            {description.length > 100 ? `${description.substring(0, 300)}` : description}
          </Card.Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Button variant="outline-dark" onClick={onClick} style={{ borderRadius: '20px' }}>
            Know More
          </Button>
        </div>
      </Card.Body>

      <style>{`
        @media (max-width: 576px) {
          .event-card {
            width: 20rem !important;
          }
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .event-card:hover .event-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};

export default EventHomeCard;