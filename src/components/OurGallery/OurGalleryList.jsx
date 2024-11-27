import galleries from "./galleries";
import OurGallery from "./OurGallery";
import './OurGallery.css';
import HrElement from "../Home/HrElement";


const OurGalleryList = () => {
  return (
    <div className="container OurgalleryList ">
      <h1>OUR GALLERY</h1>
        <HrElement/>
      <div className='gallery'>
        {galleries.map((gallery, index) => (
          <OurGallery
            key={index} {...gallery} />
        ))}
      </div>
    </div>

  )
}

export default OurGalleryList