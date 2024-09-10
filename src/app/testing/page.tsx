"use client";
import { useEffect, useState } from 'react';
import { updateTask, addTask, deleteTask, fetchTask } from '@/utils/database';

export default function DatabaseList() {
    const [databases, setDatabases] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatabases = async () => {
            try {
                const response = await fetch('/api/database');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data:", data.databases);
                setDatabases(data.databases);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchDatabases();   1
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    async function remove(){
        const id = "66d8afbdc96e0db13fab01fc";
        await deleteTask(id);
    }

    async function add(){
        const data = {
            taskName    : "My Example Task 1",
            description : "My Example Description 1",
            type        : "Story",
            status      : "Not Started",
            storyPoint  : "5",
            assignedTo  : "Mario",
            finishedBy  : "2024-09-20",
            priority    : "High",
            tags        : ["Tag1", "Tag2", "Tag3"],
            isDeleted   : false,
        };
        await addTask(data);
    }

    async function update(){
        const id = "66d8afbdc96e0db13fab01fc";
        const newData = {
            name: "Task3",
            description: "This is a task",
        };
        await updateTask(id, newData);
    }


    return (
        <>
        <button className="w-32 h-8 bg-blue-500" onClick={add}>Add Task</button>
        <div>
            <h1>Databases</h1>
            <ul>
                {databases.map((db, index) => (
                    <li key={index}>{JSON.stringify(db)}</li>
                ))}
            </ul>
        </div></>
    );
}
