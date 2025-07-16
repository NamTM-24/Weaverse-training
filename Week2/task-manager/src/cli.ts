
import { Command } from "commander";
import { loadTask, saveTasks, addTask, deleteTask, updateTask, listTasks, run } from "./taskManager";
import { Priority, Status } from "./interface";

const program = new Command();

program
    .name("task-manager")
    .description("Ứng dụng CLI quản lý công việc")
    .version("0.0.0");

// Add a task
program
    .command("add")
    .description("Thêm một công việc mới")
    .requiredOption("-t, --title <title>", "Tiêu đề công việc")
    .requiredOption("-p, --priority <priority>", "Độ ưu tiên (low, medium, high)")
    .requiredOption("-s, --status <status>", "Trạng thái (todo, in-progress, done)")
    .action(async ({ title, priority, status }) => {
        try {
            await addTask(title, priority as Priority, status as Status);
        } catch (error) {
            console.log("Failed to add task:", error)
        }
    });

// Delete a task
program
    .command("delete")
    .description("Xóa công việc theo ID")
    .argument("<id>", "Task ID")
    .action(async id => {
        try {
            await deleteTask(parseInt(id, 10));
        } catch (error) {
            console.log("Lỗi khi xóa công việc:", error);
        }
    });


//Update a task
program
    .command("update")
    .description("Cập nhật độ ưu tiên hoặc trạng thái công việc theo ID")
    .argument("<id>", "Task ID")
    .option("-p , --priority <priority>", "Độ ưu tiên mới (low, medium, high)")
    .option("-s , --status <status>", "Trạng thái mới (todo, in-progress, done)")
    .action(async (id, options) => {
        try {
            await updateTask(parseInt(id, 10), {
                priority: options.priority,
                status: options.status
            });
            console.log("Đã cập nhật công việc.");
        } catch (error) {
            console.log("Lỗi khi cập nhật công việc:", error)
        }
    });


// List tasks
program
    .command("list")
    .description("Liệt kê tất cả công việc, có thể lọc tùy chọn")
    .option("-i, --id <i>", "Lọc theo ID công việc", parseInt)
    .option("-t, --title <title>", "Lọc theo tiêu đề")
    .option("-p, --priority <priority>", "Lọc theo độ ưu tiên")
    .option("-s, --status <status>", "Lọc theo trạng thái")
    .action(async (options) => {
        try {
            await listTasks({
                id: options.id,
                title: options.title,
                priority: options.priority,
                status: options.status
            })
        } catch (error) {
            console.log("Lỗi khi liệt kê công việc:", error)
        }
    })

// Save task to file
program
    .command("save")
    .description("Lưu danh sách công việc hiện tại vào tasks.json")
    .action(async () => {
        try {
            await saveTasks();
            console.log("Đã lưu công việc vào file.");
        } catch (error) {
            console.error("Lỗi khi lưu công việc:", error)
        }
    });

// Help command 
program
    .command("help")
    .description("Hiển thị hướng dẫn sử dụng")
    .action(() => {
        console.log(console.log(`
            Hướng dẫn sử dụng Task Manager CLI:
            - add -t <tiêu đề> -p <độ ưu tiên> -s <trạng thái>: Thêm công việc mới
            - delete <id>: Xóa công việc theo ID
            - update <id> [-p <độ ưu tiên>] [-s <trạng thái>]: Cập nhật công việc
            - list [-i <id>] [-t <tiêu đề>] [-p <độ ưu tiên>] [-s <trạng thái>]: Liệt kê công việc
            - save: Lưu công việc vào file
            - quit hoặc exit: Thoát chương trình
            `));
    });

//  Quit command
program
    .command("quit")
    .description("Exit the program")
    .action(() => {
        console.log("Exiting program...")
        process.exit(0);
    })

// Exit comman
program
    .command("exit")
    .description("Exit the program")
    .action(() => {
        console.log("Exiting program...")
        process.exit(0);
    })

// Kiểm tra xem có lệnh nào được truyền qua dòng lệnh không
if (process.argv.length > 2) {
    // Nếu có lệnh (như add, delete, help, v.v.), để commander xử lý
    program.parse(process.argv);
    run(program);
}
else {
    // Nếu không có lệnh, chạy chế độ CLI liên tục
    run(program);
}


