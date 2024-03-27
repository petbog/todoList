import React from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from '../../../../ui/helpers/Classnames/classnames';
import { Button } from '../../../../ui/Button';
import { ButtonTheme } from '../../../../ui/Button/ui/Button';

interface SidebarProps {
    className?: string
}
export const Sidebar = ({ className = "" }: SidebarProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const onTpoggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testId="sidebar-toggle"
                onClick={onTpoggle}
                className={cls.collapsedBtn}
                theme={ButtonTheme.CLEAR_BLUE}

            >
                {collapsed ? '>' : '<'}

            </Button>

        </div>
    );
};
