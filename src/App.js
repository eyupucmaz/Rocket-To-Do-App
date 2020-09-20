import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	// ! When the app loads, we need to listen to the database and fetch new todos as they  get added/removed
	useEffect(() => {
		db.collection("todos")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						todo: doc.data().todo,
					}))
				);
			});
	}, []);

	const addTodo = (e) => {
		// this will fire off when click the button
		e.preventDefault(); //it'll stop refresh the page

		db.collection("todos").add({
			todo: input,
			//Adds input value to an object and sends database
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput(""); //Clear the input state and input
	};
	return (
		<div className="App">
			<h1>🚀 Rocket To-Do !</h1>
			<form className="frm">
				<FormControl>
					<InputLabel>📔 Type your Todo!</InputLabel>
					<Input
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
				</FormControl>
				<Button
					className="addbtn"
					disabled={!input}
					variant="contained"
					color="primary"
					type="submit"
					onClick={addTodo}
				>
					Add Todo
				</Button>
			</form>

			<ul className="todos">
				{todos.map((todo) => (
					<Todo todo={todo} />
				))}
			</ul>
		</div>
	);
}

export default App;
