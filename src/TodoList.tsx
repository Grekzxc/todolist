import React, { ChangeEvent, FC } from "react";
import './App.css';
import { FilterValuesType, TaskType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CheckBox } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';


type TodoListPropsType = {
    todoList_Id: string
    title: string
    tasks: Array<TaskType>
    changeTaskTitle: (taskId: string, newTitle: string, todoList_Id: string) => void
    removeTask: (taskId: string, todoList_Id: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoList_Id: string) => void
    addTask: (title: string, todoList_Id: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoList_Id: string) => void
    removeTodoList: (todoList_Id: string) => void
    changeTodoListTitle: (newTitle: string, todoList_Id: string) => void
    filter: FilterValuesType
}
//  color
const TodoList: FC<TodoListPropsType> = (props) => {

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone)
            isAllTasksNotIsDone = false
        break
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoList_Id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.todoList_Id
            )
        const chengeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(task.id, newTitle, props.todoList_Id)

        return (
            <ListItem
                divider
                key={task.id}
                disablePadding
                secondaryAction={
                    <IconButton
                        size="small"
                        onClick={removeTaskHandler}>
                        <DeleteOutlineIcon />
                    </IconButton>
                }>
                <Checkbox
                    color="default"
                    size="small"
                    onChange={changeTaskStatus}
                    checked={task.isDone}
                />
                <EditableSpan
                    title={task.title}
                    classes={task.isDone ? 'task-done' : 'task'}
                    changeTitle={chengeTaskTitle}
                />
            </ListItem>
        )
    })
    const addTask = (title: string) => { props.addTask(title, props.todoList_Id) }
    const removeTodoList = () => props.removeTodoList(props.todoList_Id)

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoList_Id)
    }

    return (
        <div className="App">
            <div className={todoClasses}>
                <IconButton
                    size="small"
                    onClick={removeTodoList}>
                    <DeleteOutlineIcon />
                </IconButton>
                <Typography
                    variant="h5"
                >
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                </Typography>
                <AddItemForm addItem={addTask} reccommendedTitleLength={12} maxTitleLength={20} />
                <List>
                    {todoListItems}
                </List>
                <div className={'btn_filter_container'}>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        onClick={() => { props.changeTodoListFilter('All', props.todoList_Id) }}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                    >All</Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        onClick={() => { props.changeTodoListFilter('Active', props.todoList_Id) }}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    >Active</Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        onClick={() => { props.changeTodoListFilter('Completed', props.todoList_Id) }}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    >Completed</Button>
                </div>
            </div>
        </div>
    )
}
export default TodoList