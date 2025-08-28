import React from 'react'

export default function AdminHome() {
    return (<>
        <div className="row align-items-stretch">
            <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                    <div className="card-body text-center">
                        <div>
                            <img src="/assets/img/face.jpg" height={100} width={100} className="img-lg rounded-circle mb-2" alt="profile image" />
                            <h4 className='fw-bold'>Maria Johnson</h4>
                            <p className="text-muted mb-0">Developer</p>
                        </div>
                        <p className="mt-2 card-text">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem
                        </p>

                        <div className="row g-3 mt-2 justify-content-center">
                            <div className="col-auto">
                                <button className="btn btn-blue btn-sm">Follow</button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-blue btn-sm">Following</button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-blue btn-sm">Unfollow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6 d-flex mt-3 mt-md-0">
                <div className="card flex-fill">
                    <div className="card-header">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className="card-title fw-bold">Contact Info</h4>
                            <button className="btn btn-blue btn-sm">Edit</button>
                        </div>
                    </div>
                    <div className="card-body table-border-style">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><span className='btn'>Email</span></td>
                                        <td><span className='btn btn-dark btn-sm'>surya@gmail.com</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='btn'>Number</span></td>
                                        <td><span className='btn btn-dark btn-sm'>+91 9651100914</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='btn'>Location</span></td>
                                        <td><span className='btn btn-dark btn-sm'>Barhaj, Deoria UP 274601</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='btn'>Resume</span></td>
                                        <td><span className='btn btn-dark btn-sm'>View</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='card mt-3'>
            <div className='card-header'>
                <h4 className='fw-bold'>Skills</h4>
            </div>
            <div className='row g-3 card-body'>
                <div className="col-auto">
                    <button className="btn btn-blue btn-sm">Follow</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-blue btn-sm">Following</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-blue btn-sm">Unfollow</button>
                </div>
            </div>
        </div>

        <div className="row align-items-stretch mt-3">
            <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                    <div className="card-header">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className="card-title fw-bold">Academics</h4>
                            <button className="btn btn-blue btn-sm">Edit</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="bullet-line-list mt-3">
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15'>B.Tech (Computer Science And Engineering)</h6>
                                <p className='fs-12'>KIPM College Of Engineering And Technology</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                        <i className="bi bi-calendar" />2021-2024
                                    </p>
                                    <p className="fs-10 fw-semibold">76%</p>
                                </div>
                                <p className='fs-11'>Gida Gorakhpur </p>
                            </li>
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15'>B.Tech (Computer Science And Engineering)</h6>
                                <p className='fs-12'>KIPM College Of Engineering And Technology</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                        <i className="bi bi-calendar" />2021-2024
                                    </p>
                                    <p className="fs-10 fw-semibold">76%</p>
                                </div>
                                <p className='fs-11'>Gida Gorakhpur </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6 d-flex mt-3 mt-md-0">
                <div className="card flex-fill">
                    <div className="card-header">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className="card-title fw-bold">Experience</h4>
                            <button className="btn btn-blue btn-sm">Edit</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="bullet-line-list mt-3">
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <div className='d-flex justify-content-between'>
                                    <p className='fs-10'>Orlank Private Limited</p>
                                    <p className='fs-10'>Noida sector 63 B-41</p>
                                </div>
                                <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                    <i className="bi bi-calendar" />2021-2024
                                </p>
                                <p className="fs-10 fw-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero id quas praesentium, dolor numquam laborum accusantium mollitia pariatur esse nisi repellendus consectetur tenetur similique, reprehenderit dicta rerum sit veritatis consequatur!</p>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <div className='d-flex justify-content-between'>
                                    <p className='fs-10'>Orlank Private Limited</p>
                                    <p className='fs-10'>Noida sector 63 B-41</p>
                                </div>
                                <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                    <i className="bi bi-calendar" />2021-2024
                                </p>
                                <p className="fs-10 fw-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero id quas praesentium, dolor numquam laborum accusantium mollitia pariatur esse nisi repellendus consectetur tenetur similique, reprehenderit dicta rerum sit veritatis consequatur!</p>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="row align-items-stretch mt-3">
            <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                    <div className="card-header">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className="card-title fw-bold">Certificate</h4>
                            <button className="btn btn-blue btn-sm">Edit</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="mt-3">
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <div className='d-flex justify-content-between'>
                                    <p className='fs-10 mb-0'>Orlank Private Limited</p>
                                    <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                        <i className="bi bi-calendar" />2021-2024
                                    </p>
                                </div>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <div className='d-flex justify-content-between'>
                                    <p className='fs-10 mb-0'>Orlank Private Limited</p>
                                    <p className="fs-10 d-flex gap-2 align-items-center mb-0">
                                        <i className="bi bi-calendar" />2021-2024
                                    </p>
                                </div>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6 d-flex mt-3 mt-md-0">
                <div className="card flex-fill">
                    <div className="card-header">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className="card-title fw-bold">Projects</h4>
                            <button className="btn btn-blue btn-sm">Edit</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="mt-3">
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <p className="fs-10 fw-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero id quas praesentium, dolor numquam laborum accusantium mollitia pariatur esse nisi repellendus consectetur tenetur similique, reprehenderit dicta rerum sit veritatis consequatur!</p>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <button className="btn btn-blue btn-sm fs-13">GitHub</button>
                                    <button className="btn btn-blue btn-sm fs-13">Live</button>
                                </div>
                            </li>
                            <li className='mb-4'>
                                <h6 className='fw-semibold fs-15 mb-0'>Frontent Developer (Intern)</h6>
                                <p className="fs-10 fw-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero id quas praesentium, dolor numquam laborum accusantium mollitia pariatur esse nisi repellendus consectetur tenetur similique, reprehenderit dicta rerum sit veritatis consequatur!</p>
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-dark btn-sm fs-10">Follow</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <button className="btn btn-blue btn-sm fs-13">GitHub</button>
                                    <button className="btn btn-blue btn-sm fs-13">Live</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
