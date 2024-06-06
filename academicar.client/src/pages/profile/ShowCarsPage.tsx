import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {BiBriefcaseAlt, BiCar, BiChevronRight, BiGroup, BiPalette} from "react-icons/bi";

// TODO add content components and follow up pages
export const ShowCarsPage = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const navigate = useNavigate();

    const pageTitle = t("pages/profile:ShowCarsPage.title");
    const newCar: string = t("pages/profile:ShowCarsPage.newcar")
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>
            <div className="w-full" onClick={() => navigate("update")}>
                <Card label="Golf GTI" className="mt-4 w-full">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex justify-left">
                            <img
                                src="/../src/assets/react.svg"
                                alt="avatar"
                                className="rounded-full w-24 h-24"
                            />
                        </div>
                        <div>
                            <div className="flex">
                                <BiCar className="icon-md mr-2"/>
                                <p>GU - 123 FH</p>
                            </div>
                            <div className="flex">
                                <BiPalette className="icon-md mr-2"/> 
                                <p>Schwarz</p>
                            </div>
                            <div className="flex">
                                <BiGroup className="icon-md mr-2"/>
                                <p>3 Sitze</p>
                            </div>
                            <div className="flex">
                                <BiBriefcaseAlt className="icon-md mr-2"/>
                                <p>Gepäckstücke</p>
                            </div>
                        </div>
                            <div className="flex justify-end items-center"><BiChevronRight className="icon-md"/></div>
                    </div>
                </Card>
            </div>

            <Button
                variant="primary"
                fullWidth
                text={newCar}
                textAlign="center"
                textFullWidth
                type="button"
                className="mt-8"
                onClick={() => navigate("create")}
            />

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
