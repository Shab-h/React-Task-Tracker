import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"

function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}
		getTasks()
	}, [])

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch(
			"https://my-json-server.typicode.com/Shab-h/React-Task-Tracker-Json-Server/tasks"
		)
		const data = await res.json()

		return data
	}

	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(
			`https://my-json-server.typicode.com/Shab-h/React-Task-Tracker-Json-Server/${id}`
		)
		const data = await res.json()

		return data
	}

	// Add Task
	const addTask = async (task) => {
		// --- Add task with Json Server ---
		const res = await fetch(
			"https://my-json-server.typicode.com/Shab-h/React-Task-Tracker-Json-Server/tasks",
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task),
			}
		)

		const data = await res.json()

		setTasks([...tasks, data])

		// --- Add task without Json Server ---
		// const id = Math.floor(Math.random() * 1000) + 1
		// const newTask = { id, ...task }
		// setTasks([...tasks, newTask])
	}

	// Delete Tassk
	const deleteTask = async (id) => {
		await fetch(
			`https://my-json-server.typicode.com/Shab-h/React-Task-Tracker-Json-Server/${id}`,
			{
				method: "DELETE",
			}
		)

		setTasks(tasks.filter((task) => task.id !== id))
	}

	// Toggle Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

		const res = await fetch(
			`https://my-json-server.typicode.com/Shab-h/React-Task-Tracker-Json-Server/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(updTask),
			}
		)

		const data = await res.json()

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		)
	}

	return (
		<Router>
			<div className="container">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAdd={showAddTask}
				/>
				<Routes>
					<Route
						path="/React-Task-Tracker/"
						element={
							<>
								{showAddTask && <AddTask onAdd={addTask} />}
								{tasks.length > 0 ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={toggleReminder}
									/>
								) : (
									"No Task to Show"
								)}
							</>
						}
					/>
					<Route path="/React-Task-Tracker/about" element={<About />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

// Class Base Component Example (Need to import React from "react";)

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App
