import React from "react";

const Box = ({ image, title, date, description, onEdit, onDelete }) => {
  const styles = {
    boxContainer: {
      background: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    boxImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    boxContent: {
      padding: "16px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    boxTitle: {
      fontSize: "20px",
      textAlign: "center",
      color: "darkBlue",
      margin: "0 0 8px 0",
    },
    boxDate: {
      fontSize: "14px",
      textAlign: "center",
      color: "#666",
      margin: "0 0 12px 0",
    },
    boxDescription: {
      fontSize: "14px",
      textAlign: "center",
      color: "#444",
      margin: "0 0 16px 0",
      flex: 1,
    },
    boxActions: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "auto",
    },
    boxButton: {
      borderRadius: "22px",
      padding: "5px 20px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      fontSize: "12px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.boxContainer}>
      <img src={image} alt={title} style={styles.boxImage} />
      <div style={styles.boxContent}>
        <h3 style={styles.boxTitle}>{title}</h3>
        <p style={styles.boxDate}>{new Date(date).toLocaleDateString()}</p>
        <p style={styles.boxDescription}>{description}</p>
        <div style={styles.boxActions}>
          <button style={styles.boxButton} onClick={onEdit}>
            Edit
          </button>
          <button style={styles.boxButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Box;