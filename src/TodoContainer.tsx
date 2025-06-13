import React, { useState } from 'react';
import { v4 as guid } from "uuid";
import { Button, Checkbox, Container, Dropdown, DropdownItem, DropdownMenu, Header, Icon, Input, List, Menu, MenuMenu, Segment } from 'semantic-ui-react';

interface Todo {
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
  const [todoFilter, setTodoFilter] = useState<string>('all');

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
    <Container style={{ max: "600px" }}>
      <Header as='h1'>Todo List</Header>

      <Menu attached="top">

        <MenuMenu position="right">
          <Dropdown value={todoFilter} item icon='filter' text='Filter' simple>
            <DropdownMenu>
              {["All", "Completed", "Pending"].map(option => (
                <DropdownItem
                  key={option}
                  active={todoFilter === option}
                  value={option}
                  onClick={(_, { value }) => setTodoFilter(value as string)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </MenuMenu>
      </Menu>
      <Segment attached="bottom">
        <List divided>
          {filteredTodos.map((todo, idx) => (
            <List.Item key={idx} style={{ padding: "20px 0px" }}>
              <List.Content floated="right">
                <Button size="small" icon color="red" onClick={() => removeTodo(todo.id)}>
                  <Icon name="trash" />
                </Button>
              </List.Content>

              <List.Content style={{ textAlign: "left", display: "flex" }}>
                <Checkbox toggle checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <Header as="h3" style={{ display: "inline-block" }}>
                  <span style={{ marginLeft: "10px", textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                  </span>
                </Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <form onSubmit={addTodo}>
          <Input
            type="text"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="Enter a new todo"
          />
          <Button type="submit" primary>
            Add Todo
          </Button>
        </form>
      </Segment>

    </Container>
  );
};

export default TodoContainer;