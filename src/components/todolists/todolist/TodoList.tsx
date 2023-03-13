import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useCallback, useEffect} from 'react';
import {AddTodo} from './AddTodo';
import {EditableSpan} from '../../editableSpan/EditableSpan';
import {Tasks} from '../../tasks/Tasks';
import {getTasks} from '../../../reducer/tasksReducer';
import {deleteTodoList, FilterValuesType, updateTodoList} from '../../../reducer/todoListReducer';
import {useAppDispatch} from '../../../hooks/hooks';
import {statusType} from '../../../reducer/appReducer';


type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: statusType
};

export const TodoList: React.FC<TodolistPropsType> = ({id, title, filter, entityStatus}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasks(id))
    }, [])
    const onChangeRemoveTodoListHandler = () => {
        dispatch(deleteTodoList(id));
    }

    const onChangeUpdateTodoListHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoList(id, newTitle));
    }, [dispatch, id]);

    return (
        <div>
            <div>
                <EditableSpan callBack={onChangeUpdateTodoListHandler} title={title}/>
                <IconButton onClick={onChangeRemoveTodoListHandler} disabled={entityStatus === 'loading'}
                            aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
            <AddTodo id={id} disabled={entityStatus === 'loading'}/>
            <Tasks
                id={id}
                filter={filter}
            />
        </div>
    );
};