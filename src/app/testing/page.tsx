"use client";
import { useEffect, useState } from 'react';
import { updateTask, addTask, deleteTask } from '@/utils/database';

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
                setDatabases(data.databases);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchDatabases();
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
            name: "Task4",
            description: "This is a task",
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
        <button className="w-32 h-8 bg-blue-500" onClick={remove}>Add Task</button>
        <div>
            <h1>Databases</h1>
            <ul>
                {databases.map((db, index) => (
                    <li key={index}>{db}</li>
                ))}
            </ul>
        </div></>
    );
}
