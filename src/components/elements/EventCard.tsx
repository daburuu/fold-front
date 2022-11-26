import { HashLink as Link } from 'react-router-hash-link';

export default function EventCard({id}){
    return (
        <Link to={{'pathName': '/dashboard', 'state': {address: id}}}>AHAHAHAH</Link>
    )
}