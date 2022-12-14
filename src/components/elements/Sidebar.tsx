import { Link } from 'react-router-dom';

export default function Sidebar({active}){
    return(
        <div className={`bg-[#200E32] w-[15%] rounded-[36px] mr-[42px] flex flex-col pl-[25px]`}>
            <img src="/logo.png" className="w-full pt-[28px]" />
            <div className="h-[70%]">
                <ul className="text-white font-medium h-full flex justify-between flex-col">
                    <li className="">
                        <a className={`flex items-center ${active == "home" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "home" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Home.png" />
                            </div>
                            <span className="inline-block">Accueil</span>
                        </a>
                    </li>
                    <li>
                        <a className={`opacity-40 flex items-center ${active == "design" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "design" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Brush.png" />
                            </div>
                            <span className="inline-block">Design</span>
                        </a>
                    </li>
                    <li>
                        <a className={`opacity-40  flex items-center ${active == "distribution" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "distribution" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/People.png" />
                            </div>
                            <span className="inline-block">Distribution</span>
                        </a>
                    </li>
                    <li>
                        <a className={`flex items-center ${active == "participants" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "participants" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Notification-Status.png" />
                            </div>
                            <span className="inline-block">Participants</span>
                        </a>
                    </li>
                    <li>
                        <a className={`flex items-center ${active == "invitations" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "invitations" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Star.png" />
                            </div>
                            <span className="inline-block">Invitations</span>
                        </a>
                    </li>
                    <li>
                        <a className={`opacity-40  flex items-center ${active == "analytics" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "analytics" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Money-Receive.png" />
                            </div>
                            <span className="inline-block">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a className={`opacity-40 flex items-center ${active == "secondary-market" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "secondary-market" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Market.png" />
                            </div>
                            <span className="inline-block">Marché secondaire</span>
                        </a>
                    </li>
                    <li>
                        <Link className={`flex items-center`} to="/event-selection">
                            <div className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Repeat.png" />
                            </div>
                            <span className="inline-block">Changer d'événement</span>
                        </Link>
                    </li>
                    <li>
                        <a className={`flex items-center ${active == "settings" ? "font-bold" : ""}`} href="">
                            <div className={`${active == "settings" ? "bg-[#8E71AC]" : ""} inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Cog.png" />
                            </div>
                            <span className="inline-block">Réglages</span>
                        </a>
                    </li>
                    <li>
                        {/* TODO: Switch Sun & Moon */}
                        <a className={`flex items-center ${active == "darkmode" ? "font-bold" : ""}`} href="">
                            <div className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl mr-[16px]`}>
                                <img className="block w-[18px] h-[18px]" src="/icons/Sun.png" />
                            </div>
                            <span className="inline-block">Dark mode</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-[20px]">
                <ul className="text-white">
                    <li>
                        <a href="#" className="flex items-center">
                            <div className="w-[38px] h-[38px] p-[10px]">
                                <img className="block w-[18px] h-[18px]" src="/icons/Questionmark.png" />
                            </div>
                            <span className="inline-block ml-[16px]">Assistance</span>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center">
                            <div className="w-[38px] h-[38px] p-[10px]">
                                <img className="block w-[18px] h-[18px]" src="/icons/Door.png" />
                            </div>
                            <span className="inline-block ml-[16px]">Déconnexion</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}