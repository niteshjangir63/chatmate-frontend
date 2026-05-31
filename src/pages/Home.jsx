import { useState } from "react"
import ChatCard from "../components/ChatCard"
import "./Home.css"
import { logout } from "../api/auth";
import Loader from "../loader/Loader"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext";

export default function Home() {
    const navigate = useNavigate()
    const { showToast } = useToast();

    const { authUser, setAuthUser } = useAuth();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const chat = {
        name: "Nitesh",
        message: message,
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setChats(prev => [...prev, chat]);
        setMessage("");
    }

    const handleLogout = async () => {

        try {
            setLoading(true);
            const res = await logout();
            if (res?.data?.success) {
                setAuthUser(null)
                showToast(res.data.message, "success");
                navigate("/login")
            }
        }
        catch (e) {
            showToast(e.response.data.message, "error");
            console.log(e);
        }
        finally {
            setLoading(false);
        }

    }

    const isDisabled = !message.trim();
    return (

        <div className="container">
            <div className="container-glass">
                <div className="container-left">

                    <div className="top-nav-bar">

                        <h3>ChatMate</h3>
                        <button className="bellIcon"><i className="fa-solid fa-bell"></i></button>
                        <button><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className="logoutBtn" onClick={handleLogout}
                        >
                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    Sign Out
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </>
                            )}</button>
                    </div>
                    <div className="searchbar">

                        <input type="text" placeholder="Search..." />
                    </div>

                    <div className="chat-card-container">
                        <ChatCard
                            id="1"
                            profile="https://i.pravatar.cc/150?img=1"
                            name="Rahul"
                            lastChat="Hey, are you free today?"
                            time="12:00 AM"
                            isRead={true}
                        />
                    </div>

                </div>
                <div className="container-right">
                    <div className="chat-box">
                        <div className="chat-header">
                            <img src="https://i.pravatar.cc/150?img=1" alt="profile" />
                            <div>
                                <h4>Rahul</h4>
                                <span>Online</span>
                            </div>
                        </div>

                        <div className="messages">
                            <div className="message received">Hey, are you free today?</div>
                            <div className="message sent">Yes, tell me</div>
                            <div className="message received">Need help with project</div>
                            {chats.map(chat => {
                                return <div className="message sent">{chat.message}</div>
                            })}
                        </div>

                        <form className="chat-input" onSubmit={handleSubmit}>
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                            <button className="submitBtn" type="submit" disabled={isDisabled}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}