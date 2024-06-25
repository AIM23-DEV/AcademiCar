import { useEffect, useState } from 'react';
import {Divider} from "../../components/Divider.tsx";

export const CarlosPage = () => {
    const [carlos, setCarlos] = useState<ICarlos>();

    useEffect(() => {
        fetch('/api/carlos')
        .then(response => response.json())
        .then((c: ICarlos) => setCarlos(c));
    }, []);
    
    return (
        <div>
            <Divider />
            <div className="text-center">
                <h1>{carlos?.message}</h1>
            </div>
            <Divider />
            <img src={carlos?.imageSrc}  alt="..." />
            <Divider />
        </div>
    );
}