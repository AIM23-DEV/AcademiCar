import {Input, RadioCollection} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";
import {useTranslation} from "react-i18next";
import {Divider} from "../../../components/Divider.tsx";
import {TextLink} from "../../../components/Buttons.tsx";
import { BiFilter, BiSortAlt2 } from "react-icons/bi";
import { Menu, MenuButton, MenuItems } from '@headlessui/react'

type SearchResultFormProps = {
    radioValue: string;
    setRadioValue: (value: any) => void;
    startPoint: string;
    destination: string;
    date: string;
    time: string;
};

export const SearchResultForm: React.FC<SearchResultFormProps> = ({ radioValue, setRadioValue, startPoint, destination, date, time }) => {
    const [t] = useTranslation();
    //const [radioValue, setRadioValue] = useState();
    
    return (
        <Card label="Suche" className="mt-6">
            <div>
                <div className="w-full grid grid-cols-12 gap-4">
                    <Input
                        readonly
                        type="text"
                        fullWidth
                        placeholder="Strecke"
                        value={
                        startPoint && destination
                            ? `${startPoint} - ${destination}`
                            : startPoint
                            ? startPoint
                            : destination
                            ? destination
                            : ''
                        }
                        className="col-span-full"
                    />
                    <Input
                        readonly
                        type="date"
                        fullWidth
                        placeholder="Datum"
                        value={date}
                        className="col-span-6"
                    />
                    <Input
                        readonly
                        type="time"
                        fullWidth
                        placeholder="Uhrzeit"
                        value={time}
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
                                    {value: "price", label: t('pages/search:SearchResultsForm.sort.price')},
                                    {value: "fastest", label: t('pages/search:SearchResultsForm.sort.fast')},
                                    {value: "best", label: t('pages/search:SearchResultsForm.sort.best')},
                                    /*{value: "stops", label: t('pages/search:SearchResultsForm.sort.stops')}*/
                                ]}
                            />
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </Card>
    );
};
