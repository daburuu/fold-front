import Sidebar from '../../elements/Sidebar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function FoldInvitations({}){
    const { state } = useLocation();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    console.log(state);

    useEffect(() => {
        if (!state?.event) {
            navigate('/event-selection');
        } else {
            setEvent(state.event);
        }
    }, []);
    // const { event } = state;

    
    return (
        <div className={`px-[24px] py-[29px] flex w-full h-full`}>
            {event && 
                <Sidebar active="invitations" event={state.event} />
            }
             <div className="flex-1 pt-[20px] pr-[42px] flex-col flex">
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="hover:scale-105 duration-200 cursor-pointer w-[36px] h-[36px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        <div className="text-[24px] font-medium mb-[10px]">Invitations</div>
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
                <div className="text-[#9DAAB6]">Gérez votre invités plus simplement</div>

                <div className="w-full h-full flex flex-col mt-24">
                    <div className="w-3/4 relative">
                        <input className="border border-[#6A6A6A] w-full h-[46px] rounded-[16px]" />
                        <div className="absolute right-[20px] top-[50%] -translate-y-[50%]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#92929D" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-2/3 flex justify-between mt-4 pl-8">
                        <div className="flex items-center">
                            <div className="w-[9px] h-[9px] bg-[#FBBB00] rounded-full mr-1"></div>
                            <span className="text-[14px] font-medium">Billet en attente de scan</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[9px] h-[9px] bg-[#82C43C] rounded-full mr-1"></div>
                            <span className="text-[14px] font-medium">Billet scanné</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-[9px] h-[9px] bg-[#F31717] rounded-full mr-1"></div>
                            <span className="text-[14px] font-medium">Billet annulé</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-[14px] font-medium">Tout sélectionner</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <table className="w-4/5 mt-8 h-full">
                            <thead className="text-[20px]">
                                <tr>
                                    <th className="pb-8">Adresse mail</th>
                                    <th className="pb-8">Catégorie</th>
                                    <th className="pb-8">Status</th>
                                    <th className="pb-8">Envoi</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td className="h-[40px]">nelsonherida@gmail.com</td>
                                    <td className="h-[40px]">VIP</td>
                                    <td className="h-[40px]"><div className="inline-block w-[9px] h-[9px] bg-[#FBBB00] rounded-full mr-1"></div></td>
                                    <td className="h-[40px]">27/05</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-4/5 bg-[#D8D8D8] flex h-[43px] items-center justify-between rounded-[14px] pl-[35px]">
                        <div>
                            <input className="bg-[#D8D8D8] placeholder:text-black pl-2" placeholder="Adresse e-mail" />
                        </div>
                        <div>
                            <input className="bg-[#D8D8D8] placeholder:text-black pl-2" placeholder="Sélection de la catégorie" />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>

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
    )
}