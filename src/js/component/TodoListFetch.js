import React from "react";
import { useState, useEffect } from "react";
import "../../styles/index.scss";

const ToDoListFetch = () => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [hover, setHover] = useState(false);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/franc";

	const handleChange = e => {
		setTodo(e.target.value);
	};

	const addTodo = () => {
		setTodos([
			...todos,
			{
				label: todo,
				done: true
			}
		]);
	};

	const onSubmit = e => {
		if (todo !== "") {
			addTodo();
			setTodo("");
		}
	};

	const removeTodo = index => {
		let newTodos = [];
		for (let i = 0; i < todos.length; i++) {
			if (i !== index) {
				newTodos.push(todos[i]);
			}
		}
		setTodos(newTodos);
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTodos)
		};

		fetch(url, options)
			.then(res => console.log(res))
			.then(json => console.log(json))
			.catch(error => console.log(error));
		console.log(todos);
	};

	const toggleTodo = todoDone => {
		const updatedTodos = todos.map(todo => {
			return todo.done === todoDone
				? { ...todo, done: !todo.done }
				: todo;
		});
		setTodos(updatedTodos);
	};
	const handleKeyPress = async e => {
		console.log(todos);
		if (e.key === "Enter" && e.target.value !== "") {
			let add = await addTodo();
			let set = await setTodo("");
			let submit = await onSubmit();
			const options = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([
					...todos,
					{
						label: todo,
						done: true
					}
				])
			};

			fetch(url, options)
				.then(res => console.log(res))
				.then(json => console.log(json))
				.catch(error => console.log(error));
			console.log(todos);
		}
	};
	// fetch with get
	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setTodos(json))
			.catch(error => console.log("We have an error"));
	}, []);

	const deleteAll = () => {
		setTodos([]);
		doPutFetch();
	};

	const doPutFetch = () => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className="container">
			<div className="row ">
				<div className="col-md-12 title ">
					<h1>todos</h1>
				</div>
			</div>
			<div className="row list">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-8 ">
							<input
								id="todo"
								className="todo-input"
								onChange={handleChange}
								value={todo}
								placeholder="What needs to be done?"
								onKeyPress={handleKeyPress}
							/>
						</div>
						<div className="col-md-4"></div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<ul>
								{todos &&
									todos.map((todo, index) => (
										<li
											key={todo.label}
											onMouseEnter={() => setHover(true)}
											onMouseLeave={() =>
												setHover(false)
											}>
											<span
												className={
													todo.done
														? "todo-completed"
														: undefined
												}
												onClick={() =>
													toggleTodo(todo.done)
												}>
												{todo.label}
											</span>
											<span
												className="delete-btn"
												onClick={() =>
													removeTodo(index)
												}>
												{hover && (
													<i className="far fa-times-circle"></i>
												)}
											</span>
										</li>
									))}
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<span className="span-bottom">
								{todos.length > 0
									? todos.length + "item left"
									: "No items left"}
							</span>
							<button className="delete-all" onClick={deleteAll}>
								Delete all todos
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ToDoListFetch;
