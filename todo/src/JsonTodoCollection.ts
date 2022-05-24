import { TodoItem } from './TodoItem.js';
import { TodoCollection } from './TodoCollection.js';
import { LowSync, JSONFileSync } from 'lowdb';

type schemaType = {
    tasks: {
        id: number,
        task: string,
        complete: boolean,
    }[],
}

export class JsonTodoCollection extends TodoCollection {
    private db: LowSync<schemaType>;

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        super(userName, []);

        this.db = new LowSync<schemaType>(new JSONFileSync<schemaType>('todos.json'));
        if (this.db.data && this.db.data.tasks) {
            this.db.data.tasks.forEach(item => {
                this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete));
            });
        } else {
            this.db.data = {
                tasks: todoItems,
            };
            this.db.write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        }
    }

    private storeTasks(): void {
        this.db.data.tasks = [...this.itemMap.values()];
        this.db.write();
    }

    public addTodo(task: string): number {
        const addedTodoId = super.addTodo(task);
        this.storeTasks();

        return addedTodoId;
    }

    public markComplete(id: number, complete: boolean): void {
        super.markComplete(id, complete);
        this.storeTasks();
    }

    public removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    }
}
