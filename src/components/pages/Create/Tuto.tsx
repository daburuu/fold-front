import { useNavigate } from 'react-router-dom';

export default function FoldTuto({}){
    const navigate = useNavigate();

    function skipTuto(){
        navigate('/form-create');
    }

    return (
        <div className={`w-full h-full bg-[#200E32] text-white pt-[30px] transition-opacity duration-500`}>
            <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-[40px]">
                <img src="/logo.png" />
                <img src="/pp.png" className="rounded-full h-[75px]"/>
            </div>
            <div className="flex items-center w-full justify-center">
                <div className="w-3/5 relative">
                    <img src="/tuto.png" className="w-full" />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-2/5">
                        <div className="text-white text-[24px] text-center">
                            Découvrez notre outil<br /> avec ce tuto !
                        </div>
                        <button onClick={skipTuto} className="w-full text-center bg-[#A172D0] h-[65px] rounded-[32px] text-[18px] mt-[49px]">Lire ce tuto</button>

                    </div>
                </div>
            </div>
        </div>
    )
}