import {useState, useEffect, ChangeEvent} from "react";
import {CheckmarkHandler, Input, Select} from "../../components/FormFields.tsx";
import {Button} from "../../components/Buttons.tsx";
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';

export const UpdateCarPage = () => {
    const {vehicleId} = useParams();
    const [t] = useTranslation(['common', 'pages/profile']);
    const [vehicle, setVehicle] = useState<IVehicle>();
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value, type, checked} = e.target;
        setVehicle(prevVehicle => prevVehicle ? ({
            ...prevVehicle,
            [id]: type === 'checkbox' ? checked : value,
        }) : undefined);
    };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setVehicle(prevVehicle => prevVehicle ? ({
            ...prevVehicle,
            [id]: checked,
        }) : undefined);
    };

    const handleSubmit = async () => {
        if (vehicle) {
            try {
                const response = await fetch(vehicleId ? `/api/profile/vehicles/update` : `/api/profile/vehicles/add`, {
                    method: vehicleId ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vehicle),
                });
                if (response.ok) {
                    navigate('/profile/cars/');
                } else {
                    console.error('Failed to save vehicle');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {id, value} = e.target;
        setVehicle(prevVehicle => {
            if (!prevVehicle) return prevVehicle;
            return {
                ...prevVehicle,
                [id]: value,
            };
        });
    };

    const handleDelete = async () => {
        if (vehicle) {
            try {
                const response = await fetch(`/api/profile/vehicles/${vehicle.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    navigate('/profile/cars/');
                } else {
                    console.error('Failed to delete vehicle');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        if (vehicleId) {
            fetch(`/api/profile/vehicle/${vehicleId}`)
                .then(response => response.json())
                .then((data) => setVehicle(data))
                .catch((error) => console.error('Error fetching vehicle data:', error));
        } else {
            setVehicle({
                fK_OwnerUser: '-999',  //TODO replace with logged in user id
                type: '',
                seats: 0,
                color: '',
                pictureSrc: '',
                brandModel: '',
                fuelConsumption: '',
                licensePlate: '',
                fuelType: '',
                hasAC: false,
                hasLed: false,
                hasVehicleInspection: false,
                hasAutomatic: false,
                hasSkiBag: false,
                hasLeather: false,
                hasSeatHeating: false,
                hasCruiseControl: false,
                hasBikeRack: false,
                hasHandLuggageSpace: false,
                hasMountingOnRoof: false,
                hasAnimalSpace: false,
                hasSuitcaseSpace: false,
                hasSkiSpace: false,
                hasPlantSpace: false,
                hasOtherSpace: false,
            });
        }
    }, [vehicleId]);

    if (!vehicle) return <div>Loading vehicle...</div>
    
    const pageTitle_create = t("pages/profile:CarPage.title_create");
    const pageTitle_update = t("pages/profile:CarPage.title_update");
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
            <TitleBar text={vehicleId ? pageTitle_update : pageTitle_create} hasBackAction/>
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
                    value={vehicle?.brandModel}
                    onChange={handleInputChange}
                    id="brand_Model"
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Input
                    label={economy}
                    type="number"
                    fullWidth
                    placeholder={economy_placeholder}
                    value={vehicle?.fuelConsumption}
                    onChange={handleInputChange}
                    id="fuel_Consumption"
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Input
                    label={plate}
                    type="text"
                    fullWidth
                    placeholder="GU - 123FH"
                    value={vehicle?.licensePlate}
                    id="license_Plate"
                    onChange={handleInputChange}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={cartype}
                    fullWidth
                    required={true}
                    value={vehicle?.type}
                    options={{1: cartype_selection, 2: "SUV"}}
                    onChange={handleSelectChange}
                    id="type"
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={color}
                    fullWidth
                    required={true}
                    value={vehicle?.color}
                    options={{1: color_selection, 2: "black", 3: "red"}}
                    onChange={handleSelectChange}
                    id={"color"}
                    className="col-span-full"
                />
            </form>
            <form className="mt-4 w-full grid grid-cols-12 gap-4">
                <Select
                    label={fuel}
                    fullWidth
                    required={true}
                    value={vehicle?.fuelConsumption}
                    options={{1: fuel_selection, 2: "Benzin", 3: "Diesel", 4: "Elektro"}}
                    onChange={handleSelectChange}
                    id="fuel_Consumption"
                    className="col-span-full"
                />
            </form>
            <form>
                <Select
                    label={seats}
                    fullWidth
                    required={true}
                    value={vehicle?.seats.toString()}
                    options={{1: seats_selection, 2: "3", 3: "4", 4: "5", 5: "7"}}
                    onChange={handleSelectChange}
                    id="seats"
                    className="col-span-full"
                />
            </form>

            <Card label={car_details} className="mt-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                    <CheckmarkHandler
                        label={ac}
                        checked={vehicle?.hasAC ?? false}
                        onChange={(checked) => handleCheckboxChange('ac', checked)}
                        id="ac"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={seat_heating}
                        checked={vehicle?.hasSeatHeating ?? false}
                        onChange={(checked) => handleCheckboxChange('seat_Heating', checked)}
                        id="seat_Heating"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={led}
                        checked={vehicle?.hasLed ?? false}
                        onChange={(checked) => handleCheckboxChange('led', checked)}
                        id="led"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={ski_bag}
                        checked={vehicle?.hasSkiBag ?? false}
                        onChange={(checked) => handleCheckboxChange('ski_Bag', checked)}
                        id="ski_Bag"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={inspection}
                        checked={vehicle?.hasVehicleInspection ?? false}
                        onChange={(checked) => handleCheckboxChange('vehicle_Inspection', checked)}
                        id="vehicle_Inspection"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={leather}
                        checked={vehicle?.hasLeather ?? false}
                        onChange={(checked) => handleCheckboxChange('leather', checked)}
                        id="leather"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={automatic}
                        checked={vehicle?.hasAutomatic ?? false}
                        onChange={(checked) => handleCheckboxChange('automatic', checked)}
                        id="automatic"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={cruise_control}
                        checked={vehicle?.hasCruiseControl ?? false}
                        onChange={(checked) => handleCheckboxChange('cruise_Control', checked)}
                        id="cruise_Control"
                        className="flex items-center gap-1"
                    />
                </div>
            </Card>
            <Card label={storage} className="mt-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                    <CheckmarkHandler
                        label={bike_rack}
                        checked={vehicle?.hasBikeRack ?? false}
                        onChange={(checked) => handleCheckboxChange('bike_Rack', checked)}
                        id="bike_Rack"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={suitcase}
                        checked={vehicle?.hasSuitcaseSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('suitcase', checked)}
                        id="suitcase"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={hand_luggage}
                        checked={vehicle?.hasHandLuggageSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('hand_luggage', checked)}
                        id="hand_luggage"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={ski}
                        checked={vehicle?.hasSkiSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('ski', checked)}
                        id="ski"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={roof_mounting}
                        checked={vehicle?.hasMountingOnRoof ?? false}
                        onChange={(checked) => handleCheckboxChange('nounting_Roof', checked)}
                        id="nounting_Roof"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={plants}
                        checked={vehicle?.hasPlantSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('plants', checked)}
                        id="plantsplants"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={animals}
                        checked={vehicle?.hasAnimalSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('animals', checked)}
                        id="animals"
                        className="flex items-center gap-1"
                    />
                    <CheckmarkHandler
                        label={other}
                        checked={vehicle?.hasOtherSpace ?? false}
                        onChange={(checked) => handleCheckboxChange('other', checked)}
                        id="other"
                        className="flex items-center gap-1"
                    />
                </div>
            </Card>

            <Button
                variant="primary"
                fullWidth
                text={updatecar}
                textAlign="center"
                onClick={handleSubmit}
                className="col-span-full mt-8"
            />

            {vehicleId && (
                <Button
                    variant="secondary"
                    fullWidth
                    text={t('Delete Car')}
                    textAlign="center"
                    onClick={handleDelete}
                    className="col-span-full mt-4"
                />
            )}

            <BottomNavigationBar selected="profile"/>
        </div>
    );
};
