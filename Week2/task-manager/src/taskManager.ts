import { Command } from "commander";
import { Task, Priority, Status } from "./interface";
import { promises as fs } from "fs";
import * as readline from "readline";

const FileData = "../tasks.json";

// Bộ nhớ chứa task
let globalTasks: Task[] = [];

// Load toàn bộ task từ file JSON khi khởi động
export async function loadTask(): Promise<Task[]> {
    try {
        const data = await fs.readFile(FileData, "utf-8");
        return globalTasks = JSON.parse(data);
    } catch {
        return globalTasks = [];
    }
}

// Ghi lại danh sách task hiện tại vào file JSON
export async function saveTasks(): Promise<void> {
    const data = JSON.stringify(globalTasks, null, 2);
    await fs.writeFile(FileData, data);
}

// Sinh ID mới cho task
export function generateID(): number {
    if (globalTasks.length === 0) {
        return 1;
    } else {
        const maxID = Math.max(...globalTasks.map((x) => x.id));
        return maxID + 1;
    }
}

// Thêm task mới
export async function addTask(
    title: string,
    priority: Priority,
    status: Status
): Promise<void> {
    const newTask: Task = {
        id: generateID(),
        title,
        priority,
        status,
        createdAt: new Date().toISOString(),
    };
    globalTasks.push(newTask);
    console.log(
        `Task ${newTask.id} _ ${newTask.title} added to ${newTask.createdAt}`
    );
    await saveTasks();
}

// Xóa task theo ID
export async function deleteTask(id: number): Promise<void> {
    const initialLength = globalTasks.length;
    globalTasks = globalTasks.filter(x => x.id !== id);

    if (globalTasks.length === initialLength) {
        console.log(`Task not found`);
    }
    else {
        console.log(`Task removed`);
        await saveTasks();
    }
}

// Cập nhật priority/status cho task theo ID
export async function updateTask(
    id: number,
    updates: Partial<Pick<Task, "priority" | "status">>
): Promise<void> {
    const task = globalTasks.find((x) => x.id === id);

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
    console.log(`Task ID = ${id} update`);
    await saveTasks();
}


// In danh sách task với lọc tuỳ chọn
export async function listTasks(filter?: {
    id?: number;
    title?: string;
    status?: Status;
    priority?: Priority;
}): Promise<void> {

    const filtered = globalTasks.filter((x) => {
        return (
            (!filter?.id || x.id === filter.id) &&
            (!filter?.title ||
                x.title.toLowerCase().includes(filter.title.toLowerCase())) &&
            (!filter?.status || x.status === filter.status) &&
            (!filter?.priority || x.priority === filter.priority)
        );
    });

    if (filtered.length === 0) {
        console.log(" No matching tasks.");
    }
    else {
        console.table(filtered, ["id", "title", "priority", "status"]);
    }
}

// Hàm run để chạy CLI liên tục
export async function run(program: Command) {
    await loadTask();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Chào mừng bạn đến với Task Manager CLI!");
    console.log("Gõ lệnh như 'add -t \"Công việc\" -p high -s todo'");
    console.log("Gõ 'quit' hoặc 'exit' để thoát chương trình.");

    rl.on('line', async (input: string) => {
        if (input.trim() === "quit" || input.trim() === "exit") {
            console.log("Good bye");
            rl.close();
            return;
        }

        const args = input.trim().split(/\s+/);

        try {
            await program.parseAsync(args, { from: 'user' });
        } catch (error) {
            console.log("Lỗi: Vui lòng kiểm tra lại lệnh!", error);
        }

        // Hiển thị dấu nhắc để người dùng nhập lệnh tiếp theo
        rl.prompt();
    });

    // Khi giao diện đóng (Ctrl+C, quit, hoặc exit), thoát chương trình
    rl.on('close', () => {
        console.log("Chương trình đã thoát.");
        process.exit(0);
    });

} 
