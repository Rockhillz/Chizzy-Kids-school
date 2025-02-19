import galleries from "./galleries";
import OurGallery from "./OurGallery";
import './OurGallery.css';
import HrElement from "../Home/HrElement";


const OurGalleryList = () => {
  // Will also render images from database. Then each image will when hovered on will bring up the title and description. Description will have lenght of characters. Both mobile and desktop.
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