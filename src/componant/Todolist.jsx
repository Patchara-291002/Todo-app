import { useState, useEffect } from 'react';
import editicon from '../assets/edit.svg';
import deleteicon from '../assets/bin.svg';
import complete from '../assets/complete.svg'

const Todolist = () => {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }

    });
    const [todo, setTodo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value })
        console.log(currentTodo, "CurrentTodo");
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])

    function handleInputChange(e) {
        setTodo(e.target.value); // set this input to todo 
    }

    function handleFormSubmit(e) { // 1. submit form

        e.preventDefault(); // prevent browser auto refresh

        if (todo !== "") {  // if todo is not " "
            setTodos([ // set function todo to array todos [] contain id and text
                ...todos,
                {
                    id: todos.length + 1, // id = lenght todos + 1 
                    text: todo.trim(), // text from todo then trim space
                    complete: false
                }
            ])
        }

        setTodo("");
    }

    function handleDeleteClick(id) {
        const removedItem = todos.filter((todo) => {
            return todo.id != id
        })

        setTodos(removedItem);

    }
    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({ ...todo })
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });

        setIsEditing(false);
        setTodos(updatedItem);

    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);

    }

    function handleIsComplete(id) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, complete: !todo.complete };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    console.log(todos);

    return (
        <>
            <div className='flex min-h-screen justify-center'>
                <div className='p-3 rounded-xl lg:w-5/12 w-9/12 max-w-lg'>
                    {isEditing ? (
                        <form onSubmit={handleEditFormSubmit} className='flex flex-col lg:flex-row justify-between gap-3'>
                            <input
                                type='text'
                                name='editTodo'
                                placeholder='Edit Todo'
                                value={currentTodo.text}
                                onChange={handleEditInputChange}
                                className="input bg-white w-full max-w-lg text-black font-semibold drop-shadow-lg"
                            />
                            <button type="submit" className='btn btn-success text-white drop-shadow-lg'>Update</button>
                            <button onClick={() => setIsEditing(false)} className='btn btn-error text-white drop-shadow-lg'>Cancel</button>
                        </form>
                    ) : (
                        <form onSubmit={handleFormSubmit} className='flex justify-between gap-3'>
                            <input
                                type="text"
                                name="todo"
                                placeholder="Create"
                                value={todo}
                                onChange={handleInputChange}
                                className="input bg-white w-full max-w-lg text-black font-semibold drop-shadow-lg"
                            />
                            <button type='submit' className='btn btn-success text-white drop-shadow-lg'>Add</button>
                        </form>
                    )}
                    <div>
                        <ul className='mt-5'>
                            {todos.filter(todo => !todo.complete).map((todo) => (
                                <div className='bg-white p-4 my-2 rounded-xl drop-shadow-lg hover:scale-105 hover:ease-in-out duration-300'>
                                    <li key={todo.id} className='flex justify-between font-semibold text-black'>
                                        <button ><img src={complete} alt="complete" onClick={() => handleIsComplete(todo.id)}
                                            className={todo.complete ? 'opacity-50' : ''}
                                        /></button>
                                        <p className={todo.complete ? 'line-through opacity-50' : ''}>{todo.text}</p>
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleEditClick(todo)}><img src={editicon} className='hover:scale-125 hover:ease-in-out duration-200 drop-shadow-lg' /></button>
                                            <button onClick={() => handleDeleteClick(todo.id)}><img src={deleteicon} className='hover:scale-125 hover:ease-in-out duration-200 drop-shadow-lg' /></button>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                        {todos.some(todo => todo.complete) ? (
                            <p className='text-2xl text-center text-success font-semibold mt-10'>COMPLETE</p>
                        ) : ""}
                        <ul className=''>
                            {todos.filter(todo => todo.complete).map((todo) => (
                                <>
                                    <div className='bg-slate-100 p-4 my-2 rounded-xl drop-shadow-lg hover:scale-105 hover:ease-in-out duration-300'>
                                        <li key={todo.complete} className='flex justify-between font-semibold text-black'>
                                            <button ><img src={complete} alt="complete"
                                                className={todo.complete ? 'opacity-50' : ''}
                                            /></button>
                                            <p className={todo.complete ? 'line-through opacity-50 text-center' : ''}>{todo.text}</p>
                                            <div className='flex gap-3'>

                                                <button onClick={() => handleDeleteClick(todo.id)}><img src={deleteicon} className='hover:scale-125 hover:ease-in-out duration-200 drop-shadow-lg' /></button>
                                            </div>
                                        </li>
                                    </div>
                                </>
                                
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todolist