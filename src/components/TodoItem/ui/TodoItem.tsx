import React from 'react'
import cls from './TodoItem.module.scss'
import { Todo } from '../../../pages/MainPage/types'
import { Button } from '../../../ui/Button'
import { ButtonTheme } from '../../../ui/Button/ui/Button'
import { classNames } from '../../../ui/helpers/Classnames/classnames'
import { TodoTask } from '../../TodoTask'
import axios from '../../helpers/axios'
import { useAppDispatch } from '../../../ReduxStore/store'
import { editSet, modalIsOpenSet, toggleSet } from '../../../ReduxStore/slices/ModalSlice'
import { formatDate, formattedDateDeadline } from '../../helpers/NewData/NewData'
import { updateTodo } from '../../../modules/TodoList/ui/slice/TodoSlice'
interface TodoItemProps {
    todo: Todo,
}
export const TodoItem = ({ todo }: TodoItemProps) => {
    const deadlineFormat = formattedDateDeadline(todo.deadline);

    const dispatch = useAppDispatch();

    const [deadline, setDeadline] = React.useState(false);
    const [latsTask, setLatsTask] = React.useState(false);
    const [complitedTask, setComplitedTask] = React.useState(false);

    React.useEffect(() => {
        const fullChecked = todo.tasks.some(e => e.checked === false)

        if (todo.deadline) {
            const newData = formatDate();
            if (newData > todo.deadline && fullChecked) {
                setDeadline(true)
            }
        }
        if (todo.tasks.length < 2) {
            setLatsTask(true)
        }
        if (fullChecked) {
            setComplitedTask(true)
        }
    }, [])

    const checkedTask = async (id: number) => {
        try {
            const files = [
                ...todo.tasks.map(task => {
                    if (task.id === id) {
                        return { ...task, checked: !task.checked }
                    }
                    return task
                })
            ]
            const { data } = await axios.patch(`/todo/checked/${todo._id}`, { files })
            dispatch(toggleSet())
        } catch (error) {
            console.log(error)
        }
    }

    const update = async (todo: Todo) => {
        dispatch(editSet())
        dispatch(updateTodo(todo))
        await dispatch(modalIsOpenSet())
    }

    const removeTask = async (id: number) => {
        try {
            const files = [
                ...todo.tasks.filter(task => task.id !== id),
            ]
            const { data } = await axios.patch(`/todo/remove_task/${todo._id}`, { files })
            dispatch(toggleSet())
        } catch (error) {
            console.log(error)
        }
    }
    const onClickDeleteTodo = async (id: string) => {
        try {
            const data = await axios.delete(`/todo/${id}`)
            dispatch(toggleSet())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={classNames(cls.todo_item_container, { [cls.todo_item_deadline]: deadline, }, [])}>
            <span className={classNames(cls.todo_item_dedline_block, { [cls.todo_item_dedline_block_active]: deadline, }, [])}>
                просрочена
            </span>
            <button onClick={() => onClickDeleteTodo(todo._id)} className={cls.btn_delete}><span></span></button>
            <h3>{todo.name}</h3>
            <div className={cls.todo_item_task_container}>
                {todo.tasks.map((task, id) =>
                    <TodoTask complitedTask={complitedTask} last={latsTask} checkedTask={checkedTask} removeTask={removeTask} key={id} task={task} />)}
                {complitedTask && <Button onClick={() => update(todo)} className={cls.btn_update} theme={ButtonTheme.CLEAR_GREEN}>Изменить</Button>}
            </div>
            {todo.deadline && <p className={cls.todo_item_data}>
                До {deadlineFormat}
            </p>}
        </div>
    )
}