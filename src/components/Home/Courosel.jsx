// // import { useState } from "react";
// // import Carousel from "react-bootstrap/Carousel";
// // import "./Caurosel.css";

// // function Courosel() {
// //   const [index, setIndex] = useState(0);

// //   // Styles
// //   const styles = {
//   //   carouselItem: {
//   //     position: "relative",
//   //   },
//   //   imgPic: {
//   //     width: "100%",
//   //     height: "550px",
//   //     objectFit: "cover",
//   //     objectPosition: "center top",
//   //   },
//   //   overlay: {
//   //     position: "absolute",
//   //     top: 0,
//   //     left: 0,
//   //     width: "100%",
//   //     height: "100%",
//   //     background: "rgba(0, 0, 0, 0.3)", // Semi-transparent overlay
//   //     backdropFilter: "blur(1px)", // Soft background blur
//   //   },
//   // };

// //   const handleSelect = (selectedIndex) => {
// //     setIndex(selectedIndex);
// //   };

// //   return (
// //     <Carousel activeIndex={index} onSelect={handleSelect} className="topside">
// //       {/* First Slide */}
// //       <Carousel.Item style={styles.carouselItem}>
// //         <img
// //           src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741686903/secSchool_x1at1v.jpg"
// //           alt="Group of students"
// //           className="carousel-img"
// //           loading="lazy"
// //           style={styles.imgPic}
// //         />
// //         <div style={styles.overlay}></div> {/* Blurred overlay */}
// //         <Carousel.Caption className="carousel-caption">
// //           <h1>
// //             Tomorrow’s Leaders: Striving for Excellence
// //           </h1>
// //           {/* <p>Children posing for a picture.</p> */}
// //         </Carousel.Caption>
// //       </Carousel.Item>

// //       {/* Second Slide */}
// //       <Carousel.Item style={styles.carouselItem}>
// //         <img
// //           src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/PriSch_dkrrxa.jpg"
// //           alt="Football team"
// //           className="carousel-img"
// //           loading="lazy"
// //           style={styles.imgPic}
// //         />
// //         <div style={styles.overlay}></div> {/* Blurred overlay */}
// //         <Carousel.Caption className="carousel-caption">
// //           <h1>Young Minds, Big Dreams</h1>
// //           {/* <p>Team taking a group photograph.</p> */}
// //         </Carousel.Caption>
// //       </Carousel.Item>

// //       {/* Third Slide */}
// //       <Carousel.Item style={styles.carouselItem}>
// //         <img
// //           src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/newSec_va81np.jpg"
// //           alt="Primary student"
// //           className="carousel-img"
// //           loading="lazy"
// //           style={styles.imgPic}
// //         />
// //         <div style={styles.overlay}></div> {/* Blurred overlay */}
// //         <Carousel.Caption className="carousel-caption">
// //           <h1>Ambition, Excellence, Success: The School Spirit</h1>
// //           {/* <p>Excited for a new school day!</p> */}
// //         </Carousel.Caption>
// //       </Carousel.Item>
// //     </Carousel>
// //   );
// // }

// // export default Courosel;


// // import React from 'react';
// // import { Carousel } from 'react-responsive-carousel';
// // import 'react-responsive-carousel/lib/styles/carousel.min.css';
// // import { Box } from '@mui/material';

// // const HomeCarousel = () => {
// //   return (
// //     <Box 
// //       sx={{ 
// //         width: '100%', 
// //         height: { xs: 200, sm: 300, md: 400, lg: 500 },
// //         overflow: 'hidden',
// //         marginTop: '50px',
// //         position: 'relative'
// //       }}
// //     >
// //       <Carousel 
// //         showArrows={true} 
// //         infiniteLoop={true} 
// //         autoPlay={true} 
// //         showThumbs={false} 
// //         showStatus={false} 
// //         dynamicHeight={false}
// //         transitionTime={700} // Smooth transition
// //       >
// //         <div style={{ position: 'relative' }}>
// //           <img 
// //             src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741686903/secSchool_x1at1v.jpg" 
// //             alt="Image 1" 
// //             style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
// //           />
// //           <p 
// //             style={{ 
// //               background: 'rgba(0, 0, 0, 0.6)', 
// //               color: 'white', 
// //               padding: '10px',
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               borderRadius: '5px',
// //               fontSize: '18px',
// //               fontWeight: 'bold',
// //               textAlign: 'center',
// //               display: 'flex',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               width: '80%',
// //               height: '50px' // Adjust if needed
// //             }}
// //           >
// //             Secondary School Campus
// //           </p>
// //         </div>

