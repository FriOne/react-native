import { Todo } from '../models/Todo';
import { AsyncStorage } from 'react-native';

export function receiveTodosToStore(): Promise<Todo[]> {
  return AsyncStorage
    .getItem('todos')
    .then(todosString => todosString ? JSON.parse(todosString) as Todo[] : []);
}
