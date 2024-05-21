import { SearchForm } from "./SearchForm";
import { SearchHistory } from "./SearchHistory";
import { TitleBar } from "../../components/TitleBar";

export const TripSearchPage = () => {
    return (
        <div>
            <TitleBar text="Mitfahrgelegenheit finden" />

            <SearchForm />

            <SearchHistory />
        </div>
    );
};