// //         <div style={{ position: 'relative' }}>
// //           <img 
// //             src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/PriSch_dkrrxa.jpg" 
// //             alt="Image 2" 
// //             style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
// //           />
// //           <p 
// //             style={{ 
// //               background: 'rgba(0, 0, 0, 0.6)', 
// //               color: 'white', 
// //               padding: '10px',
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               borderRadius: '5px',
// //               fontSize: '18px',
// //               fontWeight: 'bold',
// //               textAlign: 'center',
// //               display: 'flex',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               width: '80%',
// //               height: '50px'
// //             }}
// //           >
// //             Primary School Building
// //           </p>
// //         </div>

// //         <div style={{ position: 'relative' }}>
// //           <img 
// //             src="https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/newSec_va81np.jpg" 
// //             alt="Image 3" 
// //             style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
// //           />
// //           <p 
// //             style={{ 
// //               background: 'rgba(0, 0, 0, 0.6)', 
// //               color: 'white', 
// //               padding: '10px',
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               borderRadius: '5px',
// //               fontSize: '18px',
// //               fontWeight: 'bold',
// //               textAlign: 'center',
// //               display: 'flex',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               width: '80%',
// //               height: '50px'
// //             }}
// //           >
// //             Newly Built Secondary School
// //           </p>
// //         </div>
// //       </Carousel>
// //     </Box>
// //   );
// // };

// // export default HomeCarousel;

// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Box } from '@mui/material';

// const HomeCarousel = () => {
//   const styles = {
//     carouselItem: {
//       position: 'relative',
//     },
//     imgPic: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       objectPosition: 'center top',
//     },
//     overlay: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
//       backdropFilter: 'blur(1px)', // Soft background blur
//     },
//     caption: {
//       background: 'rgba(0, 0, 0, 0.6)',
//       color: 'white',
//       padding: '10px',
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       borderRadius: '5px',
//       fontSize: '18px',
//       fontWeight: 'bold',
//       textAlign: 'center',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '80%',
//       height: '50px',
//       zIndex: 2, // Ensures the text is above the overlay
//     },
//   };

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: { xs: 200, sm: 300, md: 400, lg: 500 },
//         overflow: 'hidden',
//         marginTop: '50px',
//         position: 'relative',
//       }}
//     >
//       <Carousel
//         showArrows={true}
//         infiniteLoop={true}
//         autoPlay={true}
//         showThumbs={false}
//         showStatus={false}
//         dynamicHeight={false}
//         transitionTime={700} // Smooth transition
//       >
//         {[
//           {
//             src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741686903/secSchool_x1at1v.jpg',
//             alt: 'Image 1',
//             caption: 'Tomorrow’s Leaders: Striving for Excellence',
//           },
//           {
//             src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/PriSch_dkrrxa.jpg',
//             alt: 'Image 2',
//             caption: 'Young Minds, Big Dreams',
//           },
//           {
//             src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/newSec_va81np.jpg',
//             alt: 'Image 3',
//             caption: 'Ambition, Excellence, Success: The School Spirit',
//           },
//         ].map((item, index) => (
//           <div key={index} style={styles.carouselItem}>
//             <img src={item.src} alt={item.alt} style={styles.imgPic} />
//             <div style={styles.overlay}></div>
//             <p style={styles.caption}>{item.caption}</p>
//           </div>
//         ))}
//       </Carousel>
//     </Box>
//   );
// };

// export default HomeCarousel;

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Typography } from '@mui/material';

const HomeCarousel = () => {
  const styles = {
    carouselItem: {
      position: 'relative',
    },
    imgPic: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
      backdropFilter: 'blur(1px)', // Soft background blur
    },
    caption: {
      // background: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      padding: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontFamily: 'italic',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: 'auto',
      zIndex: 2, // Ensures the text is above the overlay
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 200, sm: 300, md: 400, lg: 500 },
        overflow: 'hidden',
        marginTop: '50px',
        position: 'relative',
      }}
    >
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        transitionTime={700} // Smooth transition
        transitionTimeInterval={500}
      >
        {[
          {
            src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741686903/secSchool_x1at1v.jpg',
            alt: 'Image 1',
            caption: 'Tomorrow’s Leaders: Striving for Excellence',
          },
          {
            src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/PriSch_dkrrxa.jpg',
            alt: 'Image 2',
            caption: 'Young Minds, Big Dreams',
          },
          {
            src: 'https://res.cloudinary.com/djbtdlzrj/image/upload/v1741689022/newSec_va81np.jpg',
            alt: 'Image 3',
            caption: 'Ambition, Excellence, Success: The School Spirit',
          },
        ].map((item, index) => (
          <div key={index} style={styles.carouselItem}>
            <img src={item.src} alt={item.alt} style={styles.imgPic} />
            <div style={styles.overlay}></div>
            <Typography
              sx={{
                fontSize: { xs: '22px', sm: '30px', md: '40px', lg: '50px' },
                ...styles.caption,
              }}
            >
              {item.caption}
            </Typography>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomeCarousel;
