import React from 'react'
import { Link } from 'react-router-dom';
import { useAcademicsApi, useExpriencesApi, useProfileApi, useProjectsApi, useCertificatesApi } from '../../api/useApi';

const File_Url = import.meta.env.VITE_FILE_BASE_URL;

export default function AdminHome() {
    const { profile, loadingProfile } = useProfileApi();
    const { academics, loadingAcademics } = useAcademicsApi();
    const { projects, loadingProjects } = useProjectsApi();
    const { experiences, loadingExperiences } = useExpriencesApi();
    const { certificates, loadingCertificates } = useCertificatesApi();

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

    const isLoading = loadingProfile.fetchProfile || loadingAcademics || loadingProjects || loadingExperiences || loadingCertificates;

    if (isLoading) {
        // Skeleton Loader UI
        return (
            <div className="d-flex flex-column">
                {/* Profile Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-body text-center">
                        <div className="rounded-circle bg-light placeholder mb-3"
                            style={{ width: "100px", height: "100px" }}>
                        </div>
                        <h4 className="fw-bold mb-2 placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h4>
                        <div className="d-flex justify-content-center gap-2 mb-3">
                            <span className="placeholder col-2 badge bg-light"></span>
                            <span className="placeholder col-2 badge bg-light"></span>
                        </div>
                        <p className="placeholder-glow">
                            <span className="placeholder col-10"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                    </div>
                </div>

                {/* Contact Info Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-header bg-light py-3">
                        <h4 className="fw-bold placeholder col-4"></h4>
                    </div>
                    <div className="card-body">
                        {[...Array(3)].map((_, i) => (
                            <p key={i} className="placeholder-glow mb-3">
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-4 ms-2"></span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Academics Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-header bg-light py-3">
                        <h4 className="fw-bold placeholder col-5"></h4>
                    </div>
                    <div className="card-body">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="mb-3">
                                <p className="placeholder-glow mb-2">
                                    <span className="placeholder col-6"></span>
                                </p>
                                <p className="placeholder-glow mb-1">
                                    <span className="placeholder col-8"></span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-header bg-light py-3">
                        <h4 className="fw-bold placeholder col-5"></h4>
                    </div>
                    <div className="card-body">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="mb-3">
                                <p className="placeholder-glow mb-2">
                                    <span className="placeholder col-7"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-4"></span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certificates Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-header bg-light py-3">
                        <h4 className="fw-bold placeholder col-5"></h4>
                    </div>
                    <div className="card-body">
                        {[...Array(2)].map((_, i) => (
                            <p key={i} className="placeholder-glow">
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-4 ms-2"></span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Projects Skeleton */}
                <div className="card shadow-sm border-0 rounded-0 mb-4">
                    <div className="card-header bg-light py-3">
                        <h4 className="fw-bold placeholder col-5"></h4>
                    </div>
                    <div className="card-body">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="mb-3">
                                <p className="placeholder-glow mb-2">
                                    <span className="placeholder col-6"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-8"></span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex flex-column'>

            <div className="card shadow-sm border-0 rounded-0">
                <div className="card-body text-center">

                    {/* Profile Image & Name */}
                    <img src={profile?.profileImage || "/assets/img/face.jpg"} height={100} width={100} className="img-lg rounded-circle mb-3 shadow-sm" alt="profile image" />
                    <h4 className="fw-bold mb-2">{profile?.fullName}</h4>

                    {/* Roles */}
                    <div className="mb-3">
                        {profile?.role?.split(",").map((role, index) => (
                            <span key={index} className="badge bg-light text-dark border me-2 mb-2 px-3 py-2 fs-10">{role.trim()}</span>
                        ))}
                    </div>

                    {/* Bio Section */}
                    <div className="alert alert-light border rounded-3 mt-2 text-start">
                        <p className="mb-0 text-muted" style={{ textAlign: "justify" }}>
                            {profile?.bio || "No bio added yet."}
                        </p>
                    </div>

                    {/* Social Links */}
                    {profile?.socialLinks?.length > 0 && (
                        <div className="d-flex flex-wrap justify-content-center mt-3">
                            {profile.socialLinks.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm me-2 mb-2 px-3">
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {profile?.skills?.length > 0 && (
                <div className="card mt-4 shadow-sm border-0 rounded-0">
                    <div className="card-header bg-light border-0 d-flex align-items-center py-3">
                        <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
                        <h4 className="fw-bold mb-0">Skills</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2">
                            {profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm"
                                    style={{ cursor: "pointer", transition: "all 0.3s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <i className="bi bi-check-circle-fill me-1"></i>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="card mt-4 shadow-sm border-0 rounded-0">
                {/* Card Header */}
                <div className="card-header bg-light d-flex justify-content-between align-items-center rounded-top-3 py-3">
                    <h4 className="card-title fw-bold mb-0">
                        <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                        Contact Info
                    </h4>
                    <Link to="/admin/basic-details" className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square me-1"></i> Update
                    </Link>
                </div>

                {/* Card Body */}
                <div className="card-body">
                    <table className="table align-middle table-borderless">
                        <tbody>
                            <tr>
                                <td className="fw-semibold text-secondary text-nowrap">
                                    <i className="bi bi-envelope me-2 text-primary"></i>Email
                                </td>
                                <td>
                                    <span className="badge bg-light text-dark fs-6 px-3 py-2 text-wrap" >
                                        {profile?.email || "Not Provided"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-semibold text-secondary text-nowrap">
                                    <i className="bi bi-telephone me-2 text-success"></i>Number
                                </td>
                                <td>
                                    <span className="badge bg-light text-dark fs-6 px-3 py-2 text-nowrap">
                                        {profile?.phone || "Not Provided"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-semibold text-secondary text-nowrap">
                                    <i className="bi bi-geo-alt me-2 text-danger"></i>Location
                                </td>
                                <td>
                                    <span className="badge bg-light text-dark fs-6 px-3 py-2 text-wrap" style={{ textAlign: "start" }}>
                                        {profile?.location || "Not Provided"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-semibold text-secondary text-nowrap">
                                    <i className="bi bi-file-earmark-text me-2 text-warning"></i>Resume
                                </td>
                                <td>
                                    {profile?.resume ? (
                                        <Link to={profile?.resume} target="_blank" rel="noreferrer" className="badge bg-primary bg-gradient text-light fs-6 px-3 py-2 text-nowrap">
                                            <i className="bi bi-box-arrow-up-right me-1"></i> View
                                        </Link>
                                    ) : (
                                        <span className="badge bg-secondary text-light fs-6 px-3 py-2 text-nowrap">Not Uploaded</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Academics Section */}
            {academics?.length > 0 && (
                <div className="card mt-4 shadow-sm border-0 rounded-0">
                    <div className="card-header bg-light border-0 rounded-top-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title fw-bold mb-0">
                                <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                                Academics
                            </h4>
                            <Link to={"/admin/academics"} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                                <i className="bi bi-pencil-square"></i> Update
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="blue bullet-line-list mt-3">
                            {academics.map((item) => (
                                <li key={item._id} className='mb-4'>
                                    <h6 className='fw-semibold fs-16'>{item.degree}</h6>
                                    <p className='fs-13 p-0 m-0'>{item.college}</p>
                                    <div className='d-flex justify-content-between align-items-center p-0 m-0'>
                                        <p className="fs-11 d-flex gap-2 align-items-center mb-0">
                                            <i className="bi bi-calendar" />{item.duration}
                                        </p>
                                        <span className="badge bg-success-subtle text-success fw-semibold px-3">{item.score}</span>
                                    </div>
                                    <p className='fs-13'>{item.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Experience Section */}
            {experiences?.length > 0 && (
                <div className="card mt-4 shadow-sm border-0 rounded-0">
                    <div className="card-header bg-light border-0 rounded-top-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title fw-bold mb-0">
                                <i className="bi bi-briefcase-fill text-warning me-2"></i>
                                Experience
                            </h4>
                            <Link to={"/admin/experience"} className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1">
                                <i className="bi bi-pencil-square"></i> Update
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="yellow bullet-line-list mt-3">
                            {experiences.map((item) => (
                                <li key={item._id} className='mb-4'>
                                    <h6 className='fw-semibold fs-16 mb-1'>{item.title}</h6>
                                    <div className='d-flex justify-content-between'>
                                        {item.company && <p className='fs-12 mb-0'>{item.company}</p>}
                                        {item.companyAddress && <p className='fs-12 mb-0'>{item.companyAddress}</p>}
                                    </div>
                                    <p className="fs-11 d-flex gap-2 align-items-center mb-0">
                                        <i className="bi bi-calendar" />{item.duration}
                                    </p>
                                    <p className="fs-12">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Certificates Section */}
            {certificates?.length > 0 && (
                <div className="card mt-4 shadow-sm border-0 rounded-0">
                    <div className="card-header bg-light border-0 rounded-top-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title fw-bold mb-0">
                                <i className="bi bi-award-fill text-success me-2"></i>
                                Certificates
                            </h4>
                            <Link to={"/admin/certificate"} className="btn btn-outline-success btn-sm d-flex align-items-center gap-1">
                                <i className="bi bi-pencil-square"></i> Update
                            </Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <ul className="timeline list-unstyled">
                            {certificates.map((item) => (
                                <li key={item._id} className="mb-4 position-relative ps-4 border-start border-2 border-success">
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Projects Section */}
            {projects?.length > 0 && (
                <div className="card mt-4 shadow-sm border-0 rounded-0">
                    <div className="card-header bg-light border-0 rounded-top-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title fw-bold mb-0">
                                <i className="bi bi-code-slash text-primary me-2"></i>
                                Projects
                            </h4>
                            <Link to={"/admin/projects"} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                                <i className="bi bi-pencil-square"></i> Update
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        {projects?.map((item) => (
                            <div key={item._id} className="pb-2 mb-3 border-bottom">
                                <h6 className="fw-semibold fs-6 mb-1">{item.title}</h6>
                                <p className="small text-muted mb-2">{item.description} </p>
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
                                        <a href={item.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark rounded px-2 fs-12"><i className="bi bi-github">&nbsp;</i> GitHub</a>
                                    )}
                                    {item.liveUrl && (
                                        <a href={item.liveUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark rounded px-2 fs-12"><i className="bi bi-box-arrow-up-right">&nbsp;</i> Live</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
