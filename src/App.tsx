import { title } from 'process';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoList_Id: string]: Array<TaskType>
}
function App(): JSX.Element {
    const todoList_1 = v1()
    const todoList_2 = v1()
    const [todoList, setTodolist] = useState<Array<TodoListType>>([
        { id: todoList_1, title: 'What to learn', filter: 'All' },
        { id: todoList_2, title: 'What to buy', filter: 'Active' },
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList_1]: [
            { id: v1(), title: 'Html & CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ES6/TS', isDone: false },
            { id: v1(), title: 'React', isDone: false },
        ],
        [todoList_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Solt', isDone: false },
            { id: v1(), title: 'Meat', isDone: false },
        ],
    })
    const changeTodoListFilter = (filter: FilterValuesType, todoList_Id: string) => {
        setTodolist(todoList.map(tl => tl.id === todoList_Id ? { ...tl, filter: filter } : tl))
    }
    const removeTask = (taskId: string, todoList_Id: string) => {
        setTasks({ ...tasks, [todoList_Id]: tasks[todoList_Id].filter(task => task.id !== taskId) })
    }
    const addTask = (title: string, todoList_Id: string) => {
        const newTask: TaskType = { id: v1(), title: title, isDone: false }
        setTasks({ ...tasks, [todoList_Id]: [newTask, ...tasks[todoList_Id]] })
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoList_Id: string) => {
        setTasks({
            ...tasks, [todoList_Id]: tasks[todoList_Id]
                .map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t)
        })

    }
    const removeTodoList = (todoList_Id: string) => {
        setTodolist(todoList.filter(tl => tl.id !== todoList_Id))
        delete tasks[todoList_Id]
    }


    const getFilteredTaskRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case 'Active': return tasksList.filter(t => !t.isDone)
            case 'Completed': return tasksList.filter(t => t.isDone)
            default: return tasksList
        }
    }
    const todoListComponent = todoList.map(tl => {
        const tasksForRender: Array<TaskType> = getFilteredTaskRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoList_Id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForRender}
                removeTask={removeTask}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })
    return (
        <div className='App'>
            {todoListComponent}
        </div>
    )

}
export default App;

