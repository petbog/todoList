export type Task = {
    id: number;
    name: string,
    description: string,
    checked: boolean,
}
export type Todo = {
    name: string,
    _id: string,
    tasks: Task[],
    data: string,
    deadline: string
}