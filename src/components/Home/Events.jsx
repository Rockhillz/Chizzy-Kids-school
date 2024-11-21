import { useNavigate } from "react-router-dom"
import Cardbox from "../CardList/Cardbox"


const Events = () => {
    const navigate = useNavigate();

    //function to take us to event
    const handleClick = () => {
        navigate("/events")
    }
    return (
        <div className="container">


            <h1 style={{fontWeight:"700", textAlign:'center', color:'darkblue', marginTop:'40px'}}>Our Events</h1>

            <div className="row mt-5">
                <div className="col-12 col-sm-4">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-653.jpg'}
                    Title={'CAPITAL PROJECT'}
                    Cardtext={'Three Projects from the government appropriation for the budget year have been completely executed. The others are yet to be cash-backed an'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>

                <div className="col-12 col-sm-4">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-838.JPG'}
                    Title={"PKC's PROFILE"}
                    Cardtext={'PROFILE OF OUR PRINCIPAL MR. AGADA ALI ANDREW PKC25 Mr. Agada Ali Andrew was born on the 25th of March, 1965 to the family of'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>

                <div className="col-12 col-sm-4">
                    <Cardbox Image={'https://res.cloudinary.com/myskoolp/image/upload/b_auto,c_pad,h_400,w_600/v1/school_website/events/kingscollegelagos/event-572.jpg'}
                    Title={'OPEN DAY'}
                    Cardtext={'The Open Day for Second Term comes up on Tuesday, March 10th at the Main Campus. Parents and students of SS1 To SS3 are expected'}
                    btntext={'know more'}
                    linkout={() => handleClick()}
                />
                </div>
                
            </div>

        </div>
    )
}

export default Events