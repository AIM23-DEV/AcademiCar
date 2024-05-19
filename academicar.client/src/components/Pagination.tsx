import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {Button} from "./Buttons.tsx";
import {useState} from "react";

interface PaginationProps {
    page: number
    totalPages: number
    showPages?: boolean
    className?: string
}

// Todo allow loading new data on setPage
export const Pagination = (props: PaginationProps) => {
    let [page, setPage] = useState(props.page);

    return (
        <div
            className={'w-full flex flex-col items-center justify-center space-y-2 max-w-md text-gray-950' +
                (props.className ? (' ' + props.className) : '')}>

            {props.showPages ?
                <span className="w-full text-center">Seite {<span className="font-bold">{page}</span>} von {<span
                    className="font-bold">{props.totalPages}</span>}</span>
                : ''}

            <div className="w-full flex flex-row items-center justify-between space-x-3 max-w-md">

                <Button variant="outline" text="Zurück" fullWidth disabled={page == 1}
                        onClick={() => setPage(page == 1 ? 1 : page - 1)}
                        leading={<BiChevronLeft className="icon-md"/>}/>

                <Button variant="outline" text="Weiter" fullWidth disabled={page == props.totalPages}
                        onClick={() => setPage(page == props.totalPages ? props.totalPages : page + 1)}
                        trailing={<BiChevronRight className="icon-md"/>}/>

            </div>

        </div>
    );
}