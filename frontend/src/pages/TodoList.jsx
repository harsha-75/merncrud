import React, { useEffect, useState } from 'react';
import TodoHeader from '../Component/TodoHeader';
import Addtodoform from '../Component/Addtodoform';
import axiosInstance from '../utils/axiosInstance';
import Logout from './Logout';
function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = async (content) => {
        try {
            const response = await axiosInstance.post("/todo", { content });
            if (response.data && response.data.todo) {
                setTodos([...todos, response.data.todo]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axiosInstance.delete(`/delete/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const updateTodo = async (id, newText) => {
        try {
            await axiosInstance.put(`/edit-todo/${id}`, { content: newText });
            setTodos(
                todos.map((todo) =>
                    todo._id === id ? { ...todo, content: newText } : todo
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEditTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const getAllTodos = async () => {
        try {
            const response = await axiosInstance.get('/getall');
            if (response.data && response.data.todos) {
                setTodos(response.data.todos);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <div className="flex justify-end items-center mb-5 flex-end">
                    <Logout /> {/* Add the Logout component */}
                </div>
            <TodoHeader />
                <h1 className="text-3xl font-bold text-center mb-10">Todo List</h1>
            <Addtodoform addTodo={addTodo} />
            <ul className="max-w-md mx-auto mt-10 space-y-2">
                {todos.map((todo) => (
                    <li key={todo._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        {todo.isEditing ? (
                            <input
                                type="text"
                                defaultValue={todo.content}
                                onBlur={(e) => updateTodo(todo._id, e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        updateTodo(todo._id, e.target.value);
                                    }
                                }}
                                className="w-full py-2 px-3 border rounded"
                            />
                        ) : (
                            <span className="flex-1">{todo.content}</span>
                        )}
                        <div className="flex space-x-2 ml-4">
                            <button
                                onClick={() => toggleEditTodo(todo._id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                            >
                                {todo.isEditing ? 'Save' : 'Edit'}
                            </button>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
