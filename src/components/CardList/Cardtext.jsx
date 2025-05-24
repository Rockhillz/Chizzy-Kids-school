import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Card.css";
import { LiaNewspaperSolid } from "react-icons/lia";

const Cardtext = ({ title, cardtext, btntext, linkout }) => {
  const characterLimit = 300; // Adjust as needed

  const styles = {
    textTitle: {
      fontSize: "20px",
      textAlign: "center",
      color: "#0a4275",
      margin: "5px 0", // Reduce extra spacing
      width: "100%",
    },

    textContent: {
      fontSize: "14px",
      textAlign: "center",
      height: "150px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 6,
      WebkitBoxOrient: "vertical",
      margin: "5px 0", // Reduce extra spacing
    },

    btnBox: {
      borderRadius: "22px",
      padding: "5px 20px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      fontSize: "12px",
      margin: "5px 0", // Reduce extra spacing
    },

    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "5px", // Reduce space below icon
    },

    cardBody: {
        cursor: "pointer",
    }

  };

  return (
    <Card className="CardContainer" onClick={linkout}>
      <Card.Body style={styles.cardBody}>
        <div style={styles.iconContainer} className="mt-4">
          <LiaNewspaperSolid size={40} />
        </div>

        <Card.Title style={styles.textTitle} className="mt-3">
          {title || "Card Title"}
        </Card.Title>
        <Card.Text style={styles.textContent} className="mt-3">
          {cardtext
            ? cardtext.length > characterLimit
              ? cardtext.slice(0, characterLimit) + "..."
              : cardtext
            : "Some quick example text to build on the card title and make up the bulk of the card's content."}
        </Card.Text>
        <Button variant="primary" style={styles.btnBox} className="mt-5">
          {btntext || "Read more"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cardtext;
