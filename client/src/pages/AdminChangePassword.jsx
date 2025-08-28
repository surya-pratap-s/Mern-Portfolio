import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminChangePassword = () => {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    const result = await changePassword(formData.currentPassword, formData.newPassword);

    if (result.success) {
      toast.success('Password changed successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
      toast.error(result.message || "Invalid Password");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-end mb-4">
          <h3 className="mb-0"><b>Change Password</b></h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Current Password</label>
            <input className="form-control" placeholder="Password" type={showPassword ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">New Password</label>
            <input className="form-control" placeholder="Password" type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Confirm Password</label>
            <input className="form-control" placeholder="Password" type={showPassword ? "text" : "password"} name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
          </div>

          <div className="d-flex mt-1 justify-content-between">
            <div className="form-check">
              <input className="form-check-input input-primary" type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <label className="form-check-label text-muted" >Show Password</label>
            </div>
            <a href='/forget' className="text-secondary f-w-400 p-0 m-0">Forgot Password?</a>
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
