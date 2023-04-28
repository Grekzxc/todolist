import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../App"

export const TodolistReduser = (state: TodoListType[], action: TsarTypeAction): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.payloard.todolistId)
        }
        case 'ADD_TODOLIST': {
            let newTodolistId = v1()
            let newTodolist: TodoListType = { id: newTodolistId, title: action.payload.title, filter: 'All' }
            return [...state, newTodolist]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.newTitle } : el)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.newFilter } : el)
        }
        default: return state
    }
}

type TsarTypeAction = removeTodolistACType | addTodolistACType | changeTodoListTitleACType | changeTodoListFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payloard: {
            todolistId
        }

    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistID, newTitle
        }
    } as const
}

type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistID, newFilter
        }

    } as const
}