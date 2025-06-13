import React from 'react';
import { Input, Button } from 'semantic-ui-react';

interface TodoFormProps {
  todoValue: string;
  setTodoValue: (value: string) => void;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todoValue, setTodoValue, addTodo }) => (
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
);

export default TodoForm;