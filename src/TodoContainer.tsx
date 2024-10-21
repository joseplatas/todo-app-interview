import React, { useState } from 'react';
import { Button, Checkbox, Container, Dropdown, DropdownItem, DropdownMenu, Header, Icon, Input, List, Menu, MenuMenu, Segment } from 'semantic-ui-react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoContainer: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const addTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
      <Container style={{max: "600px"}}>
        <Header as='h1'>Todo List</Header>

        <Menu attached="top">
          
          <MenuMenu position="right">
          <Dropdown item icon='filter' text='Filter' simple>
              <DropdownMenu>
                <DropdownItem>All</DropdownItem>
                <DropdownItem>Completed</DropdownItem>
                <DropdownItem>Pending</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </MenuMenu>
        </Menu>
        <Segment attached="bottom">
          <List divided>
            {todos.map((todo, idx) => (
              <List.Item key={idx} style={{padding: "20px 0px"}}>
                <List.Content floated="right">
                  <Button size="small" icon color="red" onClick={() => removeTodo(todo.id)}>
                    <Icon name="trash" />
                  </Button>
                </List.Content>
                
                <List.Content style={{textAlign: "left",display: "flex"}}>
                  <Checkbox toggle checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                  <Header as="h3" style={{display: "inline-block"}}>
                    <span style={{ marginLeft: "10px", textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                    </span>
                  </Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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