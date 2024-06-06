import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDriverData, DriverData } from './mockDriverData';
import { useTranslation } from 'react-i18next';
import { TitleBar } from '../../components/TitleBar.tsx';
import { BottomNavigationBar } from '../../components/BottomNavigationBar.tsx';
import { Card } from '../../components/Cards.tsx';

const Ratings: React.FC = () => {
    const { driverId } = useParams<{ driverId: string }>();
    const [driverData, setDriverData] = useState<DriverData | null>(null);
    const [t] = useTranslation(['common', 'pages/profile']);

    useEffect(() => {
        const fetchDriverData = async () => {
            const data = await getDriverData(driverId);
            setDriverData(data);
        };

        fetchDriverData();
    }, [driverId]);

    if (!driverData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pb-24 w-full">
            <TitleBar text={t("pages/search:Ratings.back")} hasBackAction />
            <div className="flex justify-center">
                <img
                    src={driverData.image || "/default-avatar.png"}
                    alt="avatar"
                    className="rounded-full w-32 h-32"
                />
            </div>

            <Card label={driverData.name} className="mt-4 w-full">
                <div className="rating-score flex items-center justify-between">
                    <span className="score text-4xl">{driverData.rating.toFixed(1)}</span>
                    <span className="stars text-2xl">
                        {'⭐'.repeat(Math.floor(driverData.rating)) + '☆'.repeat(5 - Math.floor(driverData.rating))}
                    </span>
                    <span className="reviews-count text-lg">{driverData.reviews.length} {t("pages/search:Ratings.reviews")}</span>
                </div>
                <div className="rating-info mt-4">
                    {driverData.attributes.map(attr => (
                        <p key={attr}>✔️ {attr}</p>
                    ))}
                </div>
            </Card>

            <div className="comments mt-4">
                {driverData.reviews.map((review, index) => (
                    <Card key={index} className="comment mb-4">
                        <h4 className="font-bold">{review.reviewer}</h4>
                        <div className="stars">{'⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                        <p>{review.comment}</p>
                    </Card>
                ))}
            </div>

            <BottomNavigationBar selected="profile" />
        </div>
    );
};

export default Ratings;