import { useEffect, useState } from "react";
import { api } from "../apiConfig/api";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
type Task = {
  _id: string;
  title: string;
  status: string;
};

const defaultTask: Partial<Task> = {
  title: "",
  status: "todo",
};

const TaskList = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState<Partial<Task>>(defaultTask);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const fetchTasks = async () => {
    const res = await api.post("/task/get", { projectId });
    setTasks(res.data);
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === filter));
    }
  }, [filter, tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!taskForm.title) return;
    if (editMode && taskForm._id) {
      await api.post(`/task/update/${taskForm._id}`, { ...taskForm });
    } else {
      await api.post("/task/create", { ...taskForm, projectId });
    }
    setTaskForm(defaultTask);
    setEditMode(false);
    setShowModal(false);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setTaskForm(task);
    setEditMode(true);
    setShowModal(true);
  };
const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this task?")) {
    await api.post(`/task/delete/${id}`);
    fetchTasks();
  }
};
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-black">Tasks</h3>
        <button
          onClick={() => {
            setTaskForm(defaultTask);
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          + Task
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="text-sm font-medium text-black">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Completed</option>
        </select>
      </div>

      {/* Tasks */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
       <li
  key={task._id}
  className="border p-3 rounded text-black bg-gray-50 flex justify-between items-center"
>
  <div>
    <p className="font-medium">{task.title}</p>
    <p className="text-sm text-gray-500">Status: {task.status}</p>
  </div>
  <div className="flex gap-3 items-center">
    <MdEdit 
    size={28}
    color="green"
      onClick={() => handleEdit(task)}

    />
      
    < MdDelete
    size={28}
    color="red"
      onClick={() => handleDelete(task._id)}
     
    />
     
  </div>
</li>

        ))}
        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-500 italic">No tasks found for selected filter.</p>
        )}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              {editMode ? "Edit Task" : "Add Task"}
            </h2>
            <input
              type="text"
              name="title"
              value={taskForm.title || ""}
              onChange={handleChange}
              placeholder="Task Title"
              className="border px-3 py-2 w-full mb-2 rounded text-black"
            />
            <select
              name="status"
              value={taskForm.status || "todo"}
              onChange={handleChange}
              className="border px-3 py-2 w-full mb-4 rounded text-black"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setTaskForm(defaultTask);
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editMode ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
