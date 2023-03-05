import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HashLink as Link } from 'react-router-hash-link';
import { auth } from "../../utils/firebase.js";
import isAuthenticated from "../../utils/isAuthenticated.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FoldEventSelection({}){
    const [appearing, setAppearing] = useState(false);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        loop: false,
        centerPadding: '20%',
    };

    async function handleClick(event){
        navigate('/dashboard', {state: {event: event}});
    }

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/');
        }
        setAppearing(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getEvents`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: localStorage.getItem("userAddress"),
            })
        }).then(async (response) => {
            const {error, datas} = await response.json();
            if(error){
                toast.error("Error", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            var events = [];

            datas.forEach((event: any) => {
                const [entry]: any = Object.entries(event);
                console.log(entry);
                events.push({
                    id: entry[0],
                    address: entry[1].address,
                    image: `${process.env.REACT_APP_ASSETS_URL}/${localStorage.getItem("userAddress")}/${entry[0]}/0/${entry[1].image}`,
                    name: entry[1].name,
                    location: entry[1].location
                });
            });

            setEvents(events);
        })
    }, []);


    return(
        <div className={`${appearing ? "opacity-100" : "opacity-0"} w-full h-full min-h-[100vh] bg-[#11021A] text-white pt-5 md:pt-[70px] transition-opacity duration-500`}>
            <ToastContainer theme="dark" />
            <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-5">
                <img src="/logo.png" />
                <img src="/pp.png" className="rounded-full h-[75px]"/>
            </div>
            <div>
                <div className="flex justify-between px-2 md:px-[120px] mb-[60px]">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-6 h-6 vertical-center opacity-50 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input className="inline bg-transparent text-[#92929D] text-[20px]" placeholder="Search Something..." type="text"></input>
                    </div>

                    <Link to="/create-event" className="text-white flex items-center">
                        <span className="text-white text-[24px] mr-4 font-bold">Créer un nouvel événement</span>
                        <button className="bg-[#8E71AC] text-white w-[58px] h-[54px] rounded-2xl text-[36px] flex items-center justify-center mr-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </Link>

                </div>
                <div className="px-24">
                    <Slider {...settings}>
                        {events.map(event => {
                            return (
                                <div className="cursor-pointer group relative block bg-black rounded-[21px] overflow-hidden" onClick={() => {handleClick(event)}}>
                                    <img
                                        alt="Developer"
                                        src={event.image}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-8 h-full">
                                        <div className="h-2/5 w-full absolute bottom-0 left-0">
                                            <p className="text-sm font-medium uppercase tracking-widest text-[#8E71AC]">
                                                {event.location ? event.location : "No location"}
                                            </p>
                                        </div>
                                        

                                        <p className="text-2xl font-bold text-white uppercase">{event.name}</p>

                                        <div className="mt-64">
                                        <div
                                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <p className="text-sm text-white">
                                                Maybe we can add an event description there or just some basic informations about the current hovered event
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </Slider>
                </div>
            </div>
        </div>
    )
}