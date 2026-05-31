import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import Loader from "../loader/Loader";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthProvider"
import {useNavigate} from "react-router-dom"
import { useToast } from "../context/ToastContext";

export default function Login() {
    const {showToast} = useToast();
    const navigate =  useNavigate();
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);

            const res = await login(formData);
            if (res?.data?.user) {
                setAuthUser(res?.data?.user);
                showToast(res.data.message,"success");
                navigate("/")
            }
            
        } catch (e) {
            
            showToast(e.response.data.message,"error");
            console.log(e);
        }
        finally {
            setLoading(false);
        }

    }

    console.log("authUser -->",authUser)


    const isDisabled =
        !formData.email?.trim() ||
        !formData.password?.trim();
    return (
        <div className="container">
            <div className="inner-container">
                <div className="inner-container-inputs">
                    <h1>Login to continue</h1>
                    <p>Welcome back to ChatMate</p>

                    <form className="login-inputs" onSubmit={handleSubmit}>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
                        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
                        <button type="submit" disabled={isDisabled}>{loading ? <Loader /> : "Login"}</button>
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