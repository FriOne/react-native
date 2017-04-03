export class Todo {

  static generateUUID(): string {
    return Todo.s4() + Todo.s4() + '-' + Todo.s4() + '-' + Todo.s4() + '-' +
      Todo.s4() + '-' + Todo.s4() + Todo.s4() + Todo.s4();
  }

  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  uuid: string;
  text: string = '';
  completed: boolean = false;
  created: Date = new Date();

  constructor() {
    this.uuid = Todo.generateUUID();
  }
}
