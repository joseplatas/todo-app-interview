import React from 'react';
import { List, Button, Icon, Checkbox, Header } from 'semantic-ui-react';
import { Todo } from './TodoContainer';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo }) => (
  <List divided>
    {todos.map((todo, idx) => (
      <List.Item key={idx} className="todo-item">
        <List.Content floated="right">
          <Button size="small" icon color="red" onClick={() => removeTodo(todo.id)}>
            <Icon name="trash" />
          </Button>
        </List.Content>
        <List.Content className="todo-content">
          <Checkbox toggle checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <Header as="h3" className="todo-header">
            <span className={`todo-text${todo.completed ? ' todo-completed' : ''}`}>
              {todo.text}
            </span>
          </Header>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default TodoList;