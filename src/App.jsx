import { useState } from "react"
import { TodoProvider } from "./context/TodoContext.js"
import {TodoForm} from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import { useEffect } from "react";

function App() {
  const [todos,setTodos]=useState([]);
  // const {addTodo,updateTodo,deleteTodo,ToggleTodo}=useTodo();
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),todo:todo,isCompleted:false},...prev]);
    // console.log(todos)
  }
  const updateTodo=(id,todo)=>{
    todos.map((e)=>{
      if(e.id===id){
        e=todo;
      }
    })
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>(todo.id!=id)))
  }
  const ToggleTodo=(id)=>{
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
      isCompleted: !prevTodo.isCompleted } : prevTodo))
  }

  useEffect(()=>{
   const todos= JSON.parse(localStorage.getItem("todos"))
   if(todos && todos.length>0){
    setTodos(todos)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
    // console.log(todos)
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,ToggleTodo}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                    {todos?.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
