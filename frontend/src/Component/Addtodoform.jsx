import React, { useState } from 'react'
function Addtodoform({addTodo}) {
    const [todo,setTodo]=useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.trim()) {
          addTodo(todo);
          setTodo('');
        }
      };
  return (
    <div className="max-w-md mx-auto mt-10">
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Todo
      </button>
    </form>
  </div>
  )
}

export default Addtodoform
