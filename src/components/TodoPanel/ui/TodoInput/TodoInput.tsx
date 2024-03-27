import React from 'react'
import cls from './TodoInput.module.scss'
import { Input } from '../../../../ui/Input'
interface TodoInputProps {
    task: any,
    setTask: any,
    tasks: any,
    id: number
}


export const TodoInput = ({ task, setTask, tasks, id }: TodoInputProps) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTask(tasks.map((e: { id: number; task: string; description: string }) => {
            if (e.id === id) {
                return {
                    ...e,
                    [name]: value
                }
            }
            return e
        }))
    }
    return (
        <div className={cls.TodoInput}>
            <div className={cls.field_container} >
                <label htmlFor="name">
                    <Input maxLength={80} onChange={onChange} placeholder='Название задачи' value={task.name} name='name' id='name' type="text" />
                </label>
            </div>
            <div className={cls.field_container} >
                <label htmlFor="description">
                    <Input onChange={onChange} placeholder='Описание задачи' value={task.description} name='description' id='description' type="text" />
                </label>
            </div>
        </div>
    )
}