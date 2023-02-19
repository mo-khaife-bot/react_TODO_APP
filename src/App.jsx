import { useState } from "react";

// custom components
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  // State to pass task down into EditForm
  const [editedTask, setEditedTask] = useState(null);
  // state will determine if we show EditForm or not
  const [isEditing, setIsEditing] = useState(false);

  // State to keep track of what previous task was clicked to update
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  // function to pass down
  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  function deleteTask(e, taskID) {
    e.preventDefault();
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== taskID));
  }

  // Func to toggle check if activity done or not
  function toggleTask(noteID) {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        return task.id === noteID ? { ...task, checked: !task.checked } : task;
      })
    );
  }

  // Func to connect onupdate task.name state in EditForm component
  function updateTask(task) {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  }

  // Func to get out of EditMode
  const closeEditMode = () => {
    setIsEditing(false);
    // TODO: previous state focus
    previousFocusEl.focus();
  };

  // Func to enter EditMode
  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    // TODO: set focus back to original
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          tasks={tasks}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
