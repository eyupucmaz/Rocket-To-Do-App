import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	FormControl,
	Input,
	InputLabel,
	DialogContentText,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
} from "@material-ui/core";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import "./Todo.css";

function Todo(props) {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const updateTodo = (e) => {
		db.collection("todos").doc(props.todo.id).set(
			{
				todo: input,
			},
			{ merge: true }
		);
		setOpen(false);
	};

	return (
		<div>
			<List className="todo__list">
				<ListItem>
					<ListItemText
						primary={props.todo.todo}
						secondary={props.todo.timestamp}
					/>
				</ListItem>
				<EditIcon onClick={handleClickOpen} className="dlt-icon" />
				<DeleteForeverIcon
					className="dlt-icon"
					onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
				/>
			</List>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Todo 🚀 </DialogTitle>
				<DialogContent>
					<DialogContentText>{props.todo.todo}</DialogContentText>
					<FormControl>
						<InputLabel>📔 Edit your Todo!</InputLabel>
						<Input
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={updateTodo} color="primary">
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Todo;
