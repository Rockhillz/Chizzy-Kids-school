import { useNavigate } from "react-router-dom";
import Cardbox from "./Cardbox";
import HrElement from "../Home/HrElement";
import './imageCss.css'


const Carditem = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the about page
  const handleNavigate = () => {
    navigate("/aboutus");
  };
  

  return (
    <div className="container mt-4">
      <h2 className="text-center fontColor">
        Quality Education For Your Children
      </h2>
      <HrElement />

      <div className="row d-flex justify-content-center mt-2">
        {/* <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
          <div className="custom-card-image-scope">
            <Cardbox
              Image={
                "./chizzyKidsLogo-bgR.png"
              }
              Title={"School Profile"}
              Cardtext={
                "Chizzy Kids Group of Schools, established in 2010 in Lagos, is dedicated to excellence in learning and character, offering quality education and holistic development for every child."
              }
              btntext={"Read More"}
              linkout={() => handleNavigate()}
            />
          </div>
        </div> */}

        <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
          <Cardbox
            Image={
              "https://res.cloudinary.com/djbtdlzrj/image/upload/v1748080097/noob_qzburu.jpg"
            }
            Title={"Passionate Staff"}
            Cardtext={
              "Our dedicated team of passionate teaching and non-teaching staff truly loves what they do, creating a supportive and inspiring environment for everyone."
            }
            btntext={"Read More"}
            linkout={() => handleNavigate()}
          />
        </div>

        <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
          <Cardbox
            Image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQ6_l1PUzTwEMTEn47dC2eVpxSX_kG7HPOg&s"
            }
            Title={"Security"}
            Cardtext={
              "Our environment is designed with safety and peace of mind as top priorities. Robust safety protocols and proactive measures are in place to ensure a secure and protected atmosphere at all times."
            }
            btntext={"Read More"}
            linkout={() => handleNavigate()}
          />
        </div>
      </div>
    </div>
  );
};

export default Carditem;
