import { useState } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'

const TaskForm = () => {
    const { dispatch } = useTaskContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    // e-> event object
    // handle submission of form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const task = {title, description}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() // await for json or error

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            console.log('new task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className='create adjustable-shadow'>
            <h3>Add a new task</h3>

            <label>Task title:</label>
            <input 
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>Task description:</label>
            <input
                type= "text"
                onChange = {(e) => setDescription(e.target.value)}
                value = {description}
            />

            <button className='form_button'>Add Task</button>
            {error && <div className="error">{error}</div>}
            </div>
        </form>

        
    )
}

export default TaskForm