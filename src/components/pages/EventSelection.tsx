import Slider from "react-slick";
import { HashLink as Link } from 'react-router-hash-link';
import { useEffect, useState } from "react"

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
                return (<>{event}</>)
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
                            return (<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                                <Link to={{pathName: `/dashboard`, state: {address: event}}}>
                                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                </Link>
                                <div className="p-5">
                                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                        Read more
                                        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </div>
                            </div>)
                        })}
                        
                    </Slider>
                </div>
            </div>
        </div>
    )
}