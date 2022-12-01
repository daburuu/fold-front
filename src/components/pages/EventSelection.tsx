import Slider from "react-slick";
import { useEffect, useState } from "react"
import { HashLink as Link } from 'react-router-hash-link';

export default function FoldEventSelection({}){
    const [appearing, setAppearing] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setAppearing(true);
    });

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        loop: false,
        centerPadding: '20%',
    };

    useEffect(() => {
        console.log(localStorage.getItem("userAddress"));
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
            const datas = await response.json();
            if(datas.error){
                // @TODO: HANDLE ERROR
            }
            console.log(datas);
            setEvents(datas.datas);
        })
    }, [])

    return(
        <div className={`${appearing ? "opacity-100" : "opacity-0"} w-full h-full bg-[#200E32] text-white pt-[70px] transition-opacity duration-500`}>
            {events.map((event) => {
                // return (<>{event}</>)
            })}
            <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-[90px]">
                <img src="/logo.png" />
                <img src="/pp.png" className="rounded-full h-[75px]"/>
            </div>
            <div>
                <div className="flex justify-between pl-[120px] pr-[120px] mb-[60px]">
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
                <div className="pr-6 pl-6">
                    <Slider {...settings}>
                        {events.map(event => {
                            return (
                                <a href="#" className="group relative block bg-black">
                                    <img
                                        alt="Developer"
                                        src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-8">
                                        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                        Developer
                                        </p>

                                        <p className="text-2xl font-bold text-white">Tony Wayne</p>

                                        <div className="mt-64">
                                        <div
                                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <p className="text-sm text-white">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                                            perferendis hic asperiores quibusdam quidem voluptates doloremque
                                            reiciendis nostrum harum. Repudiandae?
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                        
                    </Slider>
                </div>
            </div>
        </div>
    )
}