import { useState, useEffect } from "react";
import HrElement from "../Home/HrElement";
import GalleryListCard from "./GalleryListCard";

const OurGalleryList = () => {
  const [gallery, setGallery] = useState([]);
  const [activeId, setActiveId] = useState(null); // Track active image

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/gallery/galleryPage`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setGallery(data.galleryImages || data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGallery();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <main className="container py-5">
        <div className="cont2 text-center">
          <h3>Gallery</h3>
          <h5>EXPLORE OUR MEMORABLE MOMENTS</h5>
          <HrElement />
        </div>

        <div className="row d-flex justify-content-center mt-2">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
            >
              <GalleryListCard
                id={item._id}
                image={item.image}
                title={item.title}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OurGalleryList;