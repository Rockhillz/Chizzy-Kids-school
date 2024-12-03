import { Link } from "react-router-dom"

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#0a4275"
    }
  }
  return (

        <footer className="text-center text-white" >

          <div className="text-center p-3" style={styles.footer}>
            <p>©2024 Chizzy Kids. All Rights Reserved.</p>
          </div>

        </footer>

  )
}

export default Footer