import HrElement from "./HrElement"
import Cardtext from "../CardList/Cardtext"


const News = () => {
    const styles = {

        butoncont: {
            padding: "10px 20px",
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
        <section className="container-fluid " style={{ backgroundColor: '', marginTop: "0px", height: 'auto' }}>
            <div>
                <h2 className=" text-center" style={{ color: "darkblue", marginTop: "30px" }}>WE KEEP YOU IN THE KNOW</h2>
                <HrElement />

                <div className="container">
                        <div className="row d-flex justify-content-center">
                        <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
                                <Cardtext
                                    Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                    Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                    btntext={'know more'}
                                />
                            </div>
                            

                            <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
                                <Cardtext
                                    Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                    Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                    btntext={'know more'}
                                />
                            </div>

                            <div className="col-sm-4 col-12 d-flex justify-content-center mb-4">
                                <Cardtext
                                    Title={'THIRD TERM 2023/2024 NEWSLETTER TO PARENTS/GUARDIAN'}
                                    Cardtext={'Chizzy kids schools, LAGOS THIRD TERM NEWSLETTER TO PARENTS/GUARDIANS 26th JULY, 2024   Protocol We are thankful to God Almighty for bringing us to the end of Third Term and the end of 2023/2024 Academic Session. He has helped us to...'}
                                    btntext={'know more'}
                                />
                            </div>
                        </div>

                </div>
            </div>


        </section>
    )
}

export default News