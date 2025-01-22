import Card from 'react-bootstrap/Card';
import './OurGallery.css';

const OurGallery = ({ Title, imgurl }) => {
  return (
    <Card style={{ width: "18rem" }} className="mx-auto shadow">
      <Card.Img variant="top" src={imgurl} alt={Title} />
      <Card.Body>
        <Card.Title className="text-center">{Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default OurGallery