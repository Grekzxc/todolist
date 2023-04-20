import React, { ChangeEvent } from 'react';

type PropsType = {
    callBack: (newIsDone: boolean) => void
    isDone: boolean
}

export const SuperCheckBox = (props: PropsType) => {
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="text" checked={props.isDone} onChange={changeTaskStatus} />
    )
}