import { Todo } from '../models/Todo';
import { FilterType } from '../models/FilterType';

export class TodoActions {
  static ADD_TODO = 'ADD_TODO';
  static addTodo(todo: Todo) {
    return {
      type: TodoActions.ADD_TODO,
      todo: todo,
    };
  }

  static UPDATE_TODO = 'UPDATE_TODO';
  static updateTodo(uuid: string, update: any) {
    return {
      type: TodoActions.UPDATE_TODO,
      uuid: uuid,
      update: update,
    };
  }

  static CHANGE_FILTER = 'CHANGE_FILTER';
  static changeFilter(type: FilterType) {
    return {
      type: TodoActions.CHANGE_FILTER,
      filterType: type,
    };
  }
}
