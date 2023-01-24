import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFilter, clearCompleted, selectCount, selectFilter} from './todoSlice'

export function pluralize(count, word) {
    return count === 1 ? word : `${word}s`
}

const Footer = () => {
    const {activeCount, completedCount} = useSelector(selectCount)
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()
    const activeTodoWord = pluralize(activeCount, 'item')

    const handleChangeFilter = filterType => {
        dispatch(changeFilter(filterType))
    }

    return (
        <footer className="Footer">
            <span className="todos-left">
                <strong>{activeCount}</strong> {activeTodoWord} left
            </span>
            <div className="nav-buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => handleChangeFilter('all')}>
                    All
                </button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => handleChangeFilter('active')}>
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => handleChangeFilter('completed')}
                >
                    Completed
                </button>
            </div>
            {completedCount > 0 ? (
                <button type="button" className="clear-completed" onClick={() => dispatch(clearCompleted())}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    )
}

export default Footer
