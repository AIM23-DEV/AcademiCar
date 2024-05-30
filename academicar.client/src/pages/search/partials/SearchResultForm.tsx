import {useState} from "react";
import {Input, RadioCollection} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";
import {useTranslation} from "react-i18next";
import {Divider} from "../../../components/Divider.tsx";
import {TextLink} from "../../../components/Buttons.tsx";
import { BiFilter, BiSortAlt2 } from "react-icons/bi";
import { Menu, MenuButton, MenuItems } from '@headlessui/react'

export const SearchResultForm = () => {
    const [t] = useTranslation(['common', 'pages/search']);
    const [startPoint, setStartPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [radioValue, setRadioValue] = useState();
    
    return (
        <Card label="Suche" className="mt-6">
            <div>
                <div className="w-full grid grid-cols-12 gap-4">
                    <Input
                        type="text"
                        fullWidth
                        placeholder="Strecke"
                        value={[startPoint, destination]}
                        onChange={(e) => {
                            setStartPoint(e.target.value)
                            setDestination(e.target.value)
                        }}
                        className="col-span-full"
                    />
                    <Input
                        type="date"
                        fullWidth
                        placeholder="Datum"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-6"
                    />
                    <Input
                        type="time"
                        fullWidth
                        placeholder="Uhrzeit"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="col-span-6"
                    />
                </div>
                
                <Divider className="my-5" />
                
                <div className="grid grid-cols-2 justify-center items-center">
                    <TextLink
                        leading={<BiFilter className="icon"/>}
                        text={t('pages/search:SearchResultsPage.filter')}
                        className="w-full"
                    />

                    <Menu>
                        <MenuButton className="text-secondary-600">
                            <TextLink
                                leading={<BiSortAlt2 className="icon"/>}
                                text={t('pages/search:SearchResultsPage.sort.title')}
                                className="w-full"
                            />
                        </MenuButton>
                        <MenuItems anchor="bottom" className="w-fit card">
                            <RadioCollection
                                value={radioValue}
                                setValue={setRadioValue}
                                items={[
                                    {value: 1, label: t('pages/search:SearchResultsPage.sort.price')},
                                    {value: 2, label: t('pages/search:SearchResultsPage.sort.fast')},
                                    {value: 3, label: t('pages/search:SearchResultsPage.sort.best')},
                                    {value: 4, label: t('pages/search:SearchResultsPage.sort.stopps')}
                                ]}
                            />
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </Card>
    );
};
