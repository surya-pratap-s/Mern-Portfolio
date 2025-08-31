import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

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
                <h3 className="mb-0"><b>Login</b></h3>
                {/* <a href="/register" className="link-primary">Don't have an account?</a> */}
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
                <div className="d-flex mt-1 justify-content-between">
                  <div className="form-check">
                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                    <label className="form-check-label text-muted" htmlFor="customCheckc1">Keep me sign in</label>
                  </div>
                  <a href='/forget' className="text-secondary f-w-400 p-0 m-0">Forgot Password?</a>
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>

              <div className="saprator mt-3">
                <span>Login with</span>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="d-grid">
                    <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                      <img src="/assets/img/google.svg" alt="img" /> <span className="d-none d-sm-inline-block"> Google</span>
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid">
                    <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                      <img src="/assets/img/twitter.svg" alt="img" /> <span className="d-none d-sm-inline-block"> Twitter</span>
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid">
                    <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                      <img src="/assets/img/facebook.svg" alt="img" /> <span className="d-none d-sm-inline-block"> Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
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

export default AdminLogin;
