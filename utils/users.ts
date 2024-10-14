import { TaskData, SprintData, UserData } from './interface';

/* Update a Sprint to the Database */
export async function updateUser(newData:UserData) {
    try {
        const res = await fetch('/api/users/edit', {
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

/* Add a User to the Database */
export async function addUser(data:UserData) {
    try {
        const res = await fetch('/api/users', {
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
export async function deleteUser(id:string) {
    try {
        const res = await fetch('/api/users/delete', {
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

/* Fetch the list of Users from the Database */
export async function fetchUsers() {
    try {
        const response = await fetch('/api/users');       
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