import {Button, Rating, SimpleGrid} from "@mantine/core";
import {ToDoListItem} from "./ToDoListItem.tsx";
import {useEffect, useState} from "react";
import {ToDoType} from "../../types/ToDoType.ts";
import {getTodos} from "./api/get-todos.ts";
import {IconRotateClockwise} from "@tabler/icons-react";

export const ToDoList = () => {
    const [data, setData] = useState<ToDoType[]>([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (value > 0) {
                    queryParams.append('priority', value.toString());
                }
                queryParams.append('isDone', 'false');

                const response = await getTodos(`?${queryParams.toString()}`);
                setData(response);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        fetchData();
    }, [value]);

    const handleReset = () => {
        setValue(0);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'right', paddingBottom: "20px"}}>
                <Rating value={value} count={3} onChange={setValue} size={"xl"}/>
                <Button style={{backgroundColor: "white"}} w={50} onClick={handleReset} rightSection={<IconRotateClockwise size="2rem" stroke={1.5} color="#000000"/>}/>
            </div>
            <div style={{width: '100%'}}>
                <SimpleGrid cols={4} spacing="lg" verticalSpacing="lg">
                    {data.map((item) => <ToDoListItem key={item.id} item={item}/>)}
                </SimpleGrid>
            </div>
        </div>
    )
};