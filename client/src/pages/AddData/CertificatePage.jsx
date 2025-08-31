import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useCertificatesApi } from "../../api/useApi";


export default function CertificatePage() {
    const { certificates, loadingCertificates, addCertificates, updateCertificates, deleteCertificates } = useCertificatesApi();

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ courseName: "", company: "", duration: "", certificateLink: "" });

    // Open modal
    const handleOpen = (data = null) => {
        if (data) {
            setFormData({
                courseName: data.courseName,
                company: data.company,
                duration: data.duration,
                certificateLink: data.certificateLink,
            });
            setEditId(data._id);
        } else {
            setFormData({ courseName: "", company: "", duration: "", certificateLink: "" });
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
            await updateCertificates(editId, formData);
        } else {
            await addCertificates(formData);
        }
        handleClose();
    };

    const handleDownload = (url, filename) => {
        try {
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename || "file");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };


    return (
        <div className="w-100">
            {/* Card */}
            <div className="card shadow-lg no">
                <div className="card-header bg-light border-0 rounded-top-4 py-3 no">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title fw-bold mb-0">
                            <i className="bi bi-award-fill text-success me-2"></i>
                            Certificates
                        </h4>
                        <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-3" onClick={() => handleOpen(false)}>
                            <b><i className="bi bi-plus-lg fs-6 fw-bolder"></i> &nbsp;Add</b>
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    {loadingCertificates ? (
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
                    ) : certificates.length > 0 ? (
                        <ul className="timeline list-unstyled">
                            {certificates.map((item) => (
                                <li key={item.id} className="mb-4 d-flex flex-row position-relative ps-4 border-start border-2 border-success">
                                    <div className="w-100 pe-2">
                                        <h6 className="fw-semibold fs-6 mb-1">{item.courseName}</h6>
                                        <div className="d-flex justify-content-between small text-muted fs-10 py-1">
                                            <span>{item.company}</span>
                                            <span><i className="bi bi-calendar"></i>&nbsp; {item.duration}</span>
                                        </div>
                                        <div className="d-flex gap-2 mt-2">
                                            <Link to={item.certificateLink} target='blank' rel="noreferrer" className="btn btn-sm btn-outline-dark rounded-pill px-3 fs-12">
                                                <i className="bi bi-eye">&nbsp;</i> View
                                            </Link>
                                            <span onClick={() => handleDownload(item.certificateLink, `${item.courseName}.pdf`)} className="btn btn-sm btn-outline-dark rounded-pill px-3 fs-12">
                                                <i className="bi bi-download">&nbsp;</i> Download
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 flex-column ms-2">
                                        <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => handleOpen(item)}><i className="bi bi-pencil-square"></i></button>
                                        <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => deleteCertificates(item._id)}><i className="bi bi-trash"></i></button>
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
                                <h5 className="modal-title fw-bold">{editId ? "✏️ Edit Certificates" : <> ✛ {" "}Add Certificates</>}</h5>
                                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleClose}></button>
                            </div>

                            {/* Body */}
                            <div className="modal-body bg-light">
                                <form className="row g-4">
                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">📌 Course Name</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Ex: Mern Stack Developer" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">🏢 Company Name</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="company" value={formData.company} onChange={handleChange} placeholder="Ex: Google, TCS" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">📅 Duration</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="duration" value={formData.duration} onChange={handleChange} placeholder="Ex: 2020-2024" />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">🏅 Certificate Link</label>
                                        <input type="text" className="form-control rounded shadow-sm border-0" name="certificateLink" value={formData.certificateLink} onChange={handleChange} placeholder="Ex: https://example.com/certificates/react-basics.pdf" />
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
