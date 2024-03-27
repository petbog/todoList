import React from 'react'
import cls from './TodoTask.module.scss'
import { classNames } from '../../../ui/helpers/Classnames/classnames'
import { Task, Todo } from '../../../pages/MainPage/types'
import { Button, ButtonTheme } from '../../../ui/Button/ui/Button'

interface TodoTaskProps {
    task: Task,
    checkedTask: (id: number) => void,
    removeTask: (id: number) => void,
    last: boolean,
    complitedTask: boolean
}
export const TodoTask = ({ task, checkedTask, removeTask, last, complitedTask }: TodoTaskProps) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const descriptionToggle = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className={classNames(cls.todo_item_task_container, { [cls.todo_item_checked]: task.checked }, [])}>
            <label htmlFor={task.name} className={cls.todo_item_task_label}>
                <input checked={task.checked} type="checkbox" name={task.name} id={task.name} />
                <span onClick={() => checkedTask(task.id)} className={cls.checkBox}></span>
                <h4 className={cls.todo_item_task_title}>{task.name}
                    <button
                        className={classNames(cls.description_btn, { [cls.description_btn_active]: isOpen }, [])}
                        onClick={descriptionToggle}><span></span>
                    </button>
                </h4>
                <p className={classNames(cls.todo_item_description, { [cls.todo_item_description_active]: isOpen }, [])}>
                    {task.description}
                </p>
            </label>
            <div className={cls.todo_item_button_container}>
                {!last && complitedTask && <Button onClick={() => removeTask(task.id)} disabled={task.checked} theme={ButtonTheme.GREEN}>Удалить</Button>}
            </div>
            <hr />
        </div>
    )
}