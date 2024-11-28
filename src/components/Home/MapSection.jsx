// import { useState } from 'react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ToggleFormImage from './ToggleFormIcon';

const MapSection = () => {
    // const [ message, setmessage] = useState(false);


    const handleToggle = () => {
        setmessage(<ToggleFormImage/>)
    }
    
    const handleSubmit = (event) => {
        //function to handle message us to call out togglebutton
        event.preventDefault();
        // Handle form submission logic here
        // alert("Form Submitted!");
    };

    return (
        <section className='container-fluid'>
            <div className='row' style={{marginTop:"100px", marginBottom:"50px"}}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            margin: '0 auto',
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                        }}

                        className='col-12 col-sm-6'
                    >
                        <Form onSubmit={handleSubmit}>
                            {/* Text Input */}
                          <h2><i>Send Us A Message....</i></h2>
                            {/* Submit Button */}
                            <Button variant="primary"  onClick={()=>{handleToggle()}} className="mt-3">
                                Message Us
                            </Button>
                        </Form>
                    </div>

                    <div className='col-12 col-sm-6'>

                    </div>
                </div>


        </section>

    );
};

export default MapSection;
