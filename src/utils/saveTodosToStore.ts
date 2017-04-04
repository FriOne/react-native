import { Todo } from '../models/Todo';
import { AsyncStorage } from 'react-native';

export function saveTodosToStore(todos: Todo[]): Promise<void> {
  return AsyncStorage.setItem('todos', JSON.stringify(todos));
}
