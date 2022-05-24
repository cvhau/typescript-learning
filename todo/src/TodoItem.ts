export class TodoItem {
    constructor(
        public id: number,
        public task: string,
        public complete: boolean = false) {
        // No statements required.
    }

    /**
     * printDetails
     */
    public printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
