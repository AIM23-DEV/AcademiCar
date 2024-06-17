import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {BiBriefcaseAlt, BiCar, BiChevronRight, BiGroup, BiPalette} from "react-icons/bi";
import {useEffect, useState} from 'react';

// TODO add content components and follow up pages
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

        fetch('/api/vehicle/vehicles/1')
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
            <div className="w-full" onClick={() => navigate("update")}>
                {vehicles?.length === 0 ? (
                    <p>User has no vehicles</p>
                ) : (
                    vehicles?.map((vehicle) => (
                        <Card label="Golf GTI" className="mt-4 w-full">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex justify-left">
                                    <img
                                        src="/../src/assets/react.svg"
                                        alt="avatar"
                                        className="rounded-full w-24 h-24"
                                    />
                                </div>
                                <div>
                                    <div className="flex">
                                        <BiCar className="icon-md mr-2"/>
                                        <p>GU - 123 FH</p>
                                    </div>
                                    <div className="flex">
                                        <BiPalette className="icon-md mr-2"/>
                                        <p>{vehicle?.color}</p>
                                    </div>
                                    <div className="flex">
                                        <BiGroup className="icon-md mr-2"/>
                                        <p>{vehicle?.seats}</p>
                                    </div>
                                    <div className="flex">
                                        <BiBriefcaseAlt className="icon-md mr-2"/>
                                        <p>Gepäckstücke</p>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center"><BiChevronRight className="icon-md"/>
                                </div>
                            </div>
                        </Card>
                    )))}
            </div>

            <Button
                variant="primary"
                fullWidth
                text={newCar}
                textAlign="center"
                textFullWidth
                type="button"
                className="mt-8"
                onClick={() => navigate("create")}
            />

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
