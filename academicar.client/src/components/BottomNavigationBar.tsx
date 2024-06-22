import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {BiSearch, BiCar, BiPlus, BiChat, BiUser} from "react-icons/bi";

interface BottomNavigationBarProps {
    selected?: 'search' | 'trips' | 'create' | 'chat' | 'profile'
    className?: string
}

// Todo proper routes
// TODO replace -999 with loggedInUserId
export const BottomNavigationBar = (props: BottomNavigationBarProps) => {
    return (
        <nav id="bottom-navigation-bar"
             className={"fixed bottom-0 inset-x-0 h-16 z-20" + (props.className ? (' ' + props.className) : '')}>

            <ul className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full h-full mx-auto max-w-2xl flex flex-row items-center justify-between px-5 sm:rounded-t-xl">

                <BottomNavigationBarItem link="/search" active={props.selected == 'search'}
                                         icon={<BiSearch className="icon-lg"/>}/>

                <BottomNavigationBarItem link="/trips/-999" active={props.selected == 'trips'}
                                         icon={<BiCar className="icon-lg"/>}/>

                <BottomNavigationBarItem link="/create/-999" active={props.selected == 'create'}
                                         icon={<BiPlus className="icon-lg"/>}/>
                
                <BottomNavigationBarItem link="/chat/-999" active={props.selected == 'chat'}
                                         icon={<BiChat className="icon-lg"/>}/>

                <BottomNavigationBarItem link="/profile/-999" active={props.selected == 'profile'}
                                         icon={<BiUser className="icon-lg"/>}/>
                
            </ul>

        </nav>
    );
}

interface BottomNavigationBarItemProps {
    active?: boolean
    link: string
    icon: ReactNode
}

export const BottomNavigationBarItem = (props: BottomNavigationBarItemProps) => {
    return (
        <li className="h-full relative w-10">
            <Link to={props.link} className={"h-full w-full flex items-center justify-center" + (props.active ? ' text-primary-600' : '')}>
                {props.icon}
            </Link>

            {props.active &&
                <div className="absolute top-0 w-full flex flex-row items-start justify-center">
                    <span className="bg-primary-600 top-0 h-[2.5px] w-10 rounded-full"></span>
                </div>}
        </li>
    );
}