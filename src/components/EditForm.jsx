import { useState, useEffect } from "react";

// library imports
import { CheckIcon } from "@heroicons/react/24/solid";

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  // local state for tasks.name i.e editedTask.name so updated onInput and value of input updated
  //   * Reason why it's fed like this so have specific local state we can use in put and value of forms
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  useEffect(() => {
    const closeModalIfEscaped = (e) => e.key === "Escape" && closeEditMode();

    window.addEventListener("keydown", closeModalIfEscaped);

    // cleanUp
    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeEditMode]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Func from App confirms task.id or editedTask.id correct then updated corresponding name via local state updatedTaskName
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  return (
    <div
      role="dialog"
      aria-labelledby="editedTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updatedTaskName}
            onInput={(e) => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="label">
            Update Task
          </label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type="submit"
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
