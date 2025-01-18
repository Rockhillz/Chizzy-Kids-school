import React from 'react';

const Blog = () => {
    return (
        <section className='container' style={{ marginTop: "100px" }}>
            <div className='row d-flex justify-content-between'>
                <div className='col-12 col-sm-8' style={{ width: "700px" }}>
                    <h2 className='mt-5 text-center' style={{ width: "300px", fontWeight: '700', color: 'darkblue' }}>
                        A Welcome Address From the Principal
                    </h2>

                    <hr style={{ width: '100px', border: '1px solid black' }} />

                    <p style={{ fontSize: '13px' }}>
                    Welcome to the official website of Chizzy Kids Group of Schools!

On behalf of the management, staff, and students, we are delighted to have you here. Established on January 25th, 2010, and located at 26 Ichie Dara Avenue, Shibiri, Lagos, Chizzy Kids Group of Schools stands as a beacon of excellence in learning and character. Guided by our motto, "Whatever is worth doing is worth doing well," we strive to uphold the highest standards in education and instill these values in every child entrusted to our care.

At Chizzy Kids, we are committed to providing quality education under the guidance of skilled instructors, laying a solid foundation for our students' academic and professional success. Beyond academics, we prioritize the physical, social, and psychological development of every child, nurturing them to become responsible, impactful members of society.

Our state-of-the-art facilities ensure an environment conducive to learning, further reinforcing our dedication to excellence. We welcome applications from across the country and are eager to help shape your children into the Kings and Queens of tomorrow.

Let’s connect and embark on this journey together. We look forward to building a fruitful and rewarding relationship with you. Welcome to Chizzy Kids Group of Schools!

                        <p style={{ fontSize: '13px' }} className='mt-5'><i>Principal...</i></p>
                    </p>
                </div>

                <div className='col-12 col-sm-4'>
                    <img src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1737233864/WhatsApp_Image_2025-01-03_at_12.45.04_ad7cb39a_hc2pf6.jpg" alt="principal photo" className='img-fluid' style={{ width: "300px", height: "400px", marginLeft: "30px" }} />
                </div>
            </div>
        </section>
    );
};

export default Blog;
