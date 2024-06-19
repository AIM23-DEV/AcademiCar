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
    imageSrc: string;
}

interface IChat {
    id: number;
    fK_Trip: number;
    fK_User: string;
    hasMoreThan2: boolean;
    user: IUser | undefined;
    updatedAt: string;
}

interface IFavoriteUser
{
    id: number;
    fK_Userid: string;
    fK_FavUserId: string;
}

interface IInterestPreference
{
    id: number;
    fK_Preferences: number;
    interest: string;
}

interface IMessage
{
    id: number;
    fK_User: string;
    fK_Chat: number;
    fK_TripRequest: number;
    content: string;
    sentAt: string;
}

interface IMusicPreference
{
    id: number;
    fK_Preferences: number;
    genre: string;
}

interface IPreferences {
    id: number;
    fK_User: string;
}

interface IRating {
    id: number;
    fK_RatingUser: string;
    fK_RatedUser: string;
    isDriver: boolean;
    isPassenger: boolean;
    score: number;
    comment: string;
}

interface IStats {
    id: number;
    driverKilometres: number;
    passengerKilometres: number;
    nrTrips: number;
    co2Savings: number;
}

interface ITravelPreference
{
    id: number;
    fK_Preferences: number;
    preferenceText: string;
    iconType: string;
}

interface ITrip {
    id: number;
    title: string;
    fK_Driver: string;
    fK_Vehicle: number;
    fK_StartAddress: number;
    fK_EndAddress: number;
    startTime: Date;
    endTime: Date;
    availableSeats: number;
    price: number;
    paymentMethod: string;
    status: string;
}

interface ITripPassenger {
    id: number;
    fK_Trip: number;
    fK_PassengerUser: string;
}

interface ITripRequest {
    id: number;
    fK_Trip: number;
    fK_PotentialPassenger: string;
    comment: string;
    status: string;
}

interface ITripStop {
    id: number;
    fK_Trip: number;
    fK_StopAddress: number;
    stopDurationInMinutes: number;
}

interface IUser {
    id: string;
    email: string; 
    firstName: string;
    lastName: string; 
    pictureSrc: string;
    fK_Address: number;
    fK_Stats: number;
    phoneNumber: string;
}

interface IVehicle {
    id: number;
    type: string;
    seats: number;
    color: string;
    pictureSrc: any[];
    features: string;
    isElectric: boolean;
    fK_User: string;
}
