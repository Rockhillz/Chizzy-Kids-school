import { useState } from 'react';
import './OurGallery.css';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function CreateGalleryModal() {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setimage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()



    // function to create gallery 
    const createGallery = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior

        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Token not found. Please try again");
                setIsLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (!image) {
                alert("Please upload an image.");
                return;
            }
            formData.append('image', image);
            
            console.log("Form Data:", [...formData.entries()]);


            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/createGallery`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                }, // No need for 'Content-Type' in FormData
                body: formData
            });

            const responseData = await response.json(); // ✅ Fix: Parse response correctly

            if (!response.ok) {
                throw new Error(responseData.message || 'Something went wrong');
            }

            console.log('Created successfully:', responseData);
            setShow(false);
            navigate(0);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <>

            <button className='btn gallery__cta fw-bold' onClick={handleShow}> <span className='mb-5'><FaPlus className='mb-1 me-1' /></span> Create Gallery</button>



            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="head__modal d-flex justify-content-between ">
                        <h2 className='text-primary mb-3 fw-bold '>Create a Gallery</h2> <div onClick={handleClose}><IoClose className='fs-1' /></div>
                    </div>

                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className='fw-bold ms-2 mb-0'>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gallery title"
                                autoFocus
                                className='mb-3'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <Form.Label className='fw-bold ms-2 mb-1'>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="describe your gallery"
                                autoFocus
                                className='mb-3'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="CreateGalleryModalForm.ControlTextarea1"
                        >
                            <Form.Label className='fw-bold ms-2 mb-1'>Upload Images:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/png, image/jpg, image/webp, image/jpeg, image/avif"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        console.log("File Selected:", e.target.files[0]);  // ✅ Debugging log
                                        setimage(e.target.files[0]);
                                    }
                                }}
                            />



                        </Form.Group>
                    </Form>
                    <div className='mt-3 d-flex justify-content-start' style={{ width: '100%' }}>
                        <button className="btn btn-primary ms-2 px-5 fw-bold" onClick={createGallery}>{isLoading ? <Spinner variant='light' /> : 'Create'}</button>
                        {/* <button className="btn btn-danger" onClick={handleClose}>Cancel</button> */}
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateGalleryModal;