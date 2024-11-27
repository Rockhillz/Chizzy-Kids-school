import HrElement from "./HrElement"
import Cardtext from "../CardList/Cardtext"


const News = () => {
    const styles = {
        maiCont: {
            marginTop: "100px",
            padding: "20px 20px",
            height:"700px"
        },
        butoncont: {
            padding: "10px 20px",
            backgroundColor: "white",
            color: "white",
            border: "none",
            borderRadius: "20px",
            width: "150px",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: "darkBlue",
        }
    }
    return (
        <section className="container-fluid" style={{ backgroundColor: 'rgb(194, 194, 194)', marginTop:"200px"}}>
            <div style={styles.maiCont}>
                <h2 className=" text-center" style={{ color: "darkblue", marginTop: "70px" }}>WE KEEP YOU IN THE KNOW</h2>
                <HrElement />

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <Cardtext
                                Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                btntext={'know more'}
                            />
                        </div>

                        <div className="col-12 col-sm-4">
                            <Cardtext
                                Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                btntext={'know more'}
                            />
                        </div>

                        <div className="col-12 col-sm-4">
                            <Cardtext
                                Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                btntext={'know more'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center ">
                <button className='mt-5 mb-5' style={styles.butoncont}>Explore More</button>
            </div>

        </section>
    )
}

export default News