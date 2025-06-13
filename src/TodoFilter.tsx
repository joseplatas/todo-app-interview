import React from 'react';
import { Menu, MenuMenu, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';

interface TodoFilterProps {
  todoFilter: string;
  setTodoFilter: (filter: string) => void;
}

const options = ["All", "Completed", "Pending"];

const TodoFilter: React.FC<TodoFilterProps> = ({ todoFilter, setTodoFilter }) => (
  <Menu attached="top">
    <MenuMenu position="right">
      <Dropdown value={todoFilter} item icon='filter' text='Filter' simple>
        <DropdownMenu>
          {options.map(option => (
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
);

export default TodoFilter;