import Card from 'react-bootstrap/Card';
import './OurGallery.css';

import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from 'react';
import EditGalleryModal from './EditGalleryModal';
import ConfirmDelete from './ConfirmDelete';



const OurGallery = ({ title, image, description }) => {
  
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false)

  
  //check if the user is admin or not 
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('userRole');


  const isInAdminDashboard = window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/teacher-dashboard');

  
  return (
    <>
    <Card style={{ width: "18rem" }} className="mx-auto shadow card__img">
      <Card.Img variant="top" style={{ height: '250px', objectFit: 'cover'}} src={image} alt={title} />
      <Card.Body>
        {isAdmin && token  && isInAdminDashboard &&
        <div className='control__btn'>
          <button className="btn delete_btn" style={{ color: 'red' }} onClick={()=> setShowConfirm(true)}><MdDelete/>  </button>
          <button className='btn text-primary edit_btn' onClick={ () => setShowModal(true)}> <CiEdit/> </button>
        </div>}

        <Card.Title className="text-center">{description}</Card.Title>
      </Card.Body>
    </Card>

    <EditGalleryModal show={showModal} onClose={() => setShowModal(false)} />
    <ConfirmDelete show={showConfirm} onClose={() => setShowConfirm(false)} />
    </>

    
  );
};

export default OurGallery