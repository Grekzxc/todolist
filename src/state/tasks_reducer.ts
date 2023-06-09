import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodoListType } from "../App"
import { AddTodolistACType } from "./todolist_reducer"

type ActionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    changeTaskTitleActionType |
    AddTodolistACType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false },
                ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)
                // .map(t => {
                //     if (t.id === action.payload.taskId)
                //         return { ...t, isDone: action.payload.isDone }
                //     else return t
                // })
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)
            }
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        default:
            throw new Error('I don`t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK', payload: { taskId, todolistId }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK', payload: { title, todolistId }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS', payload: { taskId, isDone, todolistId }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE', payload: { taskId, title, todolistId }
    } as const
}

