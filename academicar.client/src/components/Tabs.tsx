import {Tab, TabGroup, TabList} from "@headlessui/react";
import {ReactNode} from "react";

// The object definition of a tab.
interface TabInfo {
    name: string
    icon?: ReactNode
    count?: number
}

// The props that can be passed to the tabs component.
interface TabsProps {
    items: Array<TabInfo>
    current?: number // This index will be selected on page load. Starts at 0.
    className?: string
    children?: ReactNode
}

export const Tabs = (props: TabsProps) => {
    return (
        <TabGroup className={'w-full' + (props.className ? (' ' + props.className) : '')}
                  defaultIndex={(props?.current ?? 0) <= props.items.length ? props.current : 0}>

            <TabList className="w-full flex">

                {props.items.map((tab) => (
                    <Tab id={tab.name}
                         key={tab.name}
                         className="group overflow-hidden outline-none flex flex-1 justify-center items-center border-b-2 py-2 px-1 body-2 border-gray-300 data-[selected]:border-primary-600 data-[selected]:text-primary-600">

                        {tab.icon ? <span className="shrink-0">{tab.icon}</span> : ''}

                        <span className="px-2 line-clamp-2">{tab.name}</span>

                        {tab.count ?
                            <span className="badge bg-gray-400 text-white group-data-[selected]:bg-primary-600">
                            {tab.count}
                        </span> : ''}

                    </Tab>
                ))}

            </TabList>

            {props.children}

            {/* This is an example of how the content of the different pages can be set up. Pass the following as children:*/}
            {/*<TabPanels>*/}
            {/*    <TabPanel>Content 1</TabPanel>*/}
            {/*    <TabPanel>Content 2</TabPanel>*/}
            {/*    <TabPanel>Content 3</TabPanel>*/}
            {/*</TabPanels>*/}

        </TabGroup>
    );
}