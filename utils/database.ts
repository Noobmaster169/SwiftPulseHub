interface TaskData {
    name?: string;
    description?: string;
    status?: string;
    assigned?: string;
}

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