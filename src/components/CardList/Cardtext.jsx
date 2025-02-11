import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css'

const Cardtext = ({ title, cardtext, btntext, linkout }) => {
    const styles = {
        textTitle: {
            fontSize: "20px",
            textAlign: "center",
            color: "#0a4275",
            marginTop: "10px"
        },

        textContent: {
            fontSize: "14px",
            textAlign: "center",
            marginTop: "40px",
            height: "250px",
            // border:"1px solid black"
        },

        btnBox: {
            // marginTop: "45px",
            borderRadius: "22px",
            padding: "5px 20px",
            backgroundColor: "white",
            border: "1px solid black",
            color: "black",
            fontSize: "12px"
        }
    }

    return (
        <div>
            <Card className='CardContainer' onClick={linkout}>
                <Card.Body>
                    <Card.Title style={styles.textTitle}>{title || "Card Title"}</Card.Title>
                    <Card.Text style={styles.textContent}>
                        {cardtext || "Some quick example text to build on the card title and make up the bulk of the cards content."}
                    </Card.Text>
                    <Button variant="primary" style={styles.btnBox}>{btntext || "Read more"}</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Cardtext