import { useEffect, useState } from 'react';
import {Divider} from "../../components/Divider.tsx";

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