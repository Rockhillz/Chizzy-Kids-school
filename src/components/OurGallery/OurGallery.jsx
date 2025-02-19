import Card from 'react-bootstrap/Card';
import './OurGallery.css';

const OurGallery = ({ Title, imgurl }) => {
  // This will be worked on. Both on the CSS part and this part. To get that hover feature.
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