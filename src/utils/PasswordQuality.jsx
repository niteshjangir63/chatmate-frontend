import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
export default function PasswordQuality({password}){

    return (

        <>

        {password && (
                            <div className="password-checks">
                                <span className={password.length >= 8 ? "valid" : "invalid"}>
                                    {password.length >= 8 ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <IoCloseCircle />
                                    )}
                                    Minimum 8 characters
                                </span>

                                <span className={/[A-Z]/.test(password) ? "valid" : "invalid"}>
                                    {/[A-Z]/.test(password) ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <IoCloseCircle />
                                    )}
                                    One uppercase letter
                                </span>

                                <span className={/\d/.test(password) ? "valid" : "invalid"}>
                                    {/\d/.test(password) ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <IoCloseCircle />
                                    )}
                                    One number
                                </span>

                                <span
                                    className={/[#@$!%*?&]/.test(password) ? "valid" : "invalid"}
                                >
                                    {/[#@$!%*?&]/.test(password) ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <IoCloseCircle />
                                    )}
                                    One special character
                                </span>
                            </div>
                        )}
        
        </>
    )
}