import { useEffect, useState } from 'react';
import {Divider} from "../../components/Divider.tsx";

export const CarlosPage = () => {
    const [carlos, setCarlos] = useState([]);

    useEffect(() => {
        fetch('api/carlos')
            .then(response => response.json())
            .then(data => setCarlos(data));

        console.log("DATA fetched");
        console.log(carlos);
    }, []);
    
    return (
        <div>
            <Divider />
            <h1>123{carlos}</h1>
            <Divider />
        </div>
    );
}