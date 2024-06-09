import {useState} from "react";
import {Input, RadioCollection} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";
import {useTranslation} from "react-i18next";
import {Divider} from "../../../components/Divider.tsx";
import {TextLink} from "../../../components/Buttons.tsx";
import { BiFilter, BiSortAlt2 } from "react-icons/bi";
import { Menu, MenuButton, MenuItems } from '@headlessui/react'

/*const SEARCHDATA = {
    startPoint: "Graz Hauptbahnhof",
    endPoint: "Wien Flughafen",
    date: "2024-05-16",
    time: "7:38",
}*/

export const SearchResultForm = () => {
    const [t] = useTranslation();
    const [startPoint, setStartPoint] = useState('');
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
                        value={startPoint}
                        onChange={(e) => {
                            setStartPoint(e.target.value)
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
                        link="/search/filter"
                        leading={<BiFilter className="icon"/>}
                        text={t('pages/search:SearchResultsForm.filter')}
                        className="w-full"
                    />

                    <Menu>
                        <MenuButton className="text-secondary-600">
                            <TextLink
                                leading={<BiSortAlt2 className="icon"/>}
                                text={t('pages/search:SearchResultsForm.sort.title')}
                                className="w-full"
                            />
                        </MenuButton>
                        <MenuItems anchor="bottom" className="w-fit card">
                            <RadioCollection
                                value={radioValue}
                                setValue={setRadioValue}
                                items={[
                                    {value: 1, label: t('pages/search:SearchResultsForm.sort.price')},
                                    {value: 2, label: t('pages/search:SearchResultsForm.sort.fast')},
                                    {value: 3, label: t('pages/search:SearchResultsForm.sort.best')},
                                    {value: 4, label: t('pages/search:SearchResultsForm.sort.stopps')}
                                ]}
                            />
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </Card>
    );
};