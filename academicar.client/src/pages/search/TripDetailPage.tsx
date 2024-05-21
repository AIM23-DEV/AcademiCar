import { useParams } from 'react-router-dom';
import { TitleBar } from "../../components/TitleBar";

export const TripDetailPage = () => {
    const { id } = useParams();

    return (
        <div>
            <TitleBar text={`Mitfahrgelegenheit finden Detail Page for ${id}`} hasBackAction={true} />
        </div>
    );
};
