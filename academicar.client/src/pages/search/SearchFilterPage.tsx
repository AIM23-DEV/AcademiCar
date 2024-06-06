import {useState} from "react";
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Divider} from "../../components/Divider.tsx";
import {Checkmark, Input, RadioCollection, Select} from "../../components/FormFields.tsx";
import { BiEuro, BiSolidStar, BiTrash } from "react-icons/bi";
import {Slider} from "../../components/Slider.tsx";
import {TextButton} from "../../components/Buttons.tsx";

export const SearchFilterPage = () => {
    const [t] = useTranslation();
    
    const [slider, setSlider] = useState<number | number[]>([0, 100]);
    // @ts-ignore
    const [stops, setStops] = useState(1);
    
    const pageTitle = t("pages/search:SearchFilterPage.title");
    SetPageTitle(pageTitle);

    // @ts-ignore
    const handleChange = (e) => {
        const value = Number(e.target.value);
        // @ts-ignore
        setSlider([value, slider[1]]);
    };

    // @ts-ignore
    const handleChange2 = (e) => {
        const value = Number(e.target.value);
        // @ts-ignore
        setSlider([slider[1], value]);
    };
    
    return(
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full pb-24 relative">
                <div>
                    <div className="form-label">{t('pages/search:SearchFilterPage.price')}</div>
                    <div className="grid grid-cols-3 justify-center items-center">
                        <Input
                            trailing={<BiEuro className="icon-md text-gray-500"/>}
                            // @ts-ignore
                            value={slider[0]}
                            onChange={handleChange}
                            fullWidth={true}
                        />
                        <span className="text-center">bis</span>
                        <Input
                            trailing={<BiEuro className="icon-md text-gray-500"/>}
                            // @ts-ignore
                            value={slider[1]}
                            onChange={handleChange2}
                            fullWidth={true}
                        />
                    </div>

                    <Slider
                        value={slider}
                        setValue={setSlider}
                        range={true}
                        step={10}
                        className="mt-8"
                    />
                </div>

                <Divider className="my-8"/>

                <div>
                    <div className="form-label">{t('pages/search:SearchFilterPage.stops')}</div>
                    <RadioCollection
                        columns={2}
                        value={stops}
                        setValue={setStops}
                        items={[
                            {value: 1, label: t('pages/search:SearchFilterPage.stopsPossible')},
                            {value: 2, label: t('pages/search:SearchFilterPage.stopsImpossible')}
                        ]}
                    />
                </div>

                <Divider className="my-8"/>

                <div>
                    <div className="form-label">{t('pages/search:SearchFilterPage.rating')}</div>
                    <div className="flex justify-between">
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">1<BiSolidStar
                                       className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">2<BiSolidStar
                                       className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">3<BiSolidStar
                                       className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">4<BiSolidStar
                                       className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">5<BiSolidStar
                                       className="icon text-yellow-400"/></span>}
                        />
                    </div>
                </div>

                <Divider className="my-8"/>

                <div>
                    <Select
                        label={t('pages/search:SearchFilterPage.storage')}
                        fullWidth={true}
                        options={{
                            1: "1 " + t('pages/search:SearchFilterPage.handLuggage')
                        }}
                    />
                </div>

                <Divider className="my-8"/>

                <div>
                    <Select
                        label={t('pages/search:SearchFilterPage.preferences')}
                        fullWidth={true}
                        options={{
                            1: t('pages/search:SearchFilterPage.notSpecified')
                        }}
                    />
                </div>

                <Divider className="my-8"/>

                <div>
                    <Select
                        label={t('pages/search:SearchFilterPage.musicTaste')}
                        fullWidth={true}
                        options={{
                            1: t('pages/search:SearchFilterPage.notSpecified')
                        }}
                    />
                </div>

                <div className="w-full flex justify-center mt-8">
                    <TextButton
                        variant="accent"
                        onClick={() => {
                            setSlider([0, 100])
                            setStops(1)
                        }}
                        leading={<BiTrash className="icon-md"/>}
                        text={t('pages/search:SearchFilterPage.resetFilter')}
                    />
                </div>

            </div>

            <BottomNavigationBar selected="search"/>
        </>
    );
}
