import React, { useState } from 'react';
import { v4 as guid } from "uuid";
import { Container, Header, Segment } from 'semantic-ui-react';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoContainer.css';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const firstSampleTodo: Todo = {
  id: guid(),
  text: 'This is a sample todo',
  completed: false
}

const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([firstSampleTodo]);
  const [todoValue, setTodoValue] = useState<string>('');
  const [todoFilter, setTodoFilter] = useState<string>('All');

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValue.trim() === '') return;

    const newTodo: Todo = {
      id: guid(),
      text: todoValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (todoFilter === 'Completed') return todo.completed;
    if (todoFilter === 'Pending') return !todo.completed;
    return true;
  });

  return (
    <Container className="todo-container">
      <Header as='h1'>Todo List</Header>
      <TodoFilter todoFilter={todoFilter} setTodoFilter={setTodoFilter} />
      <Segment attached="bottom">
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
        <TodoForm
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTodo={addTodo}
        />
      </Segment>
    </Container>
  );
};

export default TodoContainer;