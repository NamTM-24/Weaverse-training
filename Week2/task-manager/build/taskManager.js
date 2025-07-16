"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTask = loadTask;
exports.saveTasks = saveTasks;
exports.generateID = generateID;
exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
exports.listTasks = listTasks;
exports.run = run;
const fs_1 = require("fs");
const readline = __importStar(require("readline"));
const FileData = "../tasks.json";
// Bộ nhớ chứa task
let globalTasks = [];
// Load toàn bộ task từ file JSON khi khởi động
function loadTask() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile(FileData, "utf-8");
            return globalTasks = JSON.parse(data);
        }
        catch (_a) {
            return globalTasks = [];
        }
    });
}
// Ghi lại danh sách task hiện tại vào file JSON
function saveTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.stringify(globalTasks, null, 2);
        yield fs_1.promises.writeFile(FileData, data);
    });
}
// Sinh ID mới cho task
function generateID() {
    if (globalTasks.length === 0) {
        return 1;
    }
    else {
        const maxID = Math.max(...globalTasks.map((x) => x.id));
        return maxID + 1;
    }
}
// Thêm task mới
function addTask(title, priority, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTask = {
            id: generateID(),
            title,
            priority,
            status,
            createdAt: new Date().toISOString(),
        };
        globalTasks.push(newTask);
        console.log(`Task ${newTask.id} _ ${newTask.title} added to ${newTask.createdAt}`);
        yield saveTasks();
    });
}
// Xóa task theo ID
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const initialLength = globalTasks.length;
        globalTasks = globalTasks.filter(x => x.id !== id);
        if (globalTasks.length === initialLength) {
            console.log(`Task not found`);
        }
        else {
            console.log(`Task removed`);
            yield saveTasks();
        }
    });
}
// Cập nhật priority/status cho task theo ID
function updateTask(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = globalTasks.find((x) => x.id === id);
        if (!task) {
            console.log(`Task ID = ${id} not found`);
            return;
        }
        else {
            if (updates.priority) {
                task.priority = updates.priority;
            }
            if (updates.status) {
                task.status = updates.status;
            }
        }
        console.log(`Task ID = ${id} update`);
        yield saveTasks();
    });
}
// In danh sách task với lọc tuỳ chọn
function listTasks(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const filtered = globalTasks.filter((x) => {
            return ((!(filter === null || filter === void 0 ? void 0 : filter.id) || x.id === filter.id) &&
                (!(filter === null || filter === void 0 ? void 0 : filter.title) ||
                    x.title.toLowerCase().includes(filter.title.toLowerCase())) &&
                (!(filter === null || filter === void 0 ? void 0 : filter.status) || x.status === filter.status) &&
                (!(filter === null || filter === void 0 ? void 0 : filter.priority) || x.priority === filter.priority));
        });
        if (filtered.length === 0) {
            console.log(" No matching tasks.");
        }
        else {
            console.table(filtered, ["id", "title", "priority", "status"]);
        }
    });
}
// Hàm run để chạy CLI liên tục
function run(program) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadTask();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log("Chào mừng bạn đến với Task Manager CLI!");
        console.log("Gõ lệnh như 'add -t \"Công việc\" -p high -s todo'");
        console.log("Gõ 'quit' hoặc 'exit' để thoát chương trình.");
        rl.on('line', (input) => __awaiter(this, void 0, void 0, function* () {
            if (input.trim() === "quit" || input.trim() === "exit") {
                console.log("Good bye");
                rl.close();
                return;
            }
            const args = input.trim().split(/\s+/);
            try {
                yield program.parseAsync(args, { from: 'user' });
            }
            catch (error) {
                console.log("Lỗi: Vui lòng kiểm tra lại lệnh!", error);
            }
            // Hiển thị dấu nhắc để người dùng nhập lệnh tiếp theo
            rl.prompt();
        }));
        // Khi giao diện đóng (Ctrl+C, quit, hoặc exit), thoát chương trình
        rl.on('close', () => {
            console.log("Chương trình đã thoát.");
            process.exit(0);
        });
    });
}
