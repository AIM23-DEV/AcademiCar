import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Pagination} from "../../components/Pagination.tsx";
import {TripRouteCreationForm} from "./partials/TripRouteCreationForm.tsx";
import {useState} from "react";

export const CreateTripPage1 = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const [startAddress, setStartAddress] = useState<IAddress | null>();
    const [endAddress, setEndAddress] = useState<IAddress | null>();
    const pageTitle = t("pages/create:Common.title_create");
    SetPageTitle(pageTitle);

    // Handling change
    const onChangeStartAddress = (val: string) => setStartAddress(AsAddress(val, startAddress));
    const onChangeEndAddress = (val: string) => setEndAddress(AsAddress(val, endAddress));

    const AsAddress = (str: string, currentAddress: IAddress | null | undefined): IAddress | null | undefined => {
        if (!currentAddress) return currentAddress;

        const valFields = str.split(' ');
        return {
            id: currentAddress.id,
            street: valFields[0],
            number: parseInt(valFields[1]),
            zip: parseInt(valFields[2]),
            place: valFields[3],
            longitude: currentAddress.longitude,
            latitude: currentAddress.latitude,
        };
    }

    // TODO: button logic

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <TripRouteCreationForm 
                setStartAddress={onChangeStartAddress}
                setEndAddress={onChangeEndAddress}
            />
            
            <Pagination page={1} totalPages={4} />
            
            <BottomNavigationBar selected="create"/>
        </>
    );
};
