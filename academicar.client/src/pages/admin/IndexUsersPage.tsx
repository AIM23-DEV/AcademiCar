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

export const IndexUsersPage = () => {
    const [t] = useTranslation(['common', 'pages/admin']);
    const [users, setUsers] = useState<IUser[]>();
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>();
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('alphabetical');
    const navigate = useNavigate();

    // Translations
    const pageTitle = t('pages/admin:IndexUsersPage.title');
    const search = t('pages/admin:IndexUsersPage.search');
    const sort = t('pages/admin:IndexUsersPage.sort');
    const persons = t('pages/admin:IndexUsersPage.persons');
    const sortRating = t('pages/admin:IndexUsersPage.sortRating');
    const sortAlphabetic = t('pages/admin:IndexUsersPage.sortAlphabetic');
    SetPageTitle(pageTitle);

    useEffect(() => {
        fetch('https://localhost:5173/api/admin/users')
            .then(response => response.json())
            .then((fetchedUsers: IUser[]) => setUsers(fetchedUsers));
    }, []);

    if (users && !filteredUsers) {
        setFilteredUsers(users.filter(user => user.lastName.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    // Handling Change
    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortOption(event.target.value);
    };

    // TODO actually sort by rating
    const sortedUsers = filteredUsers?.sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.lastName.localeCompare(b.lastName);
        } else if (sortOption === 'rating') {
            return a.fK_Stats - a.fK_Stats;
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
                                text={`${users.firstName} ${users.lastName}`}
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
