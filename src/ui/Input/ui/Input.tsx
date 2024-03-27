import React, { InputHTMLAttributes } from 'react'
import cls from './Input.module.scss'
import { classNames } from '../../helpers/Classnames/classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    theme?: InputThemes
}
enum InputThemes {
    GREEN = '_green',
    RED = '_red',
}
export const Input = (props: InputProps) => {
    return (
        <input {...props} className={classNames(cls.Input, {}, [])}>
        </input>
    )
}