

const HrElement = () => {
    const styles = {
        Hrcontainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop:"-10px"
        }
    }
    return (

        <div style={styles.Hrcontainer}>
            <hr style={{ width: '80px', border: '1px solid black' }} />
            <hr style={{ width: '40px', border: '1px solid black', marginTop: '-13px' }} />
        </div>

    )
}

export default HrElement