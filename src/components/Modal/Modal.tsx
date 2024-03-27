/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactNode } from 'react';
import cls from './Modal.module.scss';

import { classNames } from '../../ui/helpers/Classnames/classnames';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen: boolean,
    onClose: () => void
}
const ANIMATION_DELAY = 200;
export const Modal = ({
    className = "", children, isOpen, onClose,
}: ModalProps) => {
    const [isClousing, setIsClousing] = React.useState(false);

    const timeRef = React.useRef<ReturnType<typeof setTimeout>>();

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClousing,
    };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const closeHandler = React.useCallback(() => {
        if (onClose) {
            setIsClousing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClousing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    React.useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div
                    className={cls.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
