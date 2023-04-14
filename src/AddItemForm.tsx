import React, { ChangeEvent, FC, useState } from "react";
import LoupeIcon from '@mui/icons-material/Loupe';
import { IconButton, TextField } from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    reccommendedTitleLength: number
    maxTitleLength: number
}

const AddItemForm: FC<AddItemFormPropsType> = ({ addItem }) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const maxTitleLength = 20
    const reccommendedTitleLength = 10
    const isAddTaskPossible = !title.length || title.length > maxTitleLength || error
    const longTitleWarning = (title.length > reccommendedTitleLength && title.length <= maxTitleLength)
        && <span style={{ color: 'rgb(123, 74, 238)' }}>Title must be shorter</span>
    const longTitleError = title.length > maxTitleLength && <span style={{ color: 'red' }}>Title is too long</span>
    const errorMessage = error && 'Title is hard required'
    const onKeyDownAddTaskHandler = isAddTaskPossible
        ? undefined
        : (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    return (
        <div className={'add_form'}>
            <TextField
                size="small"
                placeholder="Enter item title, please"
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
                error={error}
                helperText={errorMessage || longTitleWarning || longTitleError} />
            <IconButton
                size="small"
                disabled={isAddTaskPossible}
                onClick={addTaskHandler}>
                <LoupeIcon />
            </IconButton>
        </div>
    )
}

export default AddItemForm