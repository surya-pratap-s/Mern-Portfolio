import React from 'react'
import { useAcademicsApi, useExpriencesApi, useProfileApi, useProjectsApi, useCertificatesApi } from '../api/useApi';

const File_Url = import.meta.env.VITE_FILE_BASE_URL;

export default function Home() {
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
      <div id="loader">
        <div className="pulse-logo">
          <i className="bi bi-lightning-charge-fill"></i>
        </div>
      </div>
    );
  }

  return (
    <main className='w-100 p-0 m-auto'>
      <main className="mx-auto portfolio-main">
        {/* <!-- Animated particles background --> */}
        <div className="particles" id="particles"></div>

        {/* <!-- Navigation --> */}
        <nav className="navbar navbar-expand-lg fixed-top glass-card" style={{ "backdropFilter": "blur(20px)", "borderRadius": "0", zIndex: 2 }}>
          <div className="container">
            <a className="navbar-brand fw-bold text-white" href="#home">
              <i className="bi bi-lightning-charge-fill text-warning me-2"></i>Portfolio
            </a>
            <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"> <a className="nav-link text-white mx-2" href="#home">Home</a> </li>
                <li className="nav-item"> <a className="nav-link text-white mx-2" href="#about">About</a> </li>
                <li className="nav-item"> <a className="nav-link text-white mx-2" href="#experience">Experience</a> </li>
                <li className="nav-item"> <a className="nav-link text-white mx-2" href="#projects">Projects</a> </li>
                <li className="nav-item"> <a className="nav-link text-white mx-2" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <!-- Hero Section --> */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center flex-column-reverse flex-lg-row mt-5 mt-lg-0">
              <div className="col-lg-6 text-center text-lg-start fade-in mt-2 mt-lg-0">
                <h1 className="hero-title mb-4">{profile?.fullName || "Surya Pratap"}</h1>
                <div className="mb-4">
                  {profile?.role?.split(",").map((role, index) => (
                    <span key={index} className="role-badge">{role.trim()}</span>
                  ))}
                </div>

                <div className="mx-auto">
                  <div className="glass-card p-4 mb-4">
                    <p className="lead text-center"> {profile?.bio || "A passionate developer with 5+ years of experience in creating robust web applications and intuitive user interfaces. I specialize in modern JavaScript frameworks and have a keen eye for design and user experience."}</p>
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                  <button onClick={() => handleDownload(`${profile.resume}`, `${profile?.fullName || "resume"}.pdf`)} className="btn btn-neon">
                    <i className="bi bi-eye-fill me-2">
                    </i>View Resume
                  </button>
                </div>
              </div>
              <div className="col-lg-6 text-center fade-in">
                <img src={profile?.profileImage || "/assets/img/face.jpg"} alt="Profile" className="profile-image" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About Section --> */}


        <section id="about" className="py-5">
          <div className="container">
            <h2 className="section-header">About Me</h2>
            {/* <!-- Skills Section --> */}
            {profile?.skills?.length > 0 && (
              <div className="glass-card p-4">
                <h4 className="fw-bold mb-4 text-center">
                  <i className="bi bi-lightning-charge-fill text-warning me-2">
                  </i>Technical Skills
                </h4>
                <div className="text-center">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>


        {/* <!-- Experience Section --> */}
        <section id="experience" className="py-5">
          <div className="container">
            <h2 className="section-header">Experience & Education</h2>
            {/* <!-- Experience Timeline --> */}
            {experiences?.length > 0 && (
              <div className="glass-card p-4 mb-5">
                <h4 className="fw-medium mb-4 fs-6">
                  <i className="bi bi-briefcase-fill text-warning me-2"></i>Professional Experience
                </h4>

                <div className="timeline">
                  {experiences.map((item) => (
                    <div key={item._id} className="timeline-item">
                      <h5 className="fw-medium fs-14 text-warning">{item.title}</h5>
                      <div className='d-flex justify-content-between mb-2 gap-2 flex-column flex-md-row '>
                        {item.company && <p className='text-light fw-light m-0'>{item.company}</p>}
                        {item.companyAddress && <p className='text-light fw-light m-0'>{item.companyAddress}</p>}
                      </div>
                      <p className="small text-secondary mb-2">
                        <i className="bi bi-calendar me-2"></i>{item.duration}
                      </p>
                      <p className="text-light fs-10">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* <!-- Education --> */}
            {academics?.length > 0 && (
              <div className="glass-card p-4">
                <h4 className="fw-bold mb-4">
                  <i className="bi bi-mortarboard-fill text-primary me-2">
                  </i>Education
                </h4>
                <div className="timeline">
                  {academics.map((item) => (
                    <div key={item._id} className="timeline-item">
                      <h5 className="fw-bold text-primary">{item.degree}</h5>
                      <p className="text-light d-flex justify-content-between mb-2 gap-2 flex-column flex-md-row ">
                        <span className=''>{item.college}</span>
                        <span className='fs-12'><i className='bi bi-geo-alt me-1'></i>{`( ${item.location} )`}</span>
                      </p>
                      <p className="small text-secondary mb-2 d-flex justify-content-between">
                        <span><i className="bi bi-calendar me-2"></i>{item.duration}</span>
                        <span className="badge bg-success px-3 py-1">{item.score}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>


        {/* <!-- Projects Section --> */}
        {projects?.length > 0 && (
          <section id="projects" className="py-5">
            <div className="container">
              <h2 className="section-header">Featured Projects</h2>
              <div className="row">
                {projects?.map((item) => (
                  <div key={item._id} className="col-lg-6 mb-4">
                    <div className="project-card h-100">
                      <h5 className="fw-bold mb-3 text-warning">{item.title}</h5>
                      <p className="text-light mb-3">{item.description}</p>
                      {item.technologies?.length > 0 &&
                        <div className="mb-3">
                          {item.technologies.map((tech, idx) => (<span key={idx} className="tech-badge">{tech}</span>))}
                        </div>
                      }
                      <div className="d-flex gap-2">
                        <a href={item.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-neon">
                          <i className="bi bi-github me-1"></i>GitHub
                        </a>
                        <a href={item.liveUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-neon">
                          <i className="bi bi-box-arrow-up-right me-1"></i>Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* <!-- Certificates Section --> */}
        {certificates?.length > 0 && (
          <section id="certificates" className="py-5">
            <div className="container">
              <h2 className="section-header">Certifications</h2>
              <div className="row">
                {certificates.map((item) => (
                  <div key={item._id} className="col-lg-6 mb-4">
                    <div className="project-card h-100">
                      <h5 className="fw-bold mb-3 text-warning">{item.courseName}</h5>
                      <p className="text-light mb-3">{item.company}</p>
                      <div className="d-flex gap-2">
                        <a href={item.certificateLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-neon">
                          <i className="bi bi-eye me-1"></i>View
                        </a>
                        <button onClick={() => handleDownload(item.certificateLink, `${item.courseName}.pdf`)} className="btn btn-sm btn-neon">
                          <i className="bi bi-download me-1"></i>Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </section>
        )}

        {/* Footer Section */}
        <section id='footer' className="footer-section mt-5">
          <div className="container text-center py-5">
            {/* Social Icons */}
            {profile?.socialLinks?.length > 0 && (
              <div className="mb-4">
                {profile.socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" className="footer-icon"><i className={`bi bi-${link.title.toLowerCase()}`} /></a>
                ))}
              </div>
            )}
            {/* Quick Links */}
            <div className="mb-3">
              <a href="#" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#certificates" className="footer-link">Certificates</a>
              <a href="#footer" className="footer-link">Contact</a>
            </div>
            {/* Footer Bottom */}
            <p className="mb-0 small text-white-50">
              © 2025 <span className="text-neon">{profile?.fullName}</span>. All Rights Reserved.
            </p>
          </div>
        </section>

      </main>
    </main>
  )
}
