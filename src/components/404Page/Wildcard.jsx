import { useEffect } from 'react';
import './wildcard.css'
import { useNavigate } from 'react-router-dom';

function Wildcard() {
    const navigate = useNavigate()
    //fumction to return to previous page in 6 seconds
    useEffect(()=>{
        setTimeout(()=>{
            navigate(-1) //go back to previous page
        },6000);
    })
    return (
        <div className='wildcard-container'>
            <h1>404</h1>
            {/* <img src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="error image" style={{width:"100%", height:"100%", marginTop:"180px"}}/> */}
            <p>Page not found</p>
        </div>
    );
}

export default Wildcard;
