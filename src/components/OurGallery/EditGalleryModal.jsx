import { useState } from 'react';
import './OurGallery.css';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function EditGalleryModal({show, onClose}) {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [desscription, setDesscription] = useState('');
    const [image, setimage] = useState('');

    const navigate = useNavigate()



    // function to create gallery 
    

    


    return (
        <>

            <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="head__modal d-flex justify-content-between">
                        <h2 className='text-primary mb-3 text-center fw-bold'>Edit Gallery</h2> <span onClick={onClose}><IoClose className='fs-1' /></span>
                    </div>

                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className='fw-bold ms-2 mb-0'>Edit Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gallery title"
                                autoFocus
                                className='mb-3'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <Form.Label className='fw-bold ms-2 mb-1'> Edit Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="describe your gallery"
                                autoFocus
                                className='mb-3'
                                value={desscription}
                                onChange={e => setDesscription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="EditGalleryModalForm.ControlTextarea1"
                        >
                            <Form.Label className='fw-bold ms-2 mb-1'>Edit Image:</Form.Label>
                            <Form.Control type="file" accept='png jpg webp jpeg avif' rows={3}
                                onChange={e => setimage(e.target.files[0])}
                            />

                        </Form.Group>
                    </Form>
                    <div className='mt-3 d-flex justify-content-start' style={{ width: '100%' }}>
                        <button className="btn btn-primary ms-2 px-5 fw-bold" onClick={''}>{isLoading ? <Spinner variant='light' /> : 'Save'}</button>
                        {/* <button className="btn btn-danger" onClick={handleClose}>Cancel</button> */}
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditGalleryModal;