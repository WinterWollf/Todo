import {IconHistory, IconListCheck, IconPencilPlus, IconUserCircle, IconPasswordUser} from "@tabler/icons-react";
import {NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import { useIsAdmin } from "../hooks/useIsAdmin.ts";

export const AppNavbar = () => {
    const navigate = useNavigate();
    const isAdmin = useIsAdmin();

    return (
        <div>
            <NavLink
                onClick={() => navigate('/todo')}
                label="ToDo List"
                leftSection={<IconListCheck size="1rem" stroke={1.5} id="todo-button"/>}
            />
            <NavLink
                onClick={() => navigate('/todo/new')}
                label="Add task"
                leftSection={<IconPencilPlus size="1rem" stroke={1.5} id="add-todo-button"/>}
            />
            <NavLink
                onClick={() => navigate('/history')}
                label="Task History"
                leftSection={<IconHistory size="1rem" stroke={1.5} id="tasks-history-button"/>}
            />
            <NavLink
                onClick={() => navigate('/profile')}
                label="Profile"
                leftSection={<IconUserCircle size="1rem" stroke={1.5}/>}
            />
            {}
            {isAdmin && (
                <NavLink
                    onClick={() => navigate('/admin')}
                    label="Admin"
                    leftSection={<IconPasswordUser size="1rem" stroke={1.5}/>}
                />
            )}
        </div>
    )
}