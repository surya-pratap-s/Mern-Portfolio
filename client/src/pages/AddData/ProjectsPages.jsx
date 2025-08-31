import React, { useState } from "react";
import { useProjectsApi } from "../../api/useApi";


export default function ProjectsPages() {
    const { projects, loadingProjects, addProject, updateProject, deleteProject } = useProjectsApi();

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", technologies: [], liveUrl: "", githubUrl: "", });
    const [techInput, setTechInput] = useState("");

    // Open modal
    const handleOpen = (data = null) => {
        if (data) {
            setFormData({
                title: data.title,
                description: data.description,
                technologies: data.technologies || [],
                liveUrl: data.liveUrl || "",
                githubUrl: data.githubUrl || "",
            });
            setEditId(data._id);
        } else {
            setFormData({ title: "", description: "", technologies: [], liveUrl: "", githubUrl: "" });
            setEditId(null);
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddTech = () => {
        if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                technologies: [...prev.technologies, techInput.trim()],
            }));
        }
        setTechInput("");
    };

    const handleRemoveTech = (tech) => {
        setFormData((prev) => ({
            ...prev,
            technologies: prev.technologies.filter((t) => t !== tech),
        }));
    };

    // Save or update
    const handleSave = async () => {
        if (editId) {
            await updateProject(editId, formData);
        } else {
            await addProject(formData);
        }
        handleClose();
    };

    return (
        <div className="w-100">
            {/* Card */}
            <div className="card shadow-lg no">
                <div className="card-header bg-light border-0 rounded-top-4 py-3 no">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title fw-bold mb-0">
                            <i className="bi bi-code-slash text-primary me-2"></i> Projects
                        </h4>
                        <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-3" onClick={() => handleOpen(false)}>
                            <b><i className="bi bi-plus-lg fs-6 fw-bolder"></i> &nbsp;Add</b>

                        </button>
                    </div>
                </div>

                <div className="card-body">
                    {loadingProjects ? (
                        <ul className="list-unstyled mt-3"> {[1, 2, 3].map((i) => (
                            <li key={i} className="mb-4 d-flex flex-row">
                                <div className="w-100 pe-2">
                                    <div className="placeholder-glow d-flex flex-column">
                                        <span className="placeholder col-6 rounded-2 mb-2"></span>
                                        <span className="placeholder col-8 rounded-2 mb-2"></span>
                                        <span className="placeholder col-4 rounded-2"></span>
                                    </div>
                                    <div className="placeholder-glow d-flex flex-wrap gap-2 mt-2">
                                        <span className="placeholder col-1 rounded-2"></span>
                                        <span className="placeholder col-1 rounded-2"></span>
                                        <span className="placeholder col-1 rounded-2"></span>
                                    </div>
                                </div>
                                <div className="placeholder-glow d-flex gap-2 flex-column ms-2">
                                    <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                                    <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                                </div>
                            </li>
                        ))}
                        </ul>
                    ) : projects.length > 0 ? (projects.map((item) => (
                        <div key={item._id} className="pb-2 mb-3 d-flex flex-row border-bottom">
                            <div className="w-100">
                                <h6 className="fw-semibold fs-6 mb-1">{item.title}</h6>
                                <p className="small text-muted mb-2" >{item.description}</p>
                                {item.technologies?.length > 0 &&
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {item.technologies.map((tech, idx) => {
                                            const colors = ["#e3f2fd", "#e8f5e9", "#ffebee", "#fff3cd", "#e0f7fa", "#f3e5f5"];
                                            const textColors = ["#0d47a1", "#1b5e20", "#b71c1c", "#795548", "#004d40", "#4a148c"];
                                            return (
                                                <span key={idx} className="badge me-1" style={{ backgroundColor: colors[idx % colors.length], color: textColors[idx % textColors.length], }} >
                                                    {tech}
                                                </span>
                                            );
                                        })}
                                    </div>
                                }
                                <div className="d-flex gap-2">
                                    {item.githubUrl && (
                                        <a href={item.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark rounded px-2 fs-9"><i className="bi bi-github">&nbsp;</i> GitHub</a>
                                    )}
                                    {item.liveUrl && (
                                        <a href={item.liveUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark rounded px-2 fs-9"><i className="bi bi-box-arrow-up-right">&nbsp;</i> Live</a>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex gap-2 flex-column ms-2">
                                <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => handleOpen(item)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => deleteProject(item._id)}><i className="bi bi-trash"></i></button>
                            </div>
                        </div>
                    ))) : (
                        <p className="text-muted text-center mt-3">No projects found.</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.6)" }} tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="modal-header text-white" style={{ background: "linear-gradient(135deg, #0d6efd, #6610f2)" }}>
                                <h5 className="modal-title fw-bold">{editId ? "✏️ Edit Project" : <> ✛ {" "}Add Project</>}</h5>
                                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleClose}></button>
                            </div>

                            {/* Body */}
                            <div className="modal-body bg-light">
                                <form className="row g-4">
                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📌 Title</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Portfolio Website" />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📝 Description</label>
                                        <textarea className="form-control shadow-sm border-0 rounded-3" name="description" rows="5" value={formData.description} onChange={handleChange} placeholder="Write project details (you can add formatting later with a rich text editor)" />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">🛠 Technologies</label>
                                        <div className="d-flex gap-2 mb-2">
                                            <input type="text" className="form-control rounded shadow-sm border-0" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Ex: React, Node.js" />
                                            <button type="button" className="btn btn-outline-primary rounded" onClick={handleAddTech}>Add</button>
                                        </div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {formData.technologies.map((tech, idx) => (
                                                <div key={idx} className="d-flex align-items-center gap-3 px-2 py-1 fw-medium small bg-light text-black border custom-skill-tag">
                                                    {tech}
                                                    <i className="bi bi-x-circle-fill close" onClick={() => handleRemoveTech(tech)}></i>
                                                    <i className="bi bi-check-circle-fill check"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">🔗 GitHub URL</label>
                                        <input type="url" className="form-control rounded shadow-sm border-0" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="https://github.com/username/repo" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">🌍 Live URL</label>
                                        <input type="url" className="form-control rounded shadow-sm border-0" name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="https://myproject.com" />
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer bg-white d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-secondary rounded px-4 shadow-sm" onClick={handleClose}>❌ Cancel</button>
                                <button type="button" className="btn btn-primary rounded px-4 shadow-sm fw-bold" onClick={handleSave}>{editId ? "🚀 Update" : "💾 Save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
