interface StepperProps {
    steps: number
    current: number
    className?: string
}

export const Stepper = (props: StepperProps) => {
    // Check if combination of steps & current is valid.
    if (props.current < 0 || props.current > props.steps) {
        console.error("Could not load stepper with steps=" + props.steps + " and current=" + props.current);
        return null;
    }

    return (
        <div
            className={'inline-flex flex-row items-center caption space-x-2' + (props.className ? (' ' + props.className) : '')}>
            <span>Schritt {props.current} / {props.steps}</span>
            <ul className="inline-flex flex-row items-center space-x-2">
                {[...Array(props.steps)].map((_e, i) => {

                    if (i < props.current - 1) {
                        // Finished step
                        return <li key={'step-' + i}
                                   className="h-2.5 w-2.5 bg-primary-500 rounded-full"/>
                    } else if (i == props.current - 1) {
                        // Current step
                        return <li key={'step-' + i}
                                   className="h-2.5 w-2.5 bg-primary-500 rounded-full ring-2 ring-primary-500/50"/>
                    } else {
                        // Future step
                        return <li key={'step-' + i}
                                   className="h-2.5 w-2.5 bg-gray-300 rounded-full"/>
                    }

                })}
            </ul>
        </div>
    );
}