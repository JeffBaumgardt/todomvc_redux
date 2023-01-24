import React from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import {addTodo} from './todoSlice'

const TodoAdder = ({handleSubmit, toggleAll, todos}) => {
    const [newTodo, setNewTodo] = React.useState('')
    const dispatch = useDispatch()

    const handleChange = event => {
        setNewTodo(event.target.value)
    }

    const handleNewTwoKeyDown = event => {
        if (event.key !== 'Enter') return

        const title = newTodo.trim()

        if (title) {
            dispatch(addTodo(title))
            setNewTodo('')
        }

        event.preventDefault()
    }

    return (
        <form className="input">
            <input
                type="text"
                className="new-todo"
                autoComplete="off"
                name="todo"
                onChange={handleChange}
                value={newTodo}
                onKeyDown={handleNewTwoKeyDown}
                style={{background: 'white'}}
                placeholder="What needs to be done?"
            />
        </form>
    )
}
export default TodoAdder
