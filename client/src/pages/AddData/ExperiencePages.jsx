import React, { useState } from "react";
import { useExpriencesApi } from "../../api/useApi";


export default function ExperiencePages() {
    const { experiences, loadingExperiences, addExperience, updateExperience, deleteExperience } = useExpriencesApi();

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: "", company: "", companyAddress: "", duration: "", description: "", });

    // Open modal
    const handleOpen = (data = null) => {
        if (data) {
            setFormData({
                title: data.title,
                company: data.company,
                companyAddress: data.companyAddress,
                duration: data.duration,
                description: data.description,
            });
            setEditId(data._id);
        } else {
            setFormData({ title: "", company: "", companyAddress: "", duration: "", description: "", });
            setEditId(null);
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save or update
    const handleSave = async () => {
        if (editId) {
            await updateExperience(editId, formData);
        } else {
            await addExperience(formData);
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
                            <i className="bi bi-briefcase-fill text-warning me-2"></i>
                            Experience
                        </h4>
                        <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-3" onClick={() => handleOpen(false)}>
                            <b><i className="bi bi-plus-lg fs-6 fw-bolder"></i> &nbsp;Add</b>
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    {loadingExperiences ? (
                        <ul className="list-unstyled mt-3">
                            {[1, 2, 3].map((i) => (
                                <li key={i} className="mb-4 d-flex flex-row">
                                    <div className="w-100">
                                        <div className="placeholder-glow d-flex flex-column">
                                            <span className="placeholder col-6 rounded-2 mb-2"></span>
                                            <span className="placeholder-glow d-flex flex-row">
                                                <span className="placeholder col-3 rounded-2 mb-2"></span>
                                                <span className="col-7 rounded-2 mb-2"></span>
                                                <span className="placeholder col-2 rounded-2 mb-2"></span>
                                            </span>
                                            <span className="placeholder col-1 rounded-2 mb-2"></span>
                                            <span className="placeholder col-12 rounded-2 py-3"></span>
                                        </div>
                                    </div>
                                    <div className="placeholder-glow d-flex gap-2 flex-column ms-2">
                                        <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                                        <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : experiences.length > 0 ? (
                        <ul className="yellow bullet-line-list mt-3">
                            {experiences.map((item) => (
                                <li key={item.id} className="mb-4 d-flex flex-row">
                                    <div className="w-100 pe-2">
                                        <h6 className='fw-semibold fs-16 mb-1'>{item.title}</h6>
                                        <div className='d-flex justify-content-between'>
                                            {item.company && <p className='fs-12'>{item.company}</p>}
                                            {item.companyAddress && <p className='fs-12'>{item.companyAddress}</p>}
                                        </div>
                                        <p className="fs-11 d-flex gap-2 align-items-center mb-0">
                                            <i className="bi bi-calendar" />{item.duration}
                                        </p>
                                        <p className="fs-12">{item.description}</p>
                                    </div>
                                    <div className="d-flex gap-2 flex-column ms-2">
                                        <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => handleOpen(item)}><i className="bi bi-pencil-square"></i></button>
                                        <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => deleteExperience(item._id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted text-center mt-3">No Exprience found.</p>
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
                                <h5 className="modal-title fw-bold">{editId ? "✏️ Edit Exprience" : <> ✛ {" "}Add Exprience</>}</h5>
                                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleClose}></button>
                            </div>

                            {/* Body */}
                            <div className="modal-body bg-light">
                                <form className="row g-4">
                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📌 Title</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Mern Stack Developer" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">🏢 Company</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="company" value={formData.company} onChange={handleChange} placeholder="Ex: Google, TCS" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">📅 Duration</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="duration" value={formData.duration} onChange={handleChange} placeholder="Ex: 2020-2024" />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📍Company Address</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="companyAddress" value={formData.companyAddress} onChange={handleChange} placeholder="Ex: Gorakhpur" />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📝 Description</label>
                                        <textarea className="form-control shadow-sm border-0 rounded-3" name="description" rows="5" value={formData.description} onChange={handleChange} placeholder="Write project details (you can add formatting later with a rich text editor)" />
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
