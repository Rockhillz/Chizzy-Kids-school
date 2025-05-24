import React from "react";
import "./GalleryListCard.css";

const GalleryListCard = ({ id, image, title, activeId, setActiveId }) => {
  const isActive = activeId === id;

  return (
    <div
      className="gallery-card"
      onMouseEnter={() => setActiveId(id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => setActiveId(isActive ? null : id)} // Toggle title visibility on tap
    >
      <img src={image} alt={title} className="gallery-card-img" />
      <div className={`gallery-title ${isActive ? "visible" : ""}`}>
        {title.toUpperCase()}
      </div>
    </div>
  );
};

export default GalleryListCard;

