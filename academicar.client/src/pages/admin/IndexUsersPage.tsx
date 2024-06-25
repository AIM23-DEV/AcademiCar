import { TitleBar } from "../../components/TitleBar.tsx";
import { BottomNavigationBar } from "../../components/BottomNavigationBar.tsx";
import { Button } from "../../components/Buttons.tsx";
import { SetStateAction, useEffect, useState } from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import { useTranslation } from "react-i18next";
import { BiChevronRight } from "react-icons/bi";
import { Card } from "../../components/Cards.tsx";
//import { RxAvatar } from "react-icons/rx";
import { Divider } from "../../components/Divider.tsx";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { Input, Select } from "../../components/FormFields.tsx";

export const IndexUsersPage = () => {
    const [t] = useTranslation(['common', 'pages/admin']);
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const navigate = useNavigate();

    // Translations
    const pageTitle = t('pages/admin:IndexUsersPage.title');
    const search = t('pages/admin:IndexUsersPage.search');
    const sort = t('pages/admin:IndexUsersPage.sort');
    const persons = t('pages/admin:IndexUsersPage.persons');
    const sortFirstName = t('pages/admin:IndexUsersPage.sortFirstName');
    const sortLastName = t('pages/admin:IndexUsersPage.sortLastName');

    SetPageTitle(pageTitle);

    // Fetch users from API
    useEffect(() => {
        fetch('/api/admin/users')
            .then(response => response.json())
            .then((fetchedUsers: IUser[]) => {
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            });
    }, []);

    // Filter and sort users
    useEffect(() => {
        filterAndSortUsers();
    }, [searchQuery, sortOption]);

    const filterAndSortUsers = () => {
        let filtered = users.filter(user =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption === 'first_name') {
            filtered = filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (sortOption === 'last_name') {
            filtered = filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
        }

        setFilteredUsers(filtered);
    };

    //Filter search users 
    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortOption(event.target.value);
    };

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
                    options={{
                        '': '---',
                        first_name: sortFirstName,
                        last_name: sortLastName,
                    }}
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
                    {filteredUsers.map((user) => (
                        <div key={user.id}>
                            <Button
                                variant="outline"
                                fullWidth
                                text={`${user.firstName} ${user.lastName}`}
                                textAlign="left"
                                textFullWidth
                                
                                //TODO Wenn DB Fotos speichern kann  
                                //leading={user.picture? <img src={user.picture} alt="User Picture" className="rounded-full w-12 h-12" /> : <RxAvatar />}
                                leading={<img
                                    src="https://academicar.blob.core.windows.net/profile-images/test.jpg"
                                    alt="Profile Avatar"
                                    className="rounded-full w-12 h-12"
                                />}
                                trailing={<BiChevronRight className="icon"/>}
                                type="button"
                                disabled={false}
                                className="mt-1"
                                onClick={() => navigate(`/admin/users/${user.id}`)}
                            />
                            <Divider className="my-2" />
                        </div>
                    ))}
                </Card>
            </div>

            <BottomNavigationBar selected={"profile"} />
        </>
    );
};
