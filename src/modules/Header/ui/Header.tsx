import React from 'react'
import cls from './Header.module.scss'
import { Modal } from '../../../components/Modal/Modal';
import { TodoPanel } from '../../../components/TodoPanel';
import { Button, ButtonTheme } from '../../../ui/Button/ui/Button';
import { editCloseSet, modalIsOpenSet, selectIsOpenModal } from '../../../ReduxStore/slices/ModalSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../ReduxStore/store';

interface HeaderProps {
}
export const Header = ({ }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const [isAuthModal, setIsAuthModal] = React.useState(false);
    const { isOpenModal } = useSelector(selectIsOpenModal)
    React.useEffect(() => {
        setIsAuthModal(isOpenModal)
    }, [isOpenModal])
    const onToggleModal = React.useCallback(() => {
        dispatch(modalIsOpenSet())
        setIsAuthModal((prev) => !prev)
        dispatch(editCloseSet())
    }, []);
    return (
        <div className={cls.Header}>
            <header className='content'>
                <div className={cls.Header_container}              >
                    <Button
                        theme={ButtonTheme.GREEN}
                        onClick={onToggleModal}
                    >
                        Новая задача
                    </Button>
                    <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                        <TodoPanel />
                    </Modal>
                </div>
            </header>
        </div>
    )
}