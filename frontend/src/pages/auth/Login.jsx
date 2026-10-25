import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../assets/css/auth/Login.css";
import "../../assets/css/Root.css";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  // State for form inputs
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null); // Reset login error before making the request
    try {
      const response = await api.post("/login", formData);
      toast.success("Login successful!");
      console.log("Login successful:", response.data);
      navigate("/admin"); // Redirect to the admin dashboard after successful login
    } catch (error) {

      if (!error.response) {
        toast.error(
          "Unable to connect. Check your connection and try again."
        );
      } else if (error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
        setLoginError("Invalid email or password. Please try again.");
      } else if (error.response.status === 422) {
        toast.error("Please check the information you entered.");
        setLoginError("Please check the information you entered.");
      } else if (error.response.status === 404) {
        toast.error("The requested resource was not found.");
        setLoginError("The requested resource was not found.");
      } else if (error.response.status >= 500) {
        toast.error("Something went wrong on our server. Please try again.");
        setLoginError("Something went wrong on our server. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
        setLoginError("Login failed. Please try again.");
      }
    }

    finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // TODO: redirect to your Google OAuth endpoint
  };

  return (



    
      <div>
        {/* Left: form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>

            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                required
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>

            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label small" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Link to="/reset-password" className="small link-primary">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {loginError && (
            <p className="alert alert-danger py-2 px-3 mt-2 small rounded-3 mb-3" role="alert">
              {loginError}
            </p>
          )}

        </form>

        <div className="divider my-4"><span>or</span></div>
        <button
          type="button"
          className="btn btn-outline-secondary w-100 google-btn"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" className="me-2">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center small mt-4 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="link-primary fw-semibold">Sign up</Link>
        </p>
      </div>

      




  );
}