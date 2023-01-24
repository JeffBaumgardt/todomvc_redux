import React from 'react'
import Todo from './Todo'
import {selectTodoList, updateTodo, removeTodo, toggleTodo} from './todoSlice'
import {useDispatch, useSelector} from 'react-redux'

const Todos = () => {
    const [editing, setEditing] = React.useState(null)
    const dispatch = useDispatch()
    const todos = useSelector(selectTodoList)

    const handleEdit = todo => {
        return () => setEditing(todo.id)
    }

    const handleCancel = () => {
        setEditing(null)
    }

    const handleSave = todo => {
        return title => {
            dispatch(updateTodo({id: todo.id, title}))
            setEditing(null)
        }
    }

    return (
        <div className="todoDisplay">
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    editing={editing === todo.id}
                    todo={todo}
                    onCancel={handleCancel}
                    onDelete={todoId => dispatch(removeTodo(todoId))}
                    onEdit={handleEdit(todo)}
                    onSave={handleSave(todo)}
                    onToggle={todoId => dispatch(toggleTodo(todoId))}
                />
            ))}
        </div>
    )
}

export default Todos
