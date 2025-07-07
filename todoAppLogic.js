const { Command } = require('commander');
const program = new Command();
const fs = require("fs");
const path = './todos.json';

console.log("Application Started");
let todos = [];

function readTodo() {
    if(!fs.existsSync(path)) return [];
    const data = fs.readFileSync(path,'utf-8');
    if(!data.trim()) return [];
    return JSON.parse(data);
}


program
    .version('1.0.0')
    .description('A CLI based Task Management Application')

program
    .command('add <todo>')
    .description('Add a new Todo')
    .option('-p, --priority <level>', 'Set Priority')
    .action((todo,option) => {
        if (fs.existsSync(path)) {
        const fileData = fs.readFileSync(path, 'utf-8');
        if (fileData.trim().length > 0) {
            todos = JSON.parse(fileData);
        } else {
            todos = [];
        }
    }

        todos.push({task: todo, priority: option.priority});
        fs.writeFileSync(path,JSON.stringify(todos,null,2),'utf-8');
        console.log(`Task added : ${todo} with priority ${option.priority}`);
    });

program
    .command('delete <taskName>') 
    .description()

program 
    .command('list')
    .description('List all the todos.')
    .action(() => {
        const todos = readTodo();
        if(todos.length == 0) {
            console.log('No todos found.');
        } else {
            console.log('Your todos : ');
            todos.forEach((todo,index) => {
                console.log(`${index+1}. ${todo.task} [Priority: ${todo.priority}]`);
            })
        }
    });


program.parse(process.argv);