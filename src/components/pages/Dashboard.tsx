/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

import Sidebar from "../elements/Sidebar.tsx";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import isAuthenticated from "../../utils/isAuthenticated";
import { useEffect } from "react";

export default function Dashboard({}) {
    const location = useLocation();
    const event = location.state?.event;
    const navigate = useNavigate();

    useEffect(() => {
        if(!event){
            navigate('/event-selection');
        }
    
        if(!isAuthenticated()){
            navigate('/');
        }
    });

    return (
        <div className={`px-[24px] py-[29px] flex w-full h-full`}>
            { event && 
                <Sidebar active="home" event={event}></Sidebar>
            }
            <div className="flex-1 pt-[20px] pr-[42px] flex-col flex">
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="hover:scale-105 duration-200 cursor-pointer w-[36px] h-[36px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        <div className="text-[24px] font-medium mb-[10px]">Accueil</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-[15px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="text" placeholder="Search something ..." className="mr-[10px]"/>
                        <div className="w-[36px] h-[36px] border border-black rounded-[9px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="text-[#9DAAB6]">Gérez votre évenement parfaitement </div>

                <div className="w-full h-1/2 bg-[#7866d7] bg-opacity-[0.08] rounded-[12px] mt-[46px]">
                    <div className="h-3/5 bg-[#ccc3f3] rounded-t-[12px] flex items-center justify-center">
                        <div className="text-4xl">TUTO</div>
                    </div>
                    <div className="px-[40px]">
                        <div className="font-medium mt-[25px] mb-[25px]">
                            Découvrez notre outil avec ce tuto !
                        </div>
                        <div className="">
                            Découvrez toutes les capacités et les nouveautés du créateur de Smart tickets FOLD. Cela pourra vous êtres utile !
                        </div>
                    </div>
                </div>
                <div className="mt-[25px] flex gap-2 flex-1">
                    <div className="w-1/2 bg-[#8E71AC] h-full rounded-[29px] px-[25px] py-[30px] flex flex-col">
                        <div className="text-white">
                            Revenus de la billeterie
                        </div>
                        <div className="text-white flex-1 items-center flex text-[40px]">
                            520,434 €
                        </div>
                    </div>
                    <div className="w-1/2 bg-[#8E71AC] h-full rounded-[29px] px-[25px] py-[30px]">
                        <div className="text-white">
                            Nombre de SmartTicket scannés
                        </div>
                        <div className="text-white flex-1 text-[40px] flex flex-col">
                            439
                            <div className="flex-1">CHART HERE</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-[20%] rounded-[36px] flex flex-col">
                <div className="h-1/4 flex justify-center flex-col text-center">
                    <div className="text-center mb-[15px]">
                        <img src="/pp.png" className="w-[75px] mx-auto" />
                    </div>
                    <div className="text-[20px] mb-[7px]">Roland Garros</div>
                    <div className="text-[16px] mb-[10px] text-[#9DAAB6]">eric@rolandgarros.com</div>
                    <div className="text-center">
                        <button className="w-[107px] h-[35px] text-white bg-[#8E71AC] rounded-[8px]">
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div className="bg-[#7866d7] bg-opacity-[14%] rounded-[29px] h-full flex-1 mt-[25px] flex flex-col">
                    <div className="text-red-600 font-semibold flex uppercase justify-center items-center pt-[20px]">
                        Visuel en cours 
                        <span className="text-[25px] pt-[2px]">&#x2022;</span>
                    </div>
                    <div className="flex-1">

                    </div>
                    <div className="h-1/6 text-center">
                        <button className="bg-[#8E71AC] text-white w-[70%] h-[42px] rounded-[8px]">
                            Modifier visuels
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}