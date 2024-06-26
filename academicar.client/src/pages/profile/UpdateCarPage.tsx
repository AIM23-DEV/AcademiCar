import {useState, useEffect, ChangeEvent} from "react";
import {CheckmarkHandler, Input, Select} from "../../components/FormFields.tsx";
import {Button} from "../../components/Buttons.tsx";
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {getUserId} from "../../AuthContext.tsx";

export const UpdateCarPage = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const [vehicle, setVehicle] = useState<IVehicle>();
    const userId = getUserId();

    const {loggedInUserId, vehicleId} = useParams();
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
                const response = await fetch(vehicleId && vehicleId !== "undefined" ? `/api/profile/vehicles/update` : `/api/profile/vehicles/add`, {
                    method: vehicleId && vehicleId !== "undefined" ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vehicle),
                });
                if (response.ok) {
                    navigate('/profile/' + userId + '/cars/');
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
                    navigate('/profile/' + userId + '/cars/');
                } else {
                    console.error('Failed to delete vehicle');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        if ((vehicleId as string).length > 0 && (vehicleId as string) != "undefined") {
            fetch(`/api/profile/vehicle/${vehicleId}`)
                .then(response => response.json())
                .then((data) => setVehicle(data))
                .catch((error) => console.error('Error fetching vehicle data:', error));
        } else {
            setVehicle({
                fK_OwnerUser: loggedInUserId,
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
    const updatecar = t("pages/profile:CarPage.update_car");
    const deleteCarActionText = t("pages/profile:CarPage.delete_car");

    return (
        <div className="pb-40 w-full">
            <TitleBar text={vehicleId && vehicleId !== "undefined" ? pageTitle_update : pageTitle_create}
                      hasBackAction/>
            <div className="flex justify-center my-6">
                <img
                    src={vehicle?.pictureSrc}
                    alt="avatar"
                    className="rounded-full icon-2xl"
                />
            </div>

            <form className="w-full grid grid-cols-12 gap-6">
                <Input
                    label={brand}
                    type="text"
                    fullWidth
                    placeholder={brand_placeholder}
                    value={vehicle?.brandModel}
                    onChange={handleInputChange}
                    id="brandModel"
                    className="col-span-full"
                />
                <Input
                    label={economy}
                    type="number"
                    fullWidth
                    placeholder={economy_placeholder}
                    value={vehicle?.fuelConsumption}
                    onChange={handleInputChange}
                    id="fuelConsumption"
                    className="col-span-full"
                />
                <Input
                    label={plate}
                    type="text"
                    fullWidth
                    placeholder="GU - 123FH"
                    value={vehicle?.licensePlate}
                    id="licensePlate"
                    onChange={handleInputChange}
                    className="col-span-full"
                />
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
                <Select
                    label={fuel}
                    fullWidth
                    required={true}
                    value={vehicle?.fuelConsumption}
                    options={{1: fuel_selection, 2: "Benzin", 3: "Diesel", 4: "Elektro"}}
                    onChange={handleSelectChange}
                    id="fuelConsumption"
                    className="col-span-full"
                />
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

                <Card label={car_details} className="col-span-full">
                    <div className="grid grid-cols-2 gap-4">
                        <CheckmarkHandler
                            label={ac}
                            checked={vehicle?.hasAC ?? false}
                            onChange={(checked) => handleCheckboxChange('hasAC', checked)}
                            id="hasAC"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={seat_heating}
                            checked={vehicle?.hasSeatHeating ?? false}
                            onChange={(checked) => handleCheckboxChange('hasSeatHeating', checked)}
                            id="hasSeatHeating"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={led}
                            checked={vehicle?.hasLed ?? false}
                            onChange={(checked) => handleCheckboxChange('hasLed', checked)}
                            id="hasLed"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={ski_bag}
                            checked={vehicle?.hasSkiBag ?? false}
                            onChange={(checked) => handleCheckboxChange('hasSkiBag', checked)}
                            id="hasSkiBag"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={inspection}
                            checked={vehicle?.hasVehicleInspection ?? false}
                            onChange={(checked) => handleCheckboxChange('hasVehicleInspection', checked)}
                            id="hasVehicleInspection"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={leather}
                            checked={vehicle?.hasLeather ?? false}
                            onChange={(checked) => handleCheckboxChange('hasLeather', checked)}
                            id="hasLeather"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={automatic}
                            checked={vehicle?.hasAutomatic ?? false}
                            onChange={(checked) => handleCheckboxChange('hasAutomatic', checked)}
                            id="hasAutomatic"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={cruise_control}
                            checked={vehicle?.hasCruiseControl ?? false}
                            onChange={(checked) => handleCheckboxChange('hasCruiseControl', checked)}
                            id="hasCruiseControl"
                            className="flex items-center gap-1"
                        />
                    </div>
                </Card>
                <Card label={storage} className="col-span-full">
                    <div className="grid grid-cols-2 gap-4">
                        <CheckmarkHandler
                            label={bike_rack}
                            checked={vehicle?.hasBikeRack ?? false}
                            onChange={(checked) => handleCheckboxChange('hasBikeRack', checked)}
                            id="hasBikeRack"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={suitcase}
                            checked={vehicle?.hasSuitcaseSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasSuitcaseSpace', checked)}
                            id="hasSuitcaseSpace"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={hand_luggage}
                            checked={vehicle?.hasHandLuggageSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasHandLuggageSpace', checked)}
                            id="hasHandLuggageSpace"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={ski}
                            checked={vehicle?.hasSkiSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasSkiSpace', checked)}
                            id="hasSkiSpace"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={roof_mounting}
                            checked={vehicle?.hasMountingOnRoof ?? false}
                            onChange={(checked) => handleCheckboxChange('hasMountingOnRoof', checked)}
                            id="hasMountingOnRoof"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={plants}
                            checked={vehicle?.hasPlantSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasPlantSpace', checked)}
                            id="hasPlantSpace"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={animals}
                            checked={vehicle?.hasAnimalSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasAnimalSpace', checked)}
                            id="hasAnimalSpace"
                            className="flex items-center gap-1"
                        />
                        <CheckmarkHandler
                            label={other}
                            checked={vehicle?.hasOtherSpace ?? false}
                            onChange={(checked) => handleCheckboxChange('hasOtherSpace', checked)}
                            id="hasOtherSpace"
                            className="flex items-center gap-1"
                        />
                    </div>
                </Card>
            </form>

            <div className="fixed bottom-6 inset-x-6 space-y-2">
                <Button
                    variant="primary"
                    fullWidth
                    text={updatecar}
                    textAlign="center"
                    onClick={handleSubmit}
                />

                {vehicleId && vehicleId !== "undefined" && (
                    <Button
                        variant="accent"
                        fullWidth
                        text={deleteCarActionText}
                        textAlign="center"
                        onClick={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};
