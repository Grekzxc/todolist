import React, { ChangeEvent, FC, useRef, useState, KeyboardEvent } from "react";
import './App.css';
import { FilterValuesType, TaskType } from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    filter: FilterValuesType
}
//  color
const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone)
            isAllTasksNotIsDone = false
        break
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li>
                <input
                    type="checkbox"
                    onChange={changeTaskStatus}
                    checked={task.isDone} />
                <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const maxTitleLength = 20
    const reccommendedTitleLength = 10
    const isAddTaskPossible = !title.length || title.length > maxTitleLength || error
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler
    const longTitleWarning = (title.length > reccommendedTitleLength && title.length <= maxTitleLength)
        && <div style={{ color: 'rgb(123, 74, 238)' }}>Title must be shorter</div>
    const longTitleError = title.length > maxTitleLength && <div style={{ color: 'red' }}>Title is too long</div>
    const errorMessage = error && <div style={{ color: 'red' }}>Title is hard required</div>

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
                        className={error ? 'input_error' : ''}
                    />
                    <button
                        disabled={isAddTaskPossible}
                        onClick={addTaskHandler}
                    >+</button>
                    {longTitleWarning}
                    {longTitleError}
                    {errorMessage}
                </div>
                <ul>
                    {todoListItems}
                </ul>
                <div>
                    <button
                        onClick={() => { props.changeTodoListFilter('All') }}
                        className={props.filter === 'All' ? 'btn_active' : ''}
                    >All</button>
                    <button
                        onClick={() => { props.changeTodoListFilter('Active') }}
                        className={props.filter === 'Active' ? 'btn_active' : ''}
                    >Active</button>
                    <button
                        onClick={() => { props.changeTodoListFilter('Completed') }}
                        className={props.filter === 'Completed' ? 'btn_active' : ''}
                    >Completed</button>
                </div>
            </div>
        </div>
    )
}

export default TodoList