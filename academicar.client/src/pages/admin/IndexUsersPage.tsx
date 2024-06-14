import { TitleBar } from "../../components/TitleBar.tsx";
import { BottomNavigationBar } from "../../components/BottomNavigationBar.tsx";
import { Button } from "../../components/Buttons.tsx";
import { ConfirmationModal } from "../../components/Modal.tsx";
import {SetStateAction, useEffect, useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {BiChevronRight} from "react-icons/bi";
import {Card} from "../../components/Cards.tsx";
import {RxAvatar} from "react-icons/rx";
import {Divider} from "../../components/Divider.tsx";
import {useNavigate} from "react-router-dom";
import {IoIosSearch} from "react-icons/io";
import {Input, Select} from "../../components/FormFields.tsx";


//TODO Datenbank anknüpfen


export const IndexUsersPage = () => {
    const [t] = useTranslation(['common', 'pages/admin']);

    // Translations
    const pageTitle = t('pages/admin:IndexUsersPage.title');
    const search = t('pages/admin:IndexUsersPage.search');
    const sort = t('pages/admin:IndexUsersPage.sort');
    const persons = t('pages/admin:IndexUsersPage.persons');
    const sortRating = t('pages/admin:IndexUsersPage.sortRating');
    const sortAlphabetic = t('pages/admin:IndexUsersPage.sortAlphabetic');


    SetPageTitle(pageTitle);


    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        fetch('api/admin/users')
            .then(response => response.json())
            .then((fusers: IUser[]) => setUsers(fusers));
    }, []);
    

    /*const USER = [
        {id: 1, name: 'Sofie Buchhalter', imgSrc: 'path/to/image1.jpg', rating: 4.5, path: "/admin/users/1"},
        {id: 2, name: 'Samantha Kinsley', imgSrc: 'path/to/image2.jpg', rating: 3.8, path: "/admin/users/2"},
        {id: 3, name: 'Max Kruse', imgSrc: 'path/to/image3.jpg', rating: 4.2, path: "/admin/users/3"},
        {id: 4, name: 'Jane Doe', imgSrc: 'path/to/image4.jpg', rating: 3.9, path: "/admin/users/4"},
        {id: 5, name: 'Bernd Kern', imgSrc: 'path/to/image5.jpg', rating: 4.7, path: "/admin/users/5"},
    ]; */
    

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('alphabetical');

    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortOption(event.target.value);
    };

    const filteredUsers = users?.filter(user =>
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUsers = filteredUsers?.sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.lastname.localeCompare(b.lastname);
        } else if (sortOption === 'rating') {
            return b.fk_stats - a.fk_stats;
        } else {
            return 0;
        }
    });

    return (
        <>
            <TitleBar text={"Account"} hasBackAction />

            <div className="grid grid-cols-2 gap-6 my-8">
                <Input
                    id="search"
                    type="text"
                    placeholder={search}
                    leading={<IoIosSearch />}
                    required={true}
                    label={search}
                    value={searchQuery}
                    fullWidth
                    onChange={handleSearchChange}
                />
                <Select
                    label={sort}
                    id="sort"
                    fullWidth
                    required
                    options={{ alphabetical: sortRating, rating: sortAlphabetic }}
                    value={sortOption}
                    onChange={handleSortChange}
                    
                />
            </div>

            <div className="w-full flex flex-col items-center">
                <Card
                    id="1"
                    label={persons}
                    labelPosition="outside"
                    padding="base"
                    className="mt-1"
                >
                    {sortedUsers?.map((users) => (
                        <div key={users.id}>
                            <Button
                                variant="outline"
                                fullWidth
                                text={users.firstname + users.lastname}
                                textAlign="left"
                                textFullWidth
                                leading={<RxAvatar className="icon-md" />}
                                trailing={<BiChevronRight className="icon" />}
                                type="button"
                                disabled={false}
                                className="mt-1"
                                onClick={() => navigate(`/admin/users/${users.id}`)}
                            />
                            <Divider className="my-2" />
                        </div>
                    ))}
                </Card>
            </div>

            <BottomNavigationBar selected={"profile"} />

            <ConfirmationModal
                open={showModal}
                setOpen={setShowModal}
                subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!"
                onConfirm={() => alert("Confirmed")}
            />
        </>
    );
};
