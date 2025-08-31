import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff, LockKeyhole, KeyRound, ShieldCheck } from "lucide-react"; // modern icons

const AdminChangePassword = () => {
  const { user, changePassword } = useAuth();
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
    <div className="card shadow-lg border-0 rounded-0 no">
      <div className="card-body p-4 no">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 d-flex align-items-center gap-2">
            <ShieldCheck className="text-primary" size={28} />
            <b>Change Password</b>
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input type="email" name="username" value={user?.email || ""} autoComplete="username" readOnly hidden />

          {/* Current Password */}
          <div className="form-group mb-3 position-relative">
            <label className="form-label">Current Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"> <KeyRound size={18} /> </span>
              <input className="form-control" placeholder="Enter current password" type={showPassword ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleChange} required autoComplete="current-password" />
            </div>
          </div>

          {/* New Password */}
          <div className="form-group mb-3 position-relative">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"> <LockKeyhole size={18} /> </span>
              <input className="form-control" placeholder="Enter new password" type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} required autoComplete="new-password" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><LockKeyhole size={18} /></span>
              <input className="form-control" placeholder="Re-enter new password" type={showPassword ? "text" : "password"} name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required autoComplete="new-password" />
            </div>
          </div>

          {/* Show / Forgot */}
          <div className="d-flex mt-1 justify-content-between align-items-center">
            <div className="form-check d-flex align-items-center gap-2">
              <input className="form-check-input" type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <label className="form-check-label text-muted">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} Show Password
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg rounded-3" disabled={loading}>
              {loading ? (<><span className="spinner-border spinner-border-sm me-2"></span> Changing...</>) : ("Change Password")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
