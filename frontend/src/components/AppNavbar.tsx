import {IconHistory, IconListCheck, IconPencilPlus, IconUserCircle} from "@tabler/icons-react";
import {NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const AppNavbar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <NavLink
                onClick={() => navigate('/todo')}
                label="ToDo List"
                leftSection={<IconListCheck size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/todo/new')}
                label="Add task"
                leftSection={<IconPencilPlus size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/history')}
                label="Task History"
                leftSection={<IconHistory size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/profile')}
                label="Profile"
                leftSection={<IconUserCircle size="1rem" stroke={1.5}/>}
            />
        </div>
    )
}