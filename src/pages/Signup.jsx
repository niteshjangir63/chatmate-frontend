import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

export default function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className="container">
            <div className="inner-container">
                <div className="inner-container-inputs">
                    <h1>Signup to ChatMate</h1>
                    <p>Welcome to ChatMate</p>

                    <form className="login-inputs" onSubmit={handleSubmit}>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" required />
                        <input name="email" value={formData.email} type="email" onChange={handleChange} placeholder="Email" required />
                        <input name="password" value={formData.password} type="password" onChange={handleChange} placeholder="Password" required />
                        <button type="submit">Signup to Chatmate</button>
                    </form>

                    <div className="reset-password">
                        <span>
                            Already have an account? <Link className="link" to="/login">Login</Link>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
}