import { useEffect, useState } from 'react';
import {Divider} from "../../components/Divider.tsx";

interface ICarlos {
    id: number;
    message: string;
    image: any;
}

export const CarlosPage = () => {
    const [carlos, setCarlos] = useState<ICarlos>();

    useEffect(() => {
        fetch('api/carlos')
            .then(response => response.json())
            .then((c: ICarlos) => setCarlos(c));
    }, []);
    
    return (
        <div>
            <Divider />
            <h1>{carlos?.message}</h1>
            <Divider />
        </div>
    );
}