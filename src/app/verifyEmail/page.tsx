"use client";

import axios from "axios";
import Link  from "next/link";
import { useState , useEffect } from 'react'

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error,setError] = useState()

    const verifyMail = ()=> {
        try {
            axios.post('/api/users/verifymail',{ token })
            setVerified(true)

            
        } catch (error : any) {
            console.log(error.message)   
        }
    }

    useEffect(()=> {
            const urlToken = window.location.search.split('=')[1]
            setToken(urlToken || "")
    },[token])

    useEffect(()=> {
        if(token.length > 0 )
            verifyMail();
    },[])

    return (
<>
        <div>
            <h1>Verify Mail</h1>
            <h2>{token ? `${token}` : "No Token"}</h2>

            {verified &&
                <div>
                 <h1>Email Verified</h1>
                 <Link href="/">Login</Link>
                </div>
            }

            {error &&
                <h2>Error</h2>

            }

            
        </div>
        </>
    )   

}