import React, { ChangeEvent, FC, useRef, useState, KeyboardEvent } from "react";
import './App.css';
import { FilterValuesType, TaskType } from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
//  color
const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone)
            isAllTasksNotIsDone = false
        break
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const maxTitleLength = 20
    const reccommendedTitleLength = 10
    const isAddTaskPossible = !title.length || title.length > maxTitleLength
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = isAddTaskPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler

    const longTitleWarning = (title.length > reccommendedTitleLength && title.length <= maxTitleLength)
        && <div style={{ color: 'rgb(123, 74, 238)' }}>Title must be shorter</div>
    const longTitleError = title.length > maxTitleLength && <div style={{ color: 'red' }}>Title is too long</div>

    return (
        <div className="App">
            <div className={todoClasses}>
                <h3>{props.title}</h3>
                <div>
                    <input
                        placeholder="Enter task title, please"
                        value={title}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownAddTaskHandler}
                    />
                    <button
                        disabled={isAddTaskPossible}
                        onClick={addTaskHandler}
                    >+</button>
                    {longTitleWarning}
                    {longTitleError}
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
        </div>
    )
}

export default TodoList