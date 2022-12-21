import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../../utils/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import ReCAPTCHA from "react-google-recaptcha";
import isAuthenticated from "../../../utils/isAuthenticated.js";

export default function Login({}){
    const [visibility, setVisibility] = useState(false);
    const [switching, setSwitching] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();
    
    console.log(isAuthenticated());
    async function handleSubmit(event){
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const login = await logInWithEmailAndPassword(email, password);

        if(!login.error){
            // let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserAddress`, {
            //     method: 'POST'
            // });
            // response = await response.json();
            // if(response['error']){
            //     // @TODO: handle error
            // }

            localStorage.setItem("userAddress", login.datas._tokenResponse.refreshToken);

            setSwitching(true);
            setTimeout(() => {
                navigate('/event-selection');
            }, 500);
        } else {
            setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
            }, 2000);
        }
    }

    function onChange(value) {
        console.log("Captcha value:", value);
    }
    
    return (
        <div className={`flex h-full ${switching ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="w-3/5">
                    <div className="text-[40px] text-[#33333]">
                        Login in to FOLD
                    </div>
                    <div className="text-[#888888] mt-[16px]">
                        See your growth finance here and let see your profit you get now
                    </div>
                    <form onSubmit={handleSubmit} className="mt-[40px]">
                        {/* <label className="text-xs text-[#020614]" htmlFor="fullName">
                            Full name
                        </label>
                        <input type="text" placeholder="John DOE"/> */}
                        <label className="text-xs text-[#020614] block mb-[12px] opacity-50" htmlFor="email">
                            Email Address
                        </label>
                        <input ref={emailRef} type="text" name="email" className="border border-[#0F0D23] w-full rounded-md h-[48px] px-[16px] py-[14px] mb-[40px]" placeholder="john.doe@gmail.com" />
                        <div className="relative mb-[25px]">
                            <label className="text-xs text-[#020614] block mb-[12px] opacity-50" htmlFor="password">
                                Password
                            </label>
                            <input ref={passwordRef} name="password" type={`${visibility ? "text" : "password"}`} className="border border-[#0F0D23] w-full rounded-md h-[48px] px-[16px] py-[14px]" />
                            <div className="absolute right-[10px] bottom-[11px] cursor-pointer" onClick={() => {setVisibility(!visibility) }}>
                                {visibility && 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                }

                                {!visibility &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-[40px]">
                            <div className="flex items-center">
                                <input type="checkbox" className="w-[20px] h-5" />
                                <span className="ml-[14px] text-[#999999] text-xs">Remember me</span>
                            </div>
                            <Link className="text-[#7866D7] text-xs underline decoration-[#7866D7]" to="/forgot-password">Forgot password ?</Link>
                        </div>
                        {/* <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={onChange}
                        /> */}
                        <div className="relative">
                            {loginError && 
                                <div className="text-red-600 text-center absolute top-[-25px] left-[50%] -translate-x-1/2">
                                    Vérifiez votre email / mot de passe
                                </div>
                            }
                            <button type="submit" className="w-full bg-[#7866D7] text-white h-[56px] rounded-md">Login</button>
                            <div className="text-[#888888] text-center mt-2">No account ? Click <Link to="/register" className="underline text-[#7866D7]">here</Link></div>
                        </div>
                    </form>
                    <div className="mt-30px relative text-center mt-[30px]">
                        <span className="bg-[#FFFFFF] relative z-10 px-4">Or</span>
                        <div className="w-full h-[1px] bg-[#F2F2F2] block mt-2 mb-4 top-[50%]"></div>
                        <div className="flex gap-4">
                            <div className="bg-[#FAFAFA] text-[#888888] font-semibold flex items-center justify-center h-[56px] w-1/2">
                                <img className="mr-2" src="/icons/btnSigninwithGoogle.svg" /><span>Google</span>
                            </div>
                            <div className="bg-[#FAFAFA] text-[#888888] font-semibold flex items-center justify-center h-[56px] w-1/2">
                                <img className="mr-2" src="/icons/btnSigninwithFb.svg" /><span>Facebook</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-1/2 h-full bg-[#200E32] flex flex-col items-center">
                <div className="w-full flex justify-center pt-[106px]">
                    <img src={"/logo.png"} className="w-[225px]"/> 
                    {/* FONT FOR LOGO: ARIMO */}
                </div>
                <div className="flex justify-center items-center flex-col">
                    <img src={"/peace.png"} className="w-full"/>
                    <div className="text-white text-[32px] w-2/5 text-center">
                        Bienvenue dans le créateur de SmartTicket FOLD 
                    </div>
                </div>

            </div>
        </div>
    )
    
}