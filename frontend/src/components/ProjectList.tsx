import { useEffect, useState } from "react";
import { api } from "../apiConfig/api";
import TaskList from "./TaskList";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
};

const defaultForm: Partial<Project> = {
  title: "",
  description: "",
  status: "Pending",
};

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>(defaultForm);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async () => {
    const res = await api.post("/project/get");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleProject = (projectId: string) => {
    setOpenProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this project?");
  if (confirmDelete) {
    await api.post(`/project/delete`,{ id });
    fetchProjects();
  }
};

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) return;
    if (editMode && formData._id) {
      await api.post(`/project/update`, { ...formData, id: formData._id });
    } else {
      await api.post("/project/create", formData);
    }
    setFormData(defaultForm);
    setEditMode(false);
    setShowModal(false);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditMode(true);
    setShowModal(true);
  };

  return (<>
   <Navbar/>

    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button
          onClick={() => {
            setFormData(defaultForm);
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          const isOpen = openProjectId === project._id;
          return (
            <div key={project._id} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <div
                onClick={() => toggleProject(project._id)}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <div>
                  <h2 className="text-lg font-semibold text-black">{project.title}</h2>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-xs mt-1 italic text-gray-500">Status: {project.status}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <MdEdit 
                    size={28}
                     
                      className="text-blue-900 text-sm underline"
                    
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(project);
                    }}
                 
                />
                 <MdDelete
                 size={28}
    onClick={(e) => {
      e.stopPropagation();
      handleDelete(project._id);
    }}
    className="text-red-600 text-sm underline"
  />

                  <span className="text-gray-500 text-xl">{isOpen ? "−" : "+"}</span>
                </div>
              </div>

              {isOpen && (
                <div className="bg-gray-50 px-4 py-4">
                  <TaskList projectId={project._id} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              {editMode ? "Edit Project" : "Add New Project"}
            </h2>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Project Title"
              className="border px-3 py-2 w-full mb-2 rounded text-black"
            />
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Project Description"
              className="border px-3 py-2 w-full mb-2 rounded text-black"
            />
            <select
              name="status"
              value={formData.status || "Pending"}
              onChange={handleChange}
              className="border px-3 py-2 w-full mb-4 rounded text-black"
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setFormData(defaultForm);
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editMode ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
      </>
  );
};

export default ProjectList;
