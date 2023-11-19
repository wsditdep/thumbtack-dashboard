"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [userVal, setUserval] = useState({
        username: "",
        password: ""
    });

    const onchageHandler = (e) => {
        setUserval({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {        
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                username: userVal.username,
                password: userVal.password,
                redirect: false,
            });
            
            if (res.error) {
                setLoading(false);
                return toast.error("Invalid credentials!");
            }
            
            setLoading(false);
            router.replace("/dashboard/landing/index");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            <section className="admin-auth-section">
                <div className="auth-page-wrapper">
                    <h1>Sign in</h1>
                    <p>Fill in the fields below to sign into your account</p>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <div className="form-group">
                            <label><i className="fa fa-user"></i>Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={userVal.username}
                                onChange={(e) => onchageHandler(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label><i className="fa fa-key"></i>Password</label>
                            <input
                                type="password"
                                autoComplete="on"
                                placeholder="Enter password"
                                name="password"
                                value={userVal.password}
                                onChange={(e) => onchageHandler(e)}
                            />
                        </div>
                        <div className="form-group form-group-checkbox">
                            <input
                                type="checkbox"
                            />
                            <p>Keep me <span>logged in!</span></p>
                        </div>
                        <button onClick={() => submitHandler()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "Sign In"}</button>
                    </form>
                </div>
            </section >
        </>
    )
}