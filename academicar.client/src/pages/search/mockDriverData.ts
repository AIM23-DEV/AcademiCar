
//MOCKUP DATA for Ratings.tsx

export interface Review {
    reviewer: string;
    rating: number;
    comment: string;
}

export interface DriverData {
    name: string;
    rating: number;
    attributes: string[];
    reviews: Review[];
    image: string;
}

export const getDriverData = async (driverId: string | undefined): Promise<DriverData | null> => {
    const mockData: { [key: string]: DriverData } = {
        '1': {
            name: 'Jon Doe',
            rating: 4.0,
            attributes: ['Sagt Fahrten nie ab', 'Antwortet schnell'],
            reviews: [
                { reviewer: 'Jonny Fritz', rating: 5, comment: 'Super Fahrt kann ich nur empfehlen.' },
                { reviewer: 'Johan Marc', rating: 5, comment: 'Hat alles geklappt.' },
                { reviewer: 'Mary James', rating: 4, comment: 'Sind leider 30 min zu spät angekommen.' },
            ],
            image: '/path/to/jon-doe-image.png',
        },
        // Add more mock drivers as needed
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(driverId ? mockData[driverId] || null : null);
        }, 500);
    });
};
