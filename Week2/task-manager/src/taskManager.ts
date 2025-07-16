import { Task, Priority, Status } from "./interface";
import { promises as fs } from "fs";

const FileData = "../tasks.json";

export async function loadTask(): Promise<Task[]> {
    try {
        const data = await fs.readFile(FileData, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function saveTasks(task: Task[]): Promise<void> {
    const data = JSON.stringify(task, null, 2);
    await fs.writeFile(FileData, data);
}

export function generateID(task: Task[]): number {
    if (task.length === 0) {
        return 1;
    } else {
        const maxID = Math.max(...task.map((x) => x.id));
        return maxID + 1;
    }
}

export async function addTask(
    title: string,
    priority: Priority,
    status: Status
): Promise<void> {
    const tasks = await loadTask();
    const newTask: Task = {
        id: generateID(tasks),
        title,
        priority,
        status,
        createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await saveTasks(tasks);

    console.log(
        `Task ${newTask.id} _ ${newTask.title} added to ${newTask.createdAt}`
    );
}

export async function deleteTask(id: number): Promise<void> {
    let tasks = await loadTask();
    const newTask = tasks.filter((x) => x.id !== id);

    if (newTask.length === tasks.length) {
        console.log(`Task not found`);
    } else {
        await saveTasks(newTask);
        console.log(`Task removed`);
    }
}

export async function updateTask(
    id: number,
    updates: Partial<Pick<Task, "priority" | "status">>
): Promise<void> {
    const tasks = await loadTask();
    const task = tasks.find((x) => x.id === id);

    if (!task) {
        console.log(`Task ID = ${id} not found`);
        return;
    } else {
        if (updates.priority) {
            task.priority = updates.priority;
        }
        if (updates.status) {
            task.status = updates.status;
        }
    }

    await saveTasks(tasks);
    console.log(`Task ID = ${id} update`);
}

export async function listTasks(filter?: {
    id?: number;
    title?: string;
    status?: Status;
    priority?: Priority;
}): Promise<void> {
    const tasks = await loadTask();
    const filtered = tasks.filter((x) => {
        return (
            (!filter?.id || x.id === filter.id) &&
            (!filter?.title ||
                x.title.toLowerCase().includes(filter.title.toLowerCase())) &&
            (!filter?.status || x.status === filter.status) &&
            (!filter?.priority || x.priority === filter.priority)
        );
    });

    console.table(filtered, ["id", "title", "status", "priority"]);
}
