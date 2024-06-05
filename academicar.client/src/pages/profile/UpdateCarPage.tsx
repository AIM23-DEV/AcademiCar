import {useState} from "react";
import {Checkmark, Input, Select} from "../../components/FormFields.tsx";
import {Button} from "../../components/Buttons.tsx";
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import { Card } from "../../components/Cards.tsx";
import {useNavigate} from "react-router-dom";

export const UpdateCarPage = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    //const [time, setTime] = useState('');
    const navigate = useNavigate();

    const pageTitle = t("pages/profile:CarPage.title");
    const brand_placeholder = t("pages/profile:CarPage.brand_placeholder");
    const brand = t("pages/profile:CarPage.brand");
    const economy_placeholder = t("pages/profile:CarPage.economy_placeholder");
    const economy = t("pages/profile:CarPage.economy");
    const plate = t("pages/profile:CarPage.plate");
    const cartype = t("pages/profile:CarPage.cartype");
    const cartype_selection = t("pages/profile:CarPage.cartype_selection");
    const color = t("pages/profile:CarPage.color");
    const color_selection = t("pages/profile:CarPage.color_selection");
    const fuel = t("pages/profile:CarPage.fuel");
    const fuel_selection = t("pages/profile:CarPage.fuel_selection");
    const seats = t("pages/profile:CarPage.seats");
    const seats_selection = t("pages/profile:CarPage.seats_selection");
    const car_details = t("pages/profile:CarPage.car_details");
    const ac = t("pages/profile:CarPage.ac");
    const seat_heating = t("pages/profile:CarPage.seat_heating");
    const led = t("pages/profile:CarPage.LED");
    const ski_bag = t("pages/profile:CarPage.ski_bag");
    const inspection = t("pages/profile:CarPage.inspection");
    const leather = t("pages/profile:CarPage.leather");
    const automatic = t("pages/profile:CarPage.automatic");
    const cruise_control = t("pages/profile:CarPage.cruise_control");
    const storage = t("pages/profile:CarPage.storage");
    const bike_rack = t("pages/profile:CarPage.bike_rack");
    const suitcase = t("pages/profile:CarPage.suitcase");
    const hand_luggage = t("pages/profile:CarPage.hand_luggage");
    const ski = t("pages/profile:CarPage.ski");
    const roof_mounting = t("pages/profile:CarPage.roof_mounting");
    const plants = t("pages/profile:CarPage.plants");
    const animals = t("pages/profile:CarPage.animals");
    const other = t("pages/profile:CarPage.other");
    const updatecar = t("pages/profile:CarPage.updatecar");

    return (
        <div className="pb-24 w-full">
            <TitleBar text={pageTitle} hasBackAction/>
            <h1>Update Car isn't working yet!</h1>
            <div className="flex justify-center">
                <img
                    src="/../src/assets/react.svg"
                    alt="avatar"
                    className="rounded-full w-32 h-32"
                />
            </div>

            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Input
                    label={brand}
                    type="text"
                    fullWidth
                    placeholder={brand_placeholder}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Input
                    label={economy}
                    type="text"
                    fullWidth
                    placeholder={economy_placeholder}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Input
                    label={plate}
                    type="text"
                    fullWidth
                    placeholder="GU - 123FH"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={cartype}
                    fullWidth
                    required={true}
                    options={{1: cartype_selection, 2: "zweiter Eintrag"}}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={color}
                    fullWidth
                    required={true}
                    options={{1: color_selection, 2: "zweiter Eintrag"}}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={fuel}
                    fullWidth
                    required={true}
                    options={{1: fuel_selection, 2: "zweiter Eintrag"}}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={seats}
                    fullWidth
                    required={true}
                    options={{1: seats_selection, 2: "3", 3: "4", 4: "5", 5: "7"}}
                    className="col-span-full"
                />
            </form>
            <Card label={car_details} className="mt-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                    <Checkmark label={ac} className="flex items-center gap-1"/>
                    <Checkmark label={seat_heating} className="flex items-center gap-1"/>
                    <Checkmark label={led} className="flex items-center gap-1"/>
                    <Checkmark label={ski_bag} className="flex items-center gap-1"/>
                    <Checkmark label={inspection} className="flex items-center gap-1"/>
                    <Checkmark label={leather} className="flex items-center gap-1"/>
                    <Checkmark label={automatic} className="flex items-center gap-1"/>
                    <Checkmark label={cruise_control} className="flex items-center gap-1"/>
                </div>
            </Card>
            <Card label={storage} className="mt-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                    <Checkmark label={bike_rack} className="flex items-center gap-1"/>
                    <Checkmark label={suitcase} className="flex items-center gap-1"/>
                    <Checkmark label={hand_luggage} className="flex items-center gap-1"/>
                    <Checkmark label={ski} className="flex items-center gap-1"/>
                    <Checkmark label={roof_mounting} className="flex items-center gap-1"/>
                    <Checkmark label={plants} className="flex items-center gap-1"/>
                    <Checkmark label={animals} className="flex items-center gap-1"/>
                    <Checkmark label={other} className="flex items-center gap-1"/>
                </div>
            </Card>

            <Button
                variant="primary"
                fullWidth
                text={updatecar}
                textAlign="center"
                onClick={() => navigate("/profile/cars/")}
                className="col-span-full mt-8"
            />

            <BottomNavigationBar selected="profile"/>
        </div>
    );
};
