import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {Button} from "./Buttons.tsx";
import {useTranslation} from "react-i18next";

interface PaginationProps {
    page: number
    setPage: (val: number) => void;
    totalPages: number
    showPages?: boolean
    className?: string
}

export const Pagination = (props: PaginationProps) => {
    const [t] = useTranslation(["components/pagination"]);
    const pageText = t("components/pagination:page");
    const previousButtonText = t("components/pagination:button_previous");
    const nextButtonText = t("components/pagination:button_next");

    return (
        <div
            className={'w-full flex flex-col items-center justify-center space-y-2 max-w-md text-gray-950' +
                (props.className ? (' ' + props.className) : '')}>

            {props.showPages ?
                <span className="w-full text-center">{pageText} {<span className="font-bold">{props.page}</span>}/{<span
                    className="font-bold">{props.totalPages}</span>}</span>
                : ''}

            <div className="w-full flex flex-row items-center justify-between space-x-3 max-w-md">

                <Button variant="outline" text={previousButtonText}
                        fullWidth disabled={props.page == 1}
                        onClick={() => props.setPage(props.page == 1 ? 1 : props.page - 1)}
                        leading={<BiChevronLeft className="icon-md"/>}/>

                <Button variant="outline" text={nextButtonText}
                        fullWidth disabled={props.page == props.totalPages}
                        onClick={() => props.setPage(props.page == props.totalPages ? props.totalPages : props.page + 1)}
                        trailing={<BiChevronRight className="icon-md"/>}/>

            </div>

        </div>
    );
}