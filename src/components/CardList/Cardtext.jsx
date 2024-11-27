import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css'

const Cardtext = ({ Image, Title, Cardtext, btntext, linkout }) => {
    const styles = {
        textTitle: {
            fontSize: "20px",
            textAlign: "center",
            color: "darkBlue",
            marginTop: "10px"

        },
        textContent: {
            fontSize: "14px",
            textAlign: "center",
            height: "100px",
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
                    <Card.Title style={styles.textTitle}>{Title || "Card Title"}</Card.Title>
                    <Card.Text style={styles.textContent}>
                        {Cardtext || "Some quick example text to build on the card title and make up the bulk of the cards content."}
                    </Card.Text>
                    <Button variant="primary" style={styles.btnBox}>{btntext || "Go somewhere"}</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Cardtext