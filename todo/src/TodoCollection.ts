import { TodoItem } from './TodoItem.js';

type ItemCounts = {
    total: number,
    incomplete: number,
}

export class TodoCollection {
    private nextId: number = 1;
    protected itemMap = new Map<number, TodoItem>();

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        todoItems.forEach(item => {
            this.itemMap.set(item.id, item);
        });
    }

    /**
     * addTodo
     */
    public addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }

        // this.todoItems.push(new TodoItem(this.nextId, task));
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));

        return this.nextId;
    }

    /**
     * getTodoById
     */
    public getTodoById(id: number) {
        // return this.todoItems.find(item => item.id === id);
        return this.itemMap.get(id);
    }

    public getTodoItems(includeComplete: boolean = true): TodoItem[] {
        const items: TodoItem[] = [...this.itemMap.values()];

        if (!includeComplete) {
            return items.filter(item => !item.complete);
        }

        return items;
    }

    /**
     * markComplete
     */
    public markComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);

        if (todoItem) {
            todoItem.complete = complete;
        }
    }

    public removeComplete(): void {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        });
    }

    public getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
