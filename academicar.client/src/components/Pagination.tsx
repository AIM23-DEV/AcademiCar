import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {Button} from "./Buttons.tsx";
import {Stepper} from "./Stepper.tsx";
import {ReactNode} from "react";

interface PaginationProps {
    page: number;
    setPage: (val: number) => void;
    totalPages: number;
    showPages?: boolean;
    className?: string;

    textPage: string;
    textPrev: string;
    textNext: string;
    button?: ReactNode;
}

// This is only used in the create trip process
export const Pagination = (props: PaginationProps) => {
    return (
        <div
            className={'flex flex-col items-center justify-center space-y-2 max-w-md text-gray-950 mx-auto' +
                (props.className ? (' ' + props.className) : '')}>

            {props.showPages ?
                <Stepper steps={props.totalPages} current={props.page} className="mb-2"/>
                : ''}

            <div className="w-full flex flex-row items-center justify-between space-x-3 max-w-md">

                <Button variant="outline" text={props.textPrev}
                        fullWidth disabled={props.page == 1}
                        onClick={() => props.setPage(props.page == 1 ? 1 : props.page - 1)}
                        leading={<BiChevronLeft className="icon-md"/>}/>

                {props.button === undefined ?
                    <Button variant="outline" text={props.textNext}
                            fullWidth disabled={props.page == props.totalPages}
                            onClick={() => props.setPage(props.page == props.totalPages ? props.totalPages : props.page + 1)}
                            trailing={<BiChevronRight className="icon-md"/>}
                    />
                    : props.button}
            </div>

        </div>
    );
}