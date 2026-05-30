import { useContext,createContext,useState, useEffect } from "react";
import { itsMe } from "../api/auth";

const AuthContext = createContext();

export default function AuthProvider({children}){
    const [authUser,setAuthUser] = useState(null);

    useEffect(()=>{

        const verifyUser = async() =>{

            const res = await itsMe();
            if(res?.data?.user){

                setAuthUser(res?.data?.user);
            }

        } 
        verifyUser();
    },[]);

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}

    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);