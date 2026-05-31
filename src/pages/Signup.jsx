import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { signup } from "../api/auth";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom"
import PasswordQuality from "../utils/PasswordQuality";
import { useToast } from "../context/ToastContext";

export default function Signup() {
    const {showToast} = useToast();

    const navigate = useNavigate();
    const [isStrong, setIsStrong] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await signup(formData);

            if (res?.data?.user) {

                setAuthUser(res?.data?.user);
                showToast(res.data.message,"success");
                navigate("/")
            }
        }
        catch (e) {
            console.log(e);
            showToast(e.response.data.message,"error");
        }
        finally {
            setLoading(false)
        }


    }

    const isDisabled =
        !formData.email?.trim() ||
        !formData.password?.trim();


    const password = formData.password;

    const isInclude =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[#@$!%*?&]/.test(password);

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


                        <button type="submit" disabled={isDisabled}>{loading ? <Loader /> : "Signup to Chatmate"}</button>
                    </form>

                    <PasswordQuality password={formData.password} />

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