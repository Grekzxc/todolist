import { title } from 'process';
import { v1 } from "uuid";
import { TodolistReduser, addTodolistAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC } from "./todolist_reducer";
import { FilterValuesType, TodoListType } from "../App";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]

    // const endState = TodolistReduser(startState, { type: 'REMOVE_TODOLIST', id: todolistId1 })
    const endState = TodolistReduser(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]

    const endState = TodolistReduser(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = TodolistReduser(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changet', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'Completed'

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' }
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = TodolistReduser(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})