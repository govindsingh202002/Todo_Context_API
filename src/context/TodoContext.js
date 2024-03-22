import React,{ createContext,useContext } from "react";

export const TodoContext=createContext({
    todos:[{
        id:1,
        todo:"Msg",
        isCompleted:false
    }],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    ToggleTodo:(id)=>{}
});

export const TodoProvider=TodoContext.Provider;

export const useTodo=()=>{
   return useContext(TodoContext);
}