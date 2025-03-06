import React, { useState, useEffect } from "react";
import "./tasks.css";
import { useCreateTasksMutation, useDeleteTaskMutation, useGetCreatedTaskQuery, useUpdateTaskCompletionMutation } from "../../features/api/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const {user} = useSelector((store)=>store.auth) // Fetch user to check that it exist or not
  const { data: tasksData, refetch, isFetching } = useGetCreatedTaskQuery(); //Fetch tasks
  const [createTasks, { isLoading, isSuccess }] = useCreateTasksMutation();
  const [updateTaskCompletion] = useUpdateTaskCompletionMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const navigate=useNavigate()
  useEffect(() => {
    if (isSuccess) {
      refetch(); // Automatically refetch tasks when new task is added
    }
  }, [isSuccess, refetch]);

  const addTask = async () => {
    if(!user){
      toast.error("Please Login First")
      navigate("/login")
      return;
    }
    if (!title || !description || !dueDate) {
      toast.error("All Fields are required")
      return;
    }
    
    try {
      await createTasks({ title, description, dueDate });

      setTitle("");
      setDescription("");
      setDueDate("");

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  const toggleComplete = async (taskId) => {
    try {
      await updateTaskCompletion(taskId);
      refetch(); //Refresh tasks after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div style={{ marginTop: "130px" }}>
      <div className="task-container">
        <h2>Task Manager</h2>
        <div className="task-input">
          <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button onClick={addTask} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Task"}
          </button>
        </div>
        {isFetching && <p>Loading tasks...</p>}
        <div className="task-list">
          {tasksData?.tasks?.length > 0 && <h3>Task List</h3>}
          <div className="task-card-container">
            {tasksData?.tasks?.map((task, index) => (
              <div className="task-card" key={index}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}</p>
                <button onClick={() => toggleComplete(task._id)}>{task.complete ? "Completed" : "Mark as Complete"}</button>
                {task.complete ? <button onClick={() => removeTask(task._id)} style={{backgroundColor:"red"}}>Delete</button>:<p>Complete it</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;



