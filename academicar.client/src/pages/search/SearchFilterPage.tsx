import {useState} from "react";
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Divider} from "../../components/Divider.tsx";
import {Checkmark, Input, RadioCollection, Select} from "../../components/FormFields.tsx";
import { BiEuro, BiSolidStar, BiTrash } from "react-icons/bi";
import {Slider} from "../../components/Slider.tsx";
import {TextLink} from "../../components/Buttons.tsx";

export const SearchFilterPage = () => {
    const [t] = useTranslation();
    
    const [priceFrom, setPriceFrom] = useState();
    const [slider, setSlider] = useState<number | number[]>([0, 100]);
    const [stops, setStops] = useState();
    
    const pageTitle = t("pages/search:SearchFilterPage.title");
    SetPageTitle(pageTitle);

    return(
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full">
                <div>
                    <div className="form-label">Preis</div>
                    <div className="grid grid-cols-3 justify-center items-center">
                        <Input
                            trailing={<BiEuro className="icon-md text-gray-500" />}
                            value={priceFrom}
                            fullWidth={true}
                        />
                        <span className="text-center">bis</span>
                        <Input
                            trailing={<BiEuro className="icon-md text-gray-500" />}
                            value={priceFrom}
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

                <Divider className="my-8" />
                
                <div>
                    <div className="form-label">Zwischenstopps</div>
                    <RadioCollection 
                        columns={2}
                        value={stops} 
                        setValue={setStops} 
                        items={[
                            {value: 1, label: "Zwischenstopp möglich"},
                            {value: 2, label: "Keine Zwischenstopps"}
                        ]}
                    />
                </div>

                <Divider className="my-8" />
                
                <div>
                    <div className="form-label">Bewertung</div>
                    <div className="flex justify-between">
                        <Checkmark className="flex items-center gap-1" 
                                   label={<span className="flex items-center">1<BiSolidStar className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">2<BiSolidStar className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">3<BiSolidStar className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">4<BiSolidStar className="icon text-yellow-400"/></span>}
                        />
                        <Checkmark className="flex items-center gap-1"
                                   label={<span className="flex items-center">5<BiSolidStar className="icon text-yellow-400"/></span>}
                        />
                    </div>
                </div>

                <Divider className="my-8" />
                
                <div>
                    <Select
                        label="Stauraum"
                        fullWidth={true}
                        options={{
                            1: "1 Handgepäcksstück"
                        }}
                    />
                </div>

                <Divider className="my-8" />
                
                <div>
                    <Select
                        label="Präferenzen"
                        fullWidth={true}
                        options={{
                            1: "Keine Angabe"
                        }}
                    />
                </div>
                
                <Divider className="my-8" />
                
                <div>
                    <Select
                        label="Musikgeschmack"
                        fullWidth={true}
                        options={{
                            1: "Keine Angabe"
                        }}
                    />
                </div>
                
                <div className="w-full flex justify-center mt-8">
                    <TextLink
                        variant="accent"
                        leading={<BiTrash className="icon-md"/>}
                        text="Filter zurücksetzen"
                    />
                </div>
            </div>
            
            <BottomNavigationBar selected="search"/>
        </>
    );
}
