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

function App(): JSX.Element {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            { id: v1(), title: 'Html & CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ES6/TS', isDone: false },
            { id: v1(), title: 'React', isDone: false },
        ]
    )
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('All')

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === 'All') {
        tasksForRender = tasks
    } if (filter === 'Active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    } if (filter === 'Completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className='App'>
            <TodoList
                removeTask={removeTask}
                title={'What to learn'}
                tasks={tasksForRender}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
            />

            {/* <TodoList title={'What to learn'} tasks={tasks1} /> */}
        </div>
    )
}
export default App;




// const tasks1: TaskType[] = [
//     { id: 1, title: 'Html & CSS', isDone: true },
//     { id: 2, title: 'JS', isDone: true },
//     { id: 3, title: 'ES6/TS', isDone: true }
// ]