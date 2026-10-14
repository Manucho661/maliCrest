import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/auth/Login.css"; 
import "../../assets/css/Root.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your login endpoint
  };

  const handleGoogle = () => {
    // TODO: redirect to your Google OAuth endpoint
  };

  return (
    <div className="container-fluid login-page">
      <div className="row min-vh-100">
        {/* Left: form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="login-box w-100 px-4">
            <h2 className="brand mb-1">MaliCrest</h2>
            <p className="text-secondary mb-4">Sign in to manage your properties</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label small" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="small link-primary">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>

            <div className="divider my-4"><span>or</span></div>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 google-btn"
              onClick={handleGoogle}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" className="me-2">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/>
                <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/>
                <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center small mt-4 mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="link-primary fw-semibold">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Right: image with dark overlay */}
        <div className="col-md-6 d-none d-md-flex login-image align-items-end">
          <div className="login-caption text-white p-5">
            <h3 className="fw-bold">Manage smarter. Grow faster.</h3>
            <p className="mb-0">Everything for your properties, tenants and rent in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}