import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await register(formData.email, formData.password);

        if (result.success) {
            toast.success('Login successful 🎉');
            navigate('/admin/dashboard');
        } else {
            toast.error(result.message || 'Invalid email or password');
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-main">
            <div className="auth-wrapper v3">
                <div className="auth-form">
                    <div className="auth-header">
                        <Link><img width={36} height={36} src="/assets/img/admin-icon.png" alt="img" /></Link>
                    </div>
                    <div className="card my-5">
                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <h3 className="mb-0"><b>Register</b></h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-control" placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input className="form-control" placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="auth-footer row">
                        <div className="col my-1 text-white">
                            <p className="m-0">Copyright © <a href="#" className='text-white' >Surya</a></p>
                        </div>
                        <div className="col-auto my-1">
                            <ul className="list-inline footer-link mb-0">
                                <li className="list-inline-item fw-bold"><a href="/">Home</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminRegister;
