import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';

export default function FoldScanTicket({}){
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const userAddress = searchParams.get("userAddress");
    const tokenId = searchParams.get("tokenId");

    if(!userAddress || !tokenId) {
        navigate("/camera");
        // TODO: Develop camera
    }
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/scanTicket`, {
        method: 'POST',
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAddress: userAddress,
            tokenId: tokenId
        })
    })
    .then(async (response) => {
        const { datas } = await response.json();
        console.log(datas);
        // TODO: Redirect to /camera
    })
    .catch((error) => {
        console.log(error);
    });

    return (<></>);
}