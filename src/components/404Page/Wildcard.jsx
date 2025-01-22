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
            
            <p>Page not found</p>
        </div>
    );
}

export default Wildcard;
