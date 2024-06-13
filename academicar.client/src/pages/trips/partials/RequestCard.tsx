import React from "react";
import {Divider} from "../../../components/Divider.tsx";
import {BiChevronRight, BiJoystick, BiSolidStar} from "react-icons/bi";
import {TextButton} from "../../../components/Buttons.tsx";
import {useTranslation} from "react-i18next";

interface Request {
    time: string;
    user: string;
    score: number;
}

interface RequestProps {
    requests: Request[];
}

interface RequestProps {
}

// TODO re-layout
export const RequestCard: React.FC<RequestProps> = ({requests}) => {
    const [t] = useTranslation(['common', 'pages/trips']);
    return (
        <div>
            {requests.map((request, index) => (
                <React.Fragment key={index}>
                    {index != 0 ? (
                        <Divider className="my-4"/>
                    ) : (
                        <></>
                    )}
                    <div className="mb-4">
                        <b>{t("pages/trips:RequestCard.requested")}:</b> {request.time}
                    </div>

                    <div>
                        <div className="flex flex-row gap-4">
                            <div className="flex justify-center">
                                <img
                                    src="/../src/assets/react.svg"
                                    alt="avatar"
                                    className="border-gray-600 rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <div>{request.user}</div>
                                <div className="flex items-center right-full">
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-gray-300"/></span>
                                    <span className="ml-2">(4,0)</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span><BiChevronRight className="icon"/></span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-items-center">
                        <div className="mt-4">
                            <TextButton
                                variant="accent"
                                fullWidth
                                text={t('pages/trips:RequestCard.cancel')}
                                textAlign="left"
                                textFullWidth
                                leading={<BiJoystick className="icon"/>}
                                type="button"
                                disabled
                                className="mt-2"
                                onClick={() => {
                                    alert("Test");
                                }}
                            />
                        </div>
                        <div className="mt-4">
                            <TextButton
                                variant="primary"
                                fullWidth
                                text={t("pages/trips:RequestCard.accept")}
                                textAlign="left"
                                textFullWidth
                                leading={<BiJoystick className="icon"/>}
                                type="button"
                                disabled
                                className="mt-2"
                                onClick={() => {
                                    alert("Test");
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};