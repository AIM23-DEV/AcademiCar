import {Fragment, ReactNode} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {BiError} from 'react-icons/bi'
import {Button} from "./Buttons.tsx";


interface ModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children?: ReactNode
}

export function Modal(props: ModalProps) {
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog className="relative z-50" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 transition-opacity backdrop-blur-sm"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 translate-y-4"
                            enterTo="opacity-100 translate-y-0"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-4"
                        >
                            <Dialog.Panel
                                className="relative bottom-16 w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-4 py-6 shadow-lg transition-all">

                                {props.children}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

interface ConfirmationModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    icon?: ReactNode
    title?: string | ReactNode
    subtitle?: string | ReactNode
    variant?: 'primary' | 'secondary' | 'accent' // Todo warning when warning button is added
    onConfirm?: any
    cancelText?: string
    confirmText?: string
}

export function ConfirmationModal(props: ConfirmationModalProps) {
    let iconColorClasses;
    switch (props.variant) {
        case 'primary':
            iconColorClasses = 'bg-primary-600/15 text-primary-900';
            break;
        case 'secondary':
            iconColorClasses = 'bg-secondary-600/15 text-secondary-900';
            break;
        case 'accent':
        default:
            iconColorClasses = 'bg-accent-600/15 text-accent-900';
            break;
    }

    return (
        <Modal open={props.open} setOpen={props.setOpen}>
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div
                    className={'h-12 w-12 flex items-center justify-center rounded-full ' + iconColorClasses}>
                    {props.icon ? props.icon : <BiError className="icon-lg"/>}
                </div>

                <div>
                    <Dialog.Title as="h4" className="headline-4 mt-6">
                        {props.title ? props.title : 'Bist du sicher?'}
                    </Dialog.Title>
                    <p className="mt-3 body-1">
                        {props.subtitle ? props.subtitle : ''}
                    </p>
                </div>

                <div className="w-full mt-6 space-y-3 -mb-2">

                    <Button variant="outline" fullWidth
                            text={props.cancelText ?? 'Abbrechen'}
                            onClick={() => props.setOpen(false)}/>

                    <Button variant={props.variant ?? 'accent'} fullWidth
                            text={props.confirmText ?? 'Bestätigen'}
                            onClick={props.onConfirm}/>

                </div>
            </div>
        </Modal>
    );
}