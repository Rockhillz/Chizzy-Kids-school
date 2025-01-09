
import Carousel from 'react-bootstrap/Carousel';

function Courosel() {
    const styles = {
        imgPic: {
            width: "100%",
            height: "800px",
            filter: " blur(1px)",
        },


        textTitle: {
            fontSize: "50px",
            fontWeight: "700",
            color: "white",
            // width: "500px",
            margin: "80px",
        },
        container: {
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            marginBottom: "200px",
        },

        btnButton :{
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: "20px",
            width:"150px",
            fontSize:"13px",
            fontWeight:"600",
            backgroundColor:"darkBlue",
        }
    }


    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./public/CarouselAssets/students.jpg"
                    alt="First slide"
                    style={styles.imgPic}
                />
                <Carousel.Caption style={styles.container}>
                    <h5 style={styles.textTitle}>Chizzy Kids Group of Schools</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://thumbs.dreamstime.com/b/african-university-students-group-happy-looking-camera-52803479.jpg"
                    alt="Second slide"
                    style={styles.imgPic}
                />
                <Carousel.Caption style={styles.container}>
                    <h5 style={styles.textTitle}>Learning Never Exhaust The Mind</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <a href="/school" className="mt-5 btn" style={styles.btnButton}>
                        School Portal
                    </a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.oxfordlearning.com/wp-content/uploads/2023/03/GettyImages-846567624-scaled.jpg"
                    alt="Third slide"
                    style={styles.imgPic}
                />
                <Carousel.Caption style={styles.container}>
                    <h5 style={styles.textTitle}>This Is What we Teach Our Students </h5>
                    <p className='align-center'>
                        Making the best of every learning opportunity is the key to success.
                    </p>
                    <a href="/school" className="mt-5 btn" style={styles.btnButton}>
                        School Portal
                    </a>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Courosel;