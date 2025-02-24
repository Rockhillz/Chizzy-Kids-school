import { useState } from 'react';
import './OurGallery.css';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { IoWarning } from "react-icons/io5";
// import { Spinner } from 'react-bootstrap';

function ConfirmDelete({show, onClose}) {
    const navigate = useNavigate()



    return (
        <>

            <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
                <Modal.Body>
                <div className='text-center'>
                    <small style={{fontSize:'50px',color:'red'}}><IoWarning/></small>
                    <h5 className='my-2'>Are you sure you want to delete this gallery?</h5>
                </div>



                <div className="d-flex justify-content-center mt-5 confirm__btn">
                    <button className="btn btn-secondary " onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger ms-3   ">Delete</button>
                </div>
                    

                    
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmDelete;