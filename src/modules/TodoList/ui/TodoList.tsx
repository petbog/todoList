import React from 'react'
import cls from './TodoList.module.scss'
import { TodoItem } from '../../../components/TodoItem';
import { useSelector } from 'react-redux';
import { Status, fetchTodo, fetchTodoComplited, selectTask } from './slice/TodoSlice';
import { useAppDispatch } from '../../../ReduxStore/store';
import { Loading } from '../../../components/Loading/LoadingSvg';
import { selectIsOpenModal } from '../../../ReduxStore/slices/ModalSlice';
import { Search } from '../../../components/Search';
import { selectSearch } from '../../../ReduxStore/slices/SearchSlice';

export const TodoList = () => {
    const { items, status } = useSelector(selectTask);

    const { isOpenModal, toggle } = useSelector(selectIsOpenModal);

    const dispatch = useAppDispatch();

    const [select, setSelect] = React.useState({ name: 'Текущие', sortProperty: 'new' });

    const isLoading = status === Status.LOADING;

    const isErorr = status === Status.ERROR;
    const search = useSelector(selectSearch);
    React.useEffect(() => {

        if (!isOpenModal) {
            select.sortProperty === 'new'
                ? dispatch(fetchTodo(search))
                : dispatch(fetchTodoComplited())
        }

    }, [select, isOpenModal, toggle, search]);
    const selectItem = (obj: any) => {
        setSelect(obj);
    }
    const list = [
        { name: 'Текущие', sortProperty: 'new' },
        { name: 'Завершённые', sortProperty: 'сompleted' },
    ]

    if (isErorr) {
        return <div>К сожалению связаться с сервером не удалось</div>
    }

    return (
        <>
            <div className={cls.select}>
                {list.map(obj =>
                    <span
                        key={obj.name}
                        className={obj.sortProperty === select.sortProperty ? cls.active : ''}
                        onClick={() => selectItem(obj)}
                    >{obj.name}
                    </span>)}
                {select.sortProperty === "new" && <Search />}
            </div>
            <div className={cls.TodoList}>

                {isLoading ? <Loading /> :
                    items?.map((todo, i) => <TodoItem key={i} todo={todo} />)}
            </div>
        </>
    )
}