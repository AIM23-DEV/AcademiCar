import {BiBriefcaseAlt, BiCar, BiPalette, BiGroup, BiChevronRight} from "react-icons/bi";
import {LinkCard} from "../../../components/Cards.tsx";

interface VehicleListTileProps {
    vehicle: IVehicle,
}

export const VehicleListTile = (props: VehicleListTileProps) => {
    return (
        <li key={props.vehicle.id} className="w-full">
            <LinkCard link={`cars/${props.vehicle.id}`} label={props.vehicle.brandModel}
                      className="relative w-full h-full">
                <div className="flex flex-row w-full items-center">
                    <img
                        src={props.vehicle.pictureSrc}
                        alt="Vehicle"
                        className="icon-2xl rounded-full mr-4"
                    />
                    <div className="flex flex-col w-full space-y-1">
                        <div className="flex flex-row items-center body-2">
                            <BiCar className="icon mr-2"/>
                            <p>{props.vehicle.licensePlate}</p>
                        </div>
                        <div className="flex flex-row items-center body-2">
                            <BiPalette className="icon mr-2"/>
                            <p>{props.vehicle.color}</p>
                        </div>
                        <div className="flex flex-row items-center body-2">
                            <BiGroup className="icon mr-2"/>
                            <p>{props.vehicle.seats}</p>
                        </div>
                        <div className="flex flex-row items-center body-2">
                            <BiBriefcaseAlt className="icon mr-2"/>
                            <p>{props.vehicle.type}</p>
                        </div>
                    </div>
                    <BiChevronRight className="icon-md flex-shrink-0"/>
                </div>
            </LinkCard>
        </li>
    )
}