import { useNavigate } from "react-router-dom";
import Cardbox from "./Cardbox";
import HrElement from "../Home/HrElement";

const Carditem = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the about page
  const handleNavigate = () => {
    navigate("/about");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center" style={{ color: "darkBlue" }}>
        Quality Education For Your Children
      </h2>
      <HrElement />

      <div className="row d-flex justify-content-center mt-2">
        <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
          <Cardbox
            Image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlPomRG0rBJpXh4N90bdd6zuR6UFTNxc9Aw&s"
            }
            Title={"Other activities"}
            Cardtext={
              "Sporting Facilities: Our Sporting facilities are standard and we encourage students to show all skills and passion within."
            }
            btntext={"Read More"}
            linkout={() => handleNavigate()}
          />
        </div>

        <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
          <Cardbox
            Image={
              "https://www.ictworks.org/wp-content/uploads/2017/02/mobile_phones_education.jpg"
            }
            Title={"Passion for learning"}
            Cardtext={
              "We have an amazing group of passionate teaching and non-teaching staff who really love what they do."
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
              "Our environment is secured with visible presence of security personnels and equipment"
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