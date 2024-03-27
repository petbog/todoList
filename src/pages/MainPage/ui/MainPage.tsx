import cls from './MainPage.module.scss'
import { TodoList } from '../../../modules/TodoList'



export const MainPage = () => {
    return (
        <div className={cls.MainPage}>
            <div className="content">
                <TodoList />
            </div>
        </div>
    )
}