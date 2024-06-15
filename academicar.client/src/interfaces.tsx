interface IAddress{
    id: number;
    street: string;
    number: number;
    zip: number;
    place: string;
    longitude: string;
    latitude: string;
}

interface ICarlos {
    id: number;
    message: string;
    image: any;
}

interface IFavoriteUser
{
    id: number;
    fK_Userid: string;
    fK_Fav_Userid: string;
}

interface IPreferences {
    id: number;
    fK_User: string;
}

interface IRating {
    id: number;
    fK_User: string;
    isDriver: boolean;
    isPassenger: boolean;
    score: number;
}

interface IStats {
    id: number;
    nrTrips: number;
    co2Savings: number;
    driverRating: number;
    passengerRating: number;
}

interface ITrip {
    id: number;
    title: string;
    fK_Driver: string;
    fK_Vehicle: number;
    passengers: string[];
    fK_StartAddress: number;
    fK_EndAddress: number;
    startTime: any;
    endTime: any;
    duration: number;
    availableSeats: number;
    price: number;
    paymentMethod: string;
    status: string;
}

interface ITripRequest {
    id: number;
    fK_Trip: number;
    fK_PotentialPassenger: string;
    comment: string;
    status: string;
}

interface IUser {
    id: string;
    email: string; 
    firstname: string;
    lastname: string; 
    picture: any[];
    fK_Stats: number;
    favorits: string[];
}

interface IVehicle {
    id: number;
    type: string;
    seats: number;
    color: string;
    picture: any[];
    features: string;
    isElectric: boolean;
    fK_User: string;
}
