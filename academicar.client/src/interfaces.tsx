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
    fk_userid: string;
    fk_fav_userid: string;
}

interface IPreferences {
    id: number;
    fk_user: string;
}

interface IRating {
    id: number;
    fk_user: string;
    is_driver: boolean;
    is_passenger: boolean;
    score: number;
}

interface IStats {
    id: number;
    nr_trips: number;
    co2_savings: number;
    driver_rating: number;
    passenger_rating: number;
}

interface ITrip {
    id: number;
    title: string;
    fk_driver: string;
    fk_vehicle: number;
    passengers: IUser[];
    fk_start_address: number;
    fk_end_address: number;
    start_time: any;
    end_time: any;
    duration: number;
    available_seats: number;
    price: number;
    payment_method: string;
    status: string;
}

interface ITripRequest {
    id: number;
    fk_trip: number;
    fk_potential_passenger: string;
    comment: string;
    status: string;
}

interface IUser {
    id: string;
    email: string; 
    firstname: string;
    lastname: string; 
    picture: any[];
    fk_stats: number;
    favorits: string[];
}

interface IVehicle {
    id: number;
    type: string;
    seats: number;
    color: string;
    picture: any[];
    features: string;
    is_electric: boolean;
    fk_user: string;
}
