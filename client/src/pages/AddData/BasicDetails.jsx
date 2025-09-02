import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfileApi } from "../../api/useApi";

// const File_Url = import.meta.env.VITE_FILE_BASE_URL;

// utils/getDirectDriveLink.js
export const getDirectDriveLink = (url) => {
    try {
        // Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        const match = url.match(/\/d\/(.*?)\//);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        }
        return url; // अगर match न हुआ तो original URL return कर दो
    } catch (error) {
        console.error("Invalid Google Drive link:", url);
        return url;
    }
};



export default function BasicDetails() {
    const { profile, loadingProfile, saveProfile, addSkill, removeSkill, addSocialLink, removeSocialLink, } = useProfileApi();

    const [form, setForm] = useState({ fullName: "", role: "", bio: "", email: "", phone: "", location: "", profileImage: "", resume: "" });
    // const [profileImage, setProfileImage] = useState(null);
    // const [resumePreview, setResumePreview] = useState(null);
    const [newSkill, setNewSkill] = useState("");
    const [social, setSocial] = useState({ title: "", url: "" });

    //  Load profile into form when fetched
    useEffect(() => {
        if (profile) {
            setForm({
                fullName: profile.fullName || "",
                role: profile.role || "",
                bio: profile.bio || "",
                email: profile.email || "",
                phone: profile.phone || "",
                location: profile.location || "",

                profileImage: profile.profileImage || "",
                resume: profile.resume || "",
            });
            // if (profile.profileImage) {
            //     setProfileImage(`${File_Url}${profile.profileImage}`);
            // }
            // if (profile.resume) {
            //     setResumePreview(`${File_Url}${profile.resume}`);
            // }
        }
    }, [profile]);

    //  Handlers
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // const handleImageChange = (e) => {
    //     if (e.target.files[0]) {
    //         setProfileImage(URL.createObjectURL(e.target.files[0]));
    //         setForm({ ...form, profileImageFile: e.target.files[0] });
    //     }
    // };

    // const handleResumeChange = (e) => {
    //     if (e.target.files[0]) {
    //         setResumePreview(URL.createObjectURL(e.target.files[0]));
    //         setForm({ ...form, resumeFile: e.target.files[0] });
    //     }
    // };

    const handleSave = async () => {
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        // Add all form fields except files
        // Object.keys(form).forEach((key) => {
        //     if (key !== "profileImageFile" && key !== "resumeFile") {
        //         formData.append(key, form[key]);
        //     }
        // });

        // Add profile image file if exists
        // if (form.profileImageFile) { formData.append("profileImage", form.profileImageFile); }

        // Add resume file if exists
        // if (form.resumeFile) { formData.append("resume", form.resumeFile); }

        await saveProfile(formData);
    };

    const handleAddSkill = async () => {
        if (!newSkill.trim()) return;
        await addSkill(newSkill);
        setNewSkill("");
    };

    const handleAddSocialLink = async () => {
        const title = social.title.trim();
        const url = social.url.trim();

        if (!title || !url) return;

        try {
            await addSocialLink(title, url);
            setSocial({ title: "", url: "" });
        } catch (error) {
            console.error("Failed to add social link:", error);
        }
    };

    return (<>
        {loadingProfile.fetchProfile ? <ProfileSkeleton /> :
            <div className="row justify-content-center w-100 ms-0 me-0" >
                <div className="card shadow-lg border-0 custom-card-top no" style={{ borderRadius: "16px", position: "relative" }}>
                    {/* Header */}
                    <div className="card-header bg-white border-0 text-center pt-3 pt-md-4 pb-0">
                        <h4 className="card-title text-dark fw-bold mb-1 fs-2" style={{ letterSpacing: "-0.03em" }}>
                            <i className="bi bi-person-circle me-2 me-md-3"></i>
                            Edit Profile
                        </h4>
                        <p className="text-muted mb-0 fs-7">Update your professional information</p>
                    </div>

                    <div className="card-body p-2 p-md-3">
                        {/* Profile Image */}
                        <div className="text-center mb-5">
                            <div className="position-relative d-inline-block mb-2 mb-md-3">
                                <label htmlFor="profileImage" className="d-block" style={{ cursor: "pointer" }}>
                                    <img src={form.profileImage  || "/assets/img/face.jpg"} alt="Profile" className="rounded-circle border border-4 custom-profile-img" style={{ borderColor: "#667eea !important" }} />

                                    <div className="camera-overlay"><i className="bi bi-camera-fill"></i></div>
                                </label>
                                {/* <input id="profileImage" type="file" accept="image/*" className="d-none" onChange={handleImageChange} /> */}
                            </div>

                            {/* <p className="text-muted small"> <i className="bi bi-info-circle me-1"></i> Click to upload profile picture  </p> */}
                            <div className="col-md-12 text-start">
                                <label className="form-label text-dark fw-semibold small">Profile Url</label>
                                <input type="text" name="profileImage" value={form.profileImage} onChange={handleChange} className="form-control border-2 py-2" placeholder="https://www.img.com/image.jpg" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="mb-5">
                            <h5 className="text-dark fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline">
                                <i className="bi bi-person-badge me-2"></i>
                                Basic Information
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-dark fw-semibold small">Full Name</label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="form-control border-2 py-2" placeholder="Enter your full name" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-dark fw-semibold small">Professional Role</label>
                                    <input type="text" name="role" value={form.role} onChange={handleChange} className="form-control border-2 py-2" placeholder="e.g., Senior Developer" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-dark fw-semibold small">Professional Bio</label>
                                    <textarea name="bio" value={form.bio} onChange={handleChange} className="form-control border-2 py-2" rows="2" placeholder="Write a brief description..." style={{ borderColor: "#e2e8f0", borderRadius: "5px" }}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-5">
                            <h5 className="text-dark fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline">
                                <i className="bi bi-telephone me-2"></i>
                                Contact Information
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-dark fw-semibold small">Email Address</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control border-2 py-2" placeholder="your.email@example.com" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-dark fw-semibold small">Phone Number</label>
                                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-control border-2 py-2" placeholder="+91 (555) 123-4567" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-dark fw-semibold small">Location</label>
                                    <input type="text" name="location" value={form.location} onChange={handleChange} className="form-control border-2 py-2" placeholder="City, State, Country" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className="mb-5">
                            <h5 className="text-dark fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Resume
                            </h5>

                            {/* <div className="input-icon w-100">
                                <i className="bi bi-cloud-upload"></i>
                                <input type="file" className="form-control border-2 py-2" accept=".pdf,.doc,.docx" onChange={handleResumeChange} style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                            </div> */}

                            <div className="col-md-12">
                                <label className="form-label text-dark fw-semibold small">Resume Url</label>
                                <input type="text" name="resume" value={form.resume} onChange={handleChange} className="form-control border-2 py-2" placeholder="https://drive-link.com/reume.pdf" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }} />
                            </div>

                            {form.resume &&
                                <div className="resume-preview">
                                    <Link to={form.resume} target="_blank" rel="noreferrer" className="btn btn-link text-nowrap fs-9">
                                        View Selected Resume
                                    </Link>
                                </div>
                            }

                        </div>


                        {/* Skills */}
                        <div className="mb-5">
                            <h5 className="text-dark fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline">
                                <i className="bi bi-gear me-2"></i>
                                Skills & Technologies
                            </h5>

                            <div className="d-flex gap-3 mb-2 mb-md-3 flex-column flex-md-row">
                                <input type="text" className="form-control border-2 py-2" placeholder="Add a skill..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") { handleAddSkill(); }
                                    }}
                                    style={{ borderColor: "#e2e8f0", borderRadius: "5px" }}
                                />
                                <button type="button" className="btn btn-light btn-outline-primary py-2 px-4"
                                    onClick={handleAddSkill}
                                    disabled={loadingProfile.addSkill}
                                    style={{ borderRadius: "5px", whiteSpace: "nowrap", width: "", maxWidth: "100%" }}
                                >
                                    {loadingProfile.addSkill ? (<>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="ms-2">Loading...</span>
                                    </>) : (<>
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Add Skill
                                    </>)}
                                </button>
                            </div>

                            {profile?.skills?.length > 0 && (
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    {profile.skills.map((skill, index) => (
                                        <div key={index} className="d-flex align-items-center gap-3 px-2 py-1 fw-medium small bg-light text-black border custom-skill-tag">
                                            {skill}
                                            <i className="bi bi-x-circle-fill close" onClick={() => removeSkill(index)}></i>
                                            <i className="bi bi-check-circle-fill check"></i>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="mb-5">
                            <h5 className="text-dark fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline">
                                <i className="bi bi-share me-2"></i>
                                Social & Professional Links
                            </h5>

                            <div className="d-flex gap-3 mb-2 mb-md-3 flex-column flex-md-row">
                                <input type="text" className="form-control border-2 py-2" placeholder="e.g., LinkedIn, GitHub"
                                    value={social.title}
                                    onChange={(e) => setSocial({ ...social, title: e.target.value })}
                                    style={{ borderColor: "#e2e8f0", borderRadius: "5px" }}
                                />

                                <input type="url" className="form-control border-2 py-2" placeholder="https://linkedin.com/in/username"
                                    value={social.url}
                                    onChange={(e) => setSocial({ ...social, url: e.target.value })}
                                    style={{ borderColor: "#e2e8f0", borderRadius: "5px" }}
                                />

                                <button type="button" className="btn btn-light btn-outline-primary py-2 px-4"
                                    onClick={handleAddSocialLink}
                                    disabled={loadingProfile.addSocialLink}
                                    style={{ borderRadius: "5px", whiteSpace: "nowrap", width: "", maxWidth: "100%" }}
                                >
                                    {loadingProfile.addSocialLink ? (<>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="ms-2">Loading...</span>
                                    </>) : (<>
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Add Link
                                    </>)}
                                </button>
                            </div>

                            {profile?.socialLinks?.length > 0 && (
                                <div className="mt-3">
                                    {profile.socialLinks.map((link, index) => (
                                        <div key={index} className="bg-light border rounded px-2 py-1 mb-1 d-flex justify-content-between align-items-center" style={{ borderColor: "#e2e8f0", borderRadius: "5px" }}>
                                            <div className="d-flex gap-3 align-items-center w-100 overflow-hidden">
                                                <Link to={link.url} target="_blank" rel="noreferrer" className="text-decoration-none text-dark small text-nowrap d-flex justify-content-start align-items-center" style={{ color: "#667eea" }}>
                                                    <i className="bi bi-link-45deg me-2 text-info fs-6"></i>
                                                    <span className="">{link.title}</span>
                                                </Link>
                                            </div>
                                            <i className="bi bi-trash me-1 btn" style={{ color: "#ef4444" }} onClick={() => removeSocialLink(index)}></i>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        <button className="btn px-3 py-2 custom-save-btn shadow-lg btn-primary" onClick={handleSave} disabled={loadingProfile.saveProfile}>
                            {loadingProfile.saveProfile ? (<>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="ms-2">Updating...</span>
                            </>) : ("Update")}
                        </button>

                    </div>
                </div>
            </div>
        }
    </>);
}

export const ProfileSkeleton = () => {
    return (
        <div className="row justify-content-center w-100 ms-0 me-0">
            <div className="card shadow-lg border-0 custom-card-top no" style={{ borderRadius: "16px" }}>
                {/* Header */}
                <div className="card-header bg-white border-0 text-center pt-3 pt-md-4 pb-0">
                    <h4 className="card-title fw-bold mb-1 fs-2 placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h4>
                    <p className="text-muted mb-0 fs-7 placeholder-glow">
                        <span className="placeholder col-8"></span>
                    </p>
                </div>

                <div className="card-body p-2 p-md-3">
                    {/* Profile Image */}
                    <div className="text-center mb-5">
                        <div className="rounded-circle bg-light placeholder col-6"
                            style={{ width: "120px", height: "120px", margin: "0 auto" }}></div>
                        <p className="text-muted small placeholder-glow mt-2">
                            <span className="placeholder col-8"></span>
                        </p>
                    </div>

                    {/* Basic Information */}
                    <div className="mb-5">
                        <h5 className="fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline placeholder-glow">
                            <span className="placeholder col-4"></span>
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6 placeholder-glow">
                                <span className="placeholder col-12 py-3 rounded"></span>
                            </div>
                            <div className="col-md-6 placeholder-glow">
                                <span className="placeholder col-12 py-3 rounded"></span>
                            </div>
                            <div className="col-12 placeholder-glow">
                                <span className="placeholder col-12 py-5 rounded"></span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-5">
                        <h5 className="fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline placeholder-glow">
                            <span className="placeholder col-5"></span>
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6 placeholder-glow">
                                <span className="placeholder col-12 py-3 rounded"></span>
                            </div>
                            <div className="col-md-6 placeholder-glow">
                                <span className="placeholder col-12 py-3 rounded"></span>
                            </div>
                            <div className="col-12 placeholder-glow">
                                <span className="placeholder col-12 py-3 rounded"></span>
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-5">
                        <h5 className="fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline placeholder-glow">
                            <span className="placeholder col-3"></span>
                        </h5>
                        <div className="placeholder-glow">
                            <span className="placeholder col-12 py-3 rounded"></span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-5">
                        <h5 className="fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline placeholder-glow">
                            <span className="placeholder col-4"></span>
                        </h5>
                        <div className="d-flex flex-wrap gap-2 mt-3">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="placeholder col-2 py-2 rounded"></span>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mb-5">
                        <h5 className="fw-semibold mb-2 mb-md-3 pb-2 border-bottom border-2 custom-section-underline placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <div className="d-flex flex-column gap-2 mt-3">
                            {[...Array(3)].map((_, i) => (
                                <span key={i} className="placeholder col-12 py-3 rounded"></span>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="text-center">
                        <span className="placeholder col-3 py-3 rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

