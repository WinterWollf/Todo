import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider } from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import { ModalsProvider } from '@mantine/modals';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <BrowserRouter>
                <ModalsProvider>
                    <Routing />
                </ModalsProvider>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
