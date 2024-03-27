import React, { ButtonHTMLAttributes } from 'react'
import cls from './Button.module.scss'
import { classNames } from '../../helpers/Classnames/classnames'

export enum ButtonTheme {
    CLEAR_BLUE = 'clear-blue',
    CLEAR_GREEN = 'clear-green',
    GREEN = 'green',
    BLUE = 'blue',
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme: ButtonTheme,
    onClick?: () => void,
    disabled?: boolean,
    color?: 'orange' | 'blue' | 'red'
}
export const Button = (props: ButtonProps) => {
    const {
        className = '',
        theme,
        disabled,
        children,
        onClick,
        color,
    } = props
    return (
        <button onClick={onClick} disabled={disabled} className={classNames(cls.Button, { [cls[theme]]: true }, [className])}>
            {children}
        </button>
    )
}