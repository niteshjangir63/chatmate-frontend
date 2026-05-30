import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

export default function Reset() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtp, setIsOtp] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container">
            <div className="inner-container">
                <div className="inner-container-inputs">
                    <h3>{!isOtp ? "Reset Password" : " Verify OTP"}</h3>
                    <br />


                    {!isOtp && <form className="login-inputs" onSubmit={handleChange}>
                        <input type="email" value={email} onChange={handleChange} placeholder="Email" required />
                        <button type="submit">Send OTP</button>
                    </form>}
                    {isOtp &&
                        <form className="login-inputs" onSubmit={handleChange}>
                            <input type="text" value={otp} onChange={handleChange} placeholder="One time password" required />
                            <button type="submit">Verify OTP</button>
                        </form>}


                    <div className="reset-password">
                        <span>
                            Back to Login <Link className="link" to="/login">Login</Link>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
}