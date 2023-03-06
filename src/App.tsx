import { title } from 'process';
import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            { id: 1, title: 'Html & CSS', isDone: true },
            { id: 2, title: 'JS', isDone: false },
            { id: 3, title: 'ES6/TS', isDone: false }
        ]
    )

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const [filter, setFilter] = useState<FilterValuesType>()

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
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter} />

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