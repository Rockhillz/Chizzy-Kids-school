import Card from 'react-bootstrap/Card';
import './OurGallery.css';


const OurGallery = ({imgurl, Title, Subtitle}) => {
  return (
    <div >
      <Card className='mb-5'>
        <Card.Body>
        <Card.Img variant="top" src={imgurl} />
          <Card.Title>{Title}</Card.Title>
          <Card.Subtitle className="">{Subtitle}</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  )
}

export default OurGallery