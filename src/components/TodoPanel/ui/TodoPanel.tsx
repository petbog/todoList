import React from 'react'
import cls from './TodoPanel.module.scss'
import { Button } from '../../../ui/Button'
import { ButtonTheme } from '../../../ui/Button/ui/Button'
import { Input } from '../../../ui/Input'
import { formatDate } from '../../helpers/NewData/NewData'
import { TodoInput } from './TodoInput/TodoInput'
import axios from '../../../components/helpers/axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../ReduxStore/store'
import { modalIsOpenSet, selectIsOpenModal } from '../../../ReduxStore/slices/ModalSlice'
import { useSelector } from 'react-redux'
import { selectTask } from '../../../modules/TodoList/ui/slice/TodoSlice'

const DEFAULT_TODO = {
    name: '',
    deadline: '',
}
const DEFAULT_TODO_TASK = [{
    id: 1,
    name: '',
    description: '',
    checked: false
}]

export const TodoPanel = () => {

    const navigate = useNavigate();

    const { edit } = useSelector(selectIsOpenModal);
    const { updateTodo } = useSelector(selectTask)

    const [todo, setTodo] = React.useState(DEFAULT_TODO)

    const [tasks, setTasks] = React.useState(DEFAULT_TODO_TASK)


    React.useEffect(() => {
        if (edit) {
            setTodo({ ...updateTodo, deadline: updateTodo.deadline.slice(0, -5) })
            setTasks(updateTodo?.tasks)
        } else {
            setTodo(DEFAULT_TODO)
            setTasks(DEFAULT_TODO_TASK)
        }
    }, [updateTodo, edit])
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTodo({ ...todo, [name]: value })
    }

    const dispatch = useAppDispatch()

    const onClick = async () => {
        if (todo.name.length > 1 && tasks[0].name.length > 1) {
            try {
                const date = formatDate();
                const deadlineFom = formatDate(todo.deadline)
                const deadlineFomDate = new Date(deadlineFom)
                const dateForDate = new Date(date)
                const deadline = deadlineFomDate > dateForDate ? deadlineFom : ''
                const todoBody = {
                    ...todo, deadline, tasks, date: date,
                }
                const { data } = edit
                    ? await axios.patch(`/todo/${updateTodo._id}`, todoBody)
                    : await axios.post(`/todo`, todoBody)
                setTasks(DEFAULT_TODO_TASK)
                setTodo(DEFAULT_TODO)
                dispatch(modalIsOpenSet())

            } catch (error) {
                console.warn(error);
                alert('Ошибка загрузки');
            }

        }
    }

    const onClickTask = () => {
        setTasks([...tasks, {
            id: tasks.length + 1,
            name: '',
            description: '',
            checked: false
        }])
    }

    const onClickTaskDelete = () => {
        setTasks(tasks.filter((_, i) => i !== tasks.length - 1))
    }
    const onClickClose = () => {
        dispatch(modalIsOpenSet())
    }

    return (
        <div className={cls.TodoPanel}>
            <button onClick={onClickClose} className={cls.btn_close}><span></span></button>
            <div className={cls.fields_container}>
                <div className={cls.field_container}>
                    <label htmlFor="name ">
                        <Input maxLength={80} value={todo.name} placeholder='Событие' onChange={onChange} name='name' id='name ' type="text" />
                    </label>
                </div>
                <div className={cls.tasks_container}>
                    {tasks.map((e, i) =>
                        <TodoInput
                            task={e}
                            tasks={tasks}
                            setTask={setTasks}
                            id={e.id}
                            key={i} />)}
                    <div className={cls.button_container}>
                        {tasks.length < 6 && <Button onClick={onClickTask} theme={ButtonTheme.CLEAR_BLUE}>Добавить </Button>}
                        {tasks.length > 1 && <Button onClick={onClickTaskDelete} theme={ButtonTheme.CLEAR_BLUE}>Удалить </Button>}
                    </div>
                    <div className={cls.field_container}>
                        <label className={cls.field_input_date} htmlFor="deadline ">
                            <p>Выполнить до:</p>
                            <Input
                                value={todo.deadline}
                                placeholder='Крайний срок'
                                onChange={onChange}
                                name='deadline'
                                id='deadline '
                                type="datetime-local" />
                        </label>
                    </div>
                </div>
                <div className={cls.button_container}>
                    <Button
                        onClick={onClick}
                        theme={ButtonTheme.CLEAR_BLUE}>
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    )
}