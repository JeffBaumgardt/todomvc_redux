import React from 'react'
import {useSelector} from 'react-redux'
import './App.css'
import Todos from './Todos'
import TodoAdder from './TodoAdder'
import Footer from './Footer'
import Links from './Links'
import { selectCount } from './todoSlice'

const App = () => {
    const {activeCount, allCount, completedCount} = useSelector(selectCount)
    const showTodoList = allCount > 0
    const showFooter = activeCount > 0 || completedCount > 0

    return (
        <div className="App">
            <header className="App-header">todos</header>
            <TodoAdder />
            {showTodoList ? <Todos /> : null}
            {showFooter ? <Footer /> : null}
            <Links />
        </div>
    )
}

export default App
