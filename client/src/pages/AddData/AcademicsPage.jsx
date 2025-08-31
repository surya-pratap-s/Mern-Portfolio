import React, { useState } from "react";
import { useAcademicsApi } from "../../api/useApi";

export default function AcademicsPage() {
  const { academics, loadingAcademics, addAcademic, updateAcademic, deleteAcademic } = useAcademicsApi()

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ degree: "", college: "", duration: "", score: "", location: "", });

  // Open modal (with or without data)
  const handleOpen = (data = null) => {
    if (data) {
      setFormData({
        degree: data.degree,
        college: data.college,
        duration: data.duration,
        score: data.score,
        location: data.location,
      });
      setEditId(data._id);
    } else {
      setFormData({ degree: "", college: "", duration: "", score: "", location: "" });
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
      await updateAcademic(editId, formData);
    } else {
      await addAcademic(formData);
    }
    handleClose();
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteAcademic(id);
  };

  return (
    <div className="w-100">
      {/* Card */}
      <div className="card shadow-lg no">
        <div className="card-header bg-light border-0 rounded-top-4 py-3 no">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title fw-bold mb-0">
              <i className="bi bi-mortarboard-fill text-primary me-2"></i> Academics
            </h4>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-3" onClick={() => handleOpen(false)} >
              <b><i className="bi bi-plus-lg fs-6 fw-bolder"></i> &nbsp;Add</b>
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* ✅ Show skeletons when loading */}
          {loadingAcademics ?
            <ul className="list-unstyled mt-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="mb-4 d-flex flex-row">
                  <div className="w-100 pe-2">
                    <div className="placeholder-glow d-flex flex-column">
                      <span className="placeholder col-6 rounded-2 mb-2"></span>
                      <span className="placeholder col-8 rounded-2 mb-2"></span>
                      <div className="d-flex flex-wrap justify-content-between mb-2">
                        <span className="placeholder col-2 rounded-2"></span>
                        <span className="placeholder col-1 rounded-2"></span>
                      </div>
                      <span className="placeholder col-4 rounded-2"></span>
                    </div>
                  </div>
                  <div className="placeholder-glow d-flex gap-2 flex-column ms-2">
                    <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                    <span className="btn btn-sm btn-outline-secondary placeholder col-6"></span>
                  </div>
                </li>
              ))}
            </ul>
            :
            academics.length > 0 ? (
              <ul className="blue bullet-line-list mt-3">
                {academics.map((item) => (
                  <li key={item.id} className="mb-4 d-flex flex-row">
                    <div className="w-100">
                      <h6 className="fw-semibold fs-16">{item.degree}</h6>
                      <p className="fs-13 p-0 m-0">{item.college}</p>
                      <div className="d-flex justify-content-between align-items-center p-0 m-0">
                        <p className="fs-11 d-flex gap-2 align-items-center mb-0">
                          <i className="bi bi-calendar" />{item.duration}
                        </p>
                        <span className="badge bg-success-subtle text-success fw-semibold px-3">{item.score}</span>
                      </div>
                      <p className="fs-13">{item.location}</p>
                    </div>
                    <div className="d-flex gap-2 flex-column ms-2">
                      <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => handleOpen(item)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => handleDelete(item._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted text-center mt-3">No academic records found.</p>
            )
          }
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-sm overflow-hidden">

              {/* Header with gradient */}
              <div className="modal-header text-white"
                style={{ background: "linear-gradient(135deg, #0d6efd, #6610f2)" }}>
                <h5 className="modal-title fw-bold">{editId ? "✏️ Edit Academic Record" : "✛ Add Academic Record"}</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleClose}></button>
              </div>

              {/* Body */}
              <div className="modal-body bg-light">
                <form className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">🎓 Degree</label>
                    <input type="text" className="form-control rounded-pill shadow-sm border-0" name="degree" value={formData.degree} onChange={handleChange} placeholder="Ex: B.Tech in CSE" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">🏫 College</label>
                    <input type="text" className="form-control rounded-pill shadow-sm border-0" name="college" value={formData.college} onChange={handleChange} placeholder="Ex: IIT Delhi" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">📅 Duration</label>
                    <input type="text" className="form-control rounded-pill shadow-sm border-0" name="duration" value={formData.duration} onChange={handleChange} placeholder="Ex: 2020-2024" />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">⭐ Score</label>
                    <input type="text" className="form-control rounded-pill shadow-sm border-0" name="score" value={formData.score} onChange={handleChange} placeholder="Ex: 80%" />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">📍 Location</label>
                    <input type="text" className="form-control rounded-pill shadow-sm border-0" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: Gorakhpur" />
                  </div>

                </form>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-white d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4 shadow-sm" onClick={handleClose}> ❌ Cancel </button>
                <button type="button" className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold" onClick={handleSave}> {editId ? "🚀 Update" : "💾 Save"}</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
