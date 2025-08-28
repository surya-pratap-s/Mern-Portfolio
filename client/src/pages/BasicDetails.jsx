import { useEffect, useState } from "react";
import { useProfileApi } from "../api/useProfileApi";

export default function EditProfile() {
    const { profile, loading, saveProfile, addSkill, removeSkill, addSocialLink, removeSocialLink, } = useProfileApi();

    const [form, setForm] = useState({ fullName: "", role: "", bio: "", email: "", phone: "", location: "", });
    const [profileImage, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [newSkill, setNewSkill] = useState("");
    const [socialTitle, setSocialTitle] = useState("");
    const [socialUrl, setSocialUrl] = useState("");
    const [skills, setSkills] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);

    // ✅ Load profile into form when fetched
    useEffect(() => {
        if (profile) {
            setForm({
                fullName: profile.fullName || "",
                role: profile.role || "",
                bio: profile.bio || "",
                email: profile.email || "",
                phone: profile.phone || "",
                location: profile.location || "",
            });
            setSkills(profile.skills || []);
            setSocialLinks(profile.socialLinks || []);
            if (profile.profileImage) {
                setProfileImage(`http://localhost:5000/${profile.profileImage}`);
            }
        }
    }, [profile]);

    // ✅ Handlers
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
            setForm({ ...form, profileImageFile: e.target.files[0] });
        }
    };

    const handleResumeChange = (e) => {
        if (e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (key !== "profileImageFile") formData.append(key, form[key]);
        });
        if (form.profileImageFile) formData.append("profileImage", form.profileImageFile);
        if (resume) formData.append("resume", resume);

        await saveProfile(formData);
    };

    const handleAddSkill = async () => {
        if (!newSkill.trim()) return;
        await addSkill(newSkill);
        setNewSkill("");
    };

    const handleAddSocialLink = async () => {
        if (!socialTitle.trim() || !socialUrl.trim()) return;
        await addSocialLink(socialTitle, socialUrl);
        setSocialTitle("");
        setSocialUrl("");
    };

    return (
        <div className="row justify-content-center w-100">
            <div className="card shadow-lg border-0 custom-card-top" style={{ borderRadius: "16px" }}>
                {/* Header */}
                <div className="card-header bg-white border-0 text-center py-4">
                    <h4 className="card-title text-dark fw-bold mb-1" style={{ fontSize: "2.25rem", letterSpacing: "-0.025em" }}>
                        <i className="bi bi-person-circle me-3"></i>
                        Edit Profile
                    </h4>
                    <p className="text-muted mb-0">Update your professional information</p>
                </div>

                <div className="card-body p-2 p-md-3">
                    {/* Profile Image */}
                    <div className="text-center mb-5">
                        <div className="position-relative d-inline-block mb-3">
                            <label htmlFor="profileImage" className="d-block" style={{ cursor: "pointer" }}>
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="rounded-circle border border-4 custom-profile-img"
                                        style={{ borderColor: "#667eea !important" }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle border border-4 d-flex align-items-center justify-content-center text-white custom-profile-placeholder"
                                        style={{ borderColor: "#667eea" }}
                                    >
                                        <i className="bi bi-person-fill" style={{ fontSize: "3rem" }}></i>
                                    </div>
                                )}
                                <div className="camera-overlay">
                                    <i className="bi bi-camera-fill"></i>
                                </div>
                            </label>
                            <input id="profileImage" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
                        </div>
                        <p className="text-muted small">
                            <i className="bi bi-info-circle me-1"></i>
                            Click to upload profile picture
                        </p>
                    </div>

                    {/* Basic Information */}
                    <div className="mb-5">
                        <h5 className="text-dark fw-semibold mb-3 pb-2 border-bottom border-2 custom-section-underline">
                            <i className="bi bi-person-badge me-2"></i>
                            Basic Information
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label text-dark fw-semibold small">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    placeholder="Enter your full name"
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-dark fw-semibold small">Professional Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    placeholder="e.g., Senior Developer"
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark fw-semibold small">Professional Bio</label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    rows="3"
                                    placeholder="Write a brief description..."
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-5">
                        <h5 className="text-dark fw-semibold mb-3 pb-2 border-bottom border-2 custom-section-underline">
                            <i className="bi bi-telephone me-2"></i>
                            Contact Information
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label text-dark fw-semibold small">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    placeholder="your.email@example.com"
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-dark fw-semibold small">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    placeholder="+91 (555) 123-4567"
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark fw-semibold small">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className="form-control border-2 py-3"
                                    placeholder="City, State, Country"
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-5">
                        <h5 className="text-dark fw-semibold mb-3 pb-2 border-bottom border-2 custom-section-underline">
                            <i className="bi bi-file-earmark-text me-2"></i>
                            Resume
                        </h5>
                        <div className="input-icon">
                            <i className="bi bi-cloud-upload"></i>
                            <input
                                type="file"
                                className="form-control border-2 py-3"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-5">
                        <h5 className="text-dark fw-semibold mb-3 pb-2 border-bottom border-2 custom-section-underline">
                            <i className="bi bi-gear me-2"></i>
                            Skills & Technologies
                        </h5>
                        <div className="d-flex gap-3 mb-3 flex-column flex-md-row">
                            <input
                                type="text"
                                className="form-control border-2 py-3"
                                placeholder="Add a skill..."
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                                style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                            />
                            <button
                                className="btn fw-semibold py-3 px-4"
                                type="button"
                                onClick={handleAddSkill}
                                style={{ backgroundColor: "#667eea", color: "white", borderRadius: "8px" }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Skill
                            </button>
                        </div>

                        {profile?.skills?.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {profile.skills.map((skill, index) => (
                                    <div key={index} className="d-flex align-items-center gap-2 px-3 py-2 fw-medium small custom-skill-tag transition-all">
                                        {skill}
                                        <i className="bi bi-x-circle-fill close" onClick={() => removeSkill(index)}></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="mb-5">
                        <h5 className="text-dark fw-semibold mb-3 pb-2 border-bottom border-2 custom-section-underline">
                            <i className="bi bi-share me-2"></i>
                            Social & Professional Links
                        </h5>
                        <div className="row g-3 mb-3">
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control border-2 py-3"
                                    placeholder="e.g., LinkedIn, GitHub"
                                    value={socialTitle}
                                    onChange={(e) => setSocialTitle(e.target.value)}
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="url"
                                    className="form-control border-2 py-3"
                                    placeholder="https://linkedin.com/in/username"
                                    value={socialUrl}
                                    onChange={(e) => setSocialUrl(e.target.value)}
                                    style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button
                                    className="btn w-100 fw-semibold py-3"
                                    type="button"
                                    onClick={handleAddSocialLink}
                                    style={{ backgroundColor: "#10b981", color: "white", borderRadius: "8px" }}
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Link
                                </button>
                            </div>
                        </div>

                        {profile?.socialLinks?.length > 0 && (
                            <div className="mt-3">
                                {profile.socialLinks.map((link, index) => (
                                    <div
                                        key={index}
                                        className="bg-light border rounded p-3 mb-3 d-flex justify-content-between align-items-center"
                                        style={{ borderColor: "#e2e8f0", borderRadius: "8px" }}
                                    >
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="fw-semibold text-dark mb-1">
                                                <i className="bi bi-link-45deg me-2"></i>
                                                {link.title}
                                            </div>
                                            <a href={link.url} target="_blank" rel="noreferrer" className="text-decoration-none small text-break" style={{ color: "#667eea" }}>
                                                {link.url}
                                            </a>
                                        </div>
                                        <i className="bi bi-trash me-1 btn" style={{ color: "#ef4444" }} onClick={() => removeSocialLink(index)}></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="text-center mt-5 pt-4 border-top">
                        <button className="btn btn-lg fw-bold text-uppercase px-5 py-3 border-0 custom-save-btn" onClick={handleSave}>
                            <i className="bi bi-check-circle me-2"></i>
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
