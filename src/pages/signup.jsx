
import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
// const navigate = useNavigate();
import "./Signup.css" 


function Signup(){
    let [formState , setFormState] = new useState({username : "" , email : "" , password : ""});
    let [error , setError] = new useState("");
    function handleFormState(event){
        setFormState((currState) => {
            currState[event.target.id] = event.target.value;
            return {...currState};
        });
        setError("");
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: await JSON.stringify({ username : formState.username , email : formState.email , password : formState.password }),
        });

        setFormState({username : "" , email : "" , password : ""});
        const data = await res.json();
        if(!res.ok){
            setError(data.message);
        }
    }
    return (
        <div className="container">
            <div className="form-container">
                <h1 className="heading">Movie<span>Book</span></h1>
                <form>
                    <div>
                        <input type = "text" id = "username" className="form-input" placeholder = "Username" value = {formState.username} onChange={handleFormState}></input>
                    </div>
                    <div>
                        <input type = "email" id = "email" placeholder = "Email" className = "form-input" value = {formState.email} onChange={handleFormState}></input>
                    </div>
                    <div>
                        <input type = "password" id ="password" className="form-input" placeholder = "Password" value = {formState.password} onChange={handleFormState}></input>
                    </div>
                    {!(error === "") && <p className="error">! {error}</p>}
                    <button onClick={handleFormSubmit} className="form-button">SIGN UP</button>
                    <br></br>
                </form>
                <p>Already have an account? <Link to="/login">login!</Link></p>
            </div>
        </div>
        
        
    )
}

export default Signup