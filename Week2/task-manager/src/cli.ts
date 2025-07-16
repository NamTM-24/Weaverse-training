import { Command } from "commander";
import { addTask, deleteTask, updateTask, listTasks } from "./taskManager";
import { title } from "process";
import { Priority, Status } from "./interface";

const program = new Command();

program
    .name("task-manager")
    .description("CLI Application")
    .version("0.0.0");

// Add a task
program
    .command("add")
    .description("Add a new task")
    .requiredOption("-t, --title <title>", "Task title")
    .requiredOption("-p, --priority <priority>", "Task priority (low, medium, high)")
    .requiredOption("-s, --status <status>", "Task status (todo, in-progress, done)")
    .action(async ({ title, priority, status }) => {
        try {
            await addTask(title, priority as Priority, status as Status);
        } catch (erro) {
            console.log("Failed to add task:", erro)
        }
    });

// Delete a task
program
    .command("delete")
    .description("Delete  a task by its ID")
    .argument("<id>", "Task ID")
    .action(async id => {
        try {
            await deleteTask(parseInt(id, 10));
        } catch (erro) {
            console.log("Error adding task: ", erro);
        }
    });


//Update a task
program
    .command("update")
    .description("Update a task priority or status by ID")
    .argument("<id>", "Task ID")
    .option("-p , --priority <priority>", "New priority (low, medium, high)")
    .option("-s , --status <status>", "New status (todo, in-progress, done)")
    .action(async (id, options) => {
        try {
            await updateTask(parseInt(id, 10), {
                priority: options.priority,
                status: options.status
            })
        } catch (erro) {
            console.log("Erro update task", erro)
        }
    });


// List tasks
program
    .command("list")
    .description("List all tasks, with optional filters")
    .option("-i, --id <i>", "Filter by task ID", parseInt)
    .option("-t, --title <title>", "Filter by title (partial match)")
    .option("-p, --priority <priority>", "Filter by priority")
    .option("-s, --status <status>", "Filter by status")
    .action(async (options) => {
        try {
            await listTasks({
                id: options.id,
                title: options.title,
                priority: options.priority,
                status: options.status
            })
        } catch (erro) {
            console.log("Failed to list task", erro)
        }
    })

program.parse(process.argv);