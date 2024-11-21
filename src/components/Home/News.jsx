import HrElement from "./HrElement"


const News = () => {
    const styles = {
        maiCont:{
            marginTop:"100px",
            padding:"20px 20px"

        }
    }
    return (
        <section className="container-fluid" style={{ backgroundColor: 'rgb(194, 194, 194)' }}>
            <div style={styles.maiCont}>
                <h2 className=" text-center" style={{ color: "darkblue", marginTop: "50px" }}>WE KEEP YOU IN THE KNOW</h2>
                <HrElement />
            </div>
        </section>
    )
}

export default News