const axios = require('axios');
const readline = require('readline-sync');

const API_URL = 'http://localhost:5000/tasks';

async function listTasks() {
  try {
    const res = await axios.get(API_URL);
    const tasks = res.data;
    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      tasks.forEach((task: any) => {
        console.log(`- [${task.id}] ${task.title}: ${task.description}`);
      });
    }
  } catch (err: any) {
    console.error('Error listing tasks:', err.message);
  }
}

async function createTask() {
  const title = readline.question('Title: ');
  const description = readline.question('Description: ');
  try {
    const res = await axios.post(API_URL, { title, description });
    console.log('Task created:', res.data);
  } catch (err: any) {
    console.error('Error creating task:', err.message);
  }
}

async function updateTask() {
  const id = readline.questionInt('Task ID to update: ');
  const title = readline.question('New title: ');
  const description = readline.question('New description: ');
  try {
    const res = await axios.put(`${API_URL}/${id}`, { title, description });
    console.log('Task updated:', res.data);
  } catch (err: any) {
    console.error('Error updating task:', err.message);
  }
}

async function deleteTask() {
  const id = readline.questionInt('Task ID to delete: ');
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    console.log(res.data.message);
  } catch (err: any) {
    console.error('Error deleting task:', err.message);
  }
}

async function main() {
  console.log('\n--- Task Manager CLI ---');
  console.log('1. List tasks');
  console.log('2. Create task');
  console.log('3. Update task');
  console.log('4. Delete task');
  console.log('0. Exit');

  const choice = readline.questionInt('\nChoose an option: ');

  switch (choice) {
    case 1:
      await listTasks();
      break;
    case 2:
      await createTask();
      break;
    case 3:
      await updateTask();
      break;
    case 4:
      await deleteTask();
      break;
    case 0:
      console.log('Bye!');
      return;
    default:
      console.log('Invalid option.');
  }

  main(); // Loop again
}

main();
