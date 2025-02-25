import React, { useEffect, useState } from 'react';
import OurGallery from './OurGallery';
import './OurGallery.css';
import CreateGalleryModal from './CreateGalleryModal';
import { Spinner } from 'react-bootstrap';


const Gallery = () => {
  // State to store gallery data
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  //function to get gallery from the back end
  const getGallery = async () => {
    setIsloading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const galleryData = await response.json();
      setGalleries(galleryData);
      console.log(galleryData, 'Gallery data');
    } catch (error) {
      console.error(error.message || 'Error fetching gallery');
    }
    setIsloading(false);
  };
  


  useEffect(() => {
    getGallery();
    // fetchGallery();
  }, []);



  return (
    <section className="create_gallery container">
      <h1 className='text-primary'>OUR GALLERY</h1>
      <div className="create_gallery-btn">
        <small >
          <CreateGalleryModal/>
        </small>
          
          
      </div>
      {isLoading && <Spinner variant='primary'/>}
      <div className="row g-4" style={{width:'100%'}}> 
        {galleries.map((gallery, index) => ( 
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 ms-2"> 
            <OurGallery 
            description={gallery.description.length > 20 ? gallery.description.substring(0, 20) + `...` : gallery.description}
            image={gallery.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;