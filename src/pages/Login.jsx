import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

export default function Login() {
const [formData,setFormData] = useState({email:"",password:""});

const handleChange = (e) =>{

    setFormData({formData,[e.target.name]:e.target.value})

}
const handleSubmit = (e) =>{

     e.preventDefault();
}
  return (
    <div className="container">
      <div className="inner-container">
        <div className="inner-container-inputs">
          <h1>Login to continue</h1>
          <p>Welcome back to ChatMate</p>

          <form className="login-inputs" onSubmit={handleSubmit}>
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
            <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>

          <div className="reset-password">
            <span>
              Don&apos;t have an account? <Link className="link" to="/signup">Signup</Link>
            </span>
            <span>
              Reset your password? <Link className="link" to="/reset-password">Reset</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}