import {Outlet, useNavigate} from "react-router-dom";
import {AppNavbar} from "./AppNavbar.tsx";
import {ActionIcon, AppShell, Burger, Group} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconLogout} from "@tabler/icons-react";
import {logOut} from "../features/logout/api/logout.ts";

export const Layout = () => {
    const [opened, {toggle}] = useDisclosure();
    const navigate = useNavigate();

    const handleClick = () => {
        logOut().then(() => {
            navigate('/login');
        });
    };

    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
                    <div>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </div>
                    <div>
                        <ActionIcon onClick={handleClick} variant="filled" aria-label="Settings" style={{ background: "white" }}>
                            <IconLogout style={{ width: '100%', height: '100%', color: "black" }} stroke={1.5} />
                        </ActionIcon>
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppNavbar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}