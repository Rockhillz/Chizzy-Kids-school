import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css'

function Cardbox({Image, Title, Cardtext, btntext}) {
  const styles = {
    Imgpic:{
      width: "100%",
      height: "230px important",
      borderRadius:"0"
    },
    textTitle:{
      fontSize:"20px",
      textAlign:"center",
      color:"darkBlue",
      
    },
    textContent:{
      fontSize:"14px",
      textAlign:"center",
      height:"100px",
      marginTop:"10px"
    },

    btnBox:{
      marginTop:"30px",
      borderRadius:"22px",
      padding:"5px 20px",
      backgroundColor:"white",
      border:"1px solid black",
      color:"black",
      fontSize:"12px"
    }
  }


  return (
    <Card style={styles.CardContainer} className='CardContainer'>
      <Card.Img variant="top" src={Image ||"holder.js/100px180"} 
      style={styles.Imgpic}
      />
      <Card.Body>
        <Card.Title style={styles.textTitle}>{Title ||"Card Title"}</Card.Title>
        <Card.Text style={styles.textContent}>
          {Cardtext ||"Some quick example text to build on the card title and make up the bulk of the cards content."}
        </Card.Text>
        <Button variant="primary"  style={styles.btnBox}>{btntext ||"Go somewhere"}</Button>
      </Card.Body>
    </Card>
  );
}

export default Cardbox;