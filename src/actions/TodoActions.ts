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

  static DELETE_TODO = 'DELETE_TODO';
  static deleteTodo(uuid: string) {
    return {
      type: TodoActions.DELETE_TODO,
      uuid: uuid,
    };
  }

  static CHANGE_FILTER = 'CHANGE_FILTER';
  static changeFilter(type: FilterType) {
    return {
      type: TodoActions.CHANGE_FILTER,
      filterType: type,
    };
  }

  static CLEAR_DONE = 'CLEAR_DONE';
  static clearDone() {
    return {
      type: TodoActions.CLEAR_DONE,
    };
  }

  static MARK_ALL_AS_READ = 'MARK_ALL_AS_READ';
  static markAllAsRead() {
    return {
      type: TodoActions.MARK_ALL_AS_READ,
    };
  }
}
