import { TaskData } from './interface';

/* Update a Task to the Database */
export async function updateTask(id:string, newData:TaskData) {
    const data = {
        id,
        ...newData,
    };
    try {
        const res = await fetch('/api/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert('Task updated successfully!');
        } else {
            const errorData = await res.json();
            alert(`Failed to add task: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Add a Task to the Database */
export async function addTask(data:TaskData) {
    try {
        const res = await fetch('/api/database', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            alert('Task added successfully!');
        } else {
            const errorData = await res.json();
            alert(`Failed to add task: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Delete a Task from the Database */
export async function deleteTask(id:string) {
    try {
        const res = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            alert('Task deleted successfully!');
        } else {
            const errorData = await res.json();
            alert(`Failed to delete task: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

/* Fetch the list of Tasks from the Database */
export async function fetchTask() {
    try {
        console.log("Fetching Data From Database");
        const response = await fetch('/api/database');
        console.log("Response Received")
                
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        return data.databases;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}