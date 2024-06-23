import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {BiCar} from "react-icons/bi";
import {useEffect, useState} from 'react';
import {EmptyState} from "../../components/EmptyState.tsx";
import {VehicleListTile} from "./partials/VehicleListTile.tsx";

export const ShowCarsPage = () => {
    const [vehicles, setVehicle] = useState<IVehicle[]>();
    const [t] = useTranslation(['common', 'pages/profile']);
    const navigate = useNavigate();
    //const {user} = useAuth()

    useEffect(() => {
        //if (!user) {
        //    console.log("No user is logged in");
        //    return;
        //}
        // /api/vehicle/vehicles/${user.id}

        fetch('/api/profile/vehicles/-999')
            .then(response => {
                if (response.status === 404) {
                    return [];
                }
                return response.json();
            })
            .then((data) => setVehicle(data))
            .catch((error) => console.error('Error fetching vehicle data:', error));
    }, []);

    const pageTitle = t("pages/profile:ShowCarsPage.title");
    const newCar: string = t("pages/profile:ShowCarsPage.newcar")
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>

            <ul className="w-full mt-6 mb-24">

                {vehicles?.length === 0 ? (
                    <EmptyState icon={<BiCar className="icon-xl"/>} title="Keine Fahrzeuge"
                                subtitle="Du hast noch keine Fahrzeuge hinzugefügt." asCard className="mt-6"/>
                ) : (
                    vehicles?.map((vehicle) =>
                        <VehicleListTile vehicle={vehicle} key={vehicle.id}/>
                    ))}
            </ul>

            <Button
                variant="primary"
                text={newCar}
                textAlign="center"
                type="submit"
                className="fixed bottom-6 inset-x-6 !w-auto"
                onClick={() => navigate("update")}
            />
        </>
    );
};
