import React, { FC } from "react";
import './App.css';
import { FilterValuesType, TaskType } from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
//  color
const TodoList: FC<TodoListPropsType> = (props) => {
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true)
            isAllTasksNotIsDone = false
        break
    }

    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => { props.removeTask(task.id) }}>x</button>
            </li>
        )
    }
    )

    return (
        <div className="App">
            <div className={todoClasses}>
                <h3>{props.title}</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>
                    {todoListItems}
                </ul>
                <div>
                    <button onClick={() => { props.changeTodoListFilter('All') }}>All</button>
                    <button onClick={() => { props.changeTodoListFilter('Active') }}>Active</button>
                    <button onClick={() => { props.changeTodoListFilter('Completed') }}>Completed</button>
                </div>
            </div>
        </div>)
}

export default TodoList