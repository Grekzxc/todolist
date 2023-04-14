import { TextField } from "@mui/material";
import { title } from "process";
import React, { ChangeEvent, FC, useState } from "react";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
    { title, classes, changeTitle }) => {

    const [value, setValue] = useState<string>('')
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const toggleEditMode = () => {
        if (isEditMode) {
            changeTitle(value)
        }
        setIsEditMode(!isEditMode)
    }
    const setHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        isEditMode
            ? <TextField
                size="small"
                variant={'standard'}
                value={value}
                autoFocus
                onBlur={toggleEditMode}
                onChange={setHandler}
            />
            : <span
                className={classes}
                onDoubleClick={toggleEditMode}
            >{title}</span>
    )
}
export default EditableSpan