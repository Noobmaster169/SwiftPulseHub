import { TaskData, SprintData } from './interface';

/* Update a Sprint to the Database */
export async function updateSprint(newData:SprintData) {
    try {
        const res = await fetch('/api/sprint/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Add a Sprint to the Database */
export async function addSprint(data:SprintData) {
    try {
        const res = await fetch('/api/sprint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Delete a Sprint from the Database */
export async function deleteSprint(id:string) {
    try {
        const res = await fetch('/api/sprint/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Fetch the list of Sprints from the Database */
export async function fetchSprint() {
    try {
        const response = await fetch('/api/sprint');       
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        return data.databases;
    } catch (error) {
        console.error('Error:', error);
        alert('Data Connection Error. Check your network connection!');
    }
}