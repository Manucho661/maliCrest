
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/api";
const ResetPassword = () => {
    // navigate hook for redirecting after successful password reset
    const navigate = useNavigate();
    // state variables
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [resetError, setResetError] = useState(null);

    // password requirements
    const passwordRequirements = [
        {
            label: "At least 8 characters",
            test: (password) => password.length >= 8,
        },
        {
            label: "At least one uppercase letter",
            test: (password) => /[A-Z]/.test(password),
        },
        {
            label: "At least one lowercase letter",
            test: (password) => /[a-z]/.test(password),
        },
        {
            label: "At least one number",
            test: (password) => /[0-9]/.test(password),
        },
        {
            label: "At least one special character",
            test: (password) => /[^A-Za-z0-9]/.test(password),
        },
    ];

    const isPasswordValid = passwordRequirements.every((requirement) =>
        requirement.test(formData.password)
    );
    // passward match
    const passwordsMatch =
        formData.password === formData.password_confirmation &&
        formData.password_confirmation.length > 0;

    // function to handle input changes
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
        setResetError(null); // Reset reset error before making the request
        try {
            const response = await api.post("/reset-password", formData);
            toast.success("Password reset successful!");
            console.log("Password reset successful:", response.data);
            navigate("/login"); // Redirect to the login page after reset
        } catch (error) {

            if (!error.response) {
                toast.error(
                    "Unable to connect. Check your connection and try again."
                );
            } else if (error.response.status === 401) {
                toast.error("Invalid email or password. Please try again.");
                setResetError("Invalid email or password. Please try again.");
            } else if (error.response.status === 422) {
                toast.error("Please check the information you entered.");
                setResetError("Please check the information you entered.");
            } else if (error.response.status === 404) {
                toast.error("The requested resource was not found.");
                setResetError("The requested resource was not found.");
            } else if (error.response.status >= 500) {
                toast.error("Something went wrong on our server. Please try again.");
                setResetError("Something went wrong on our server. Please try again.");
            } else {
                toast.error("Password reset failed. Please try again.");
                setResetError("Password reset failed. Please try again.");
            }
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <div >
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-secondary fw-semibold">  Email</label>
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
                    <label htmlFor="password" className="form-label text-secondary fw-semibold">Password</label>

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
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label text-secondary fw-semibold">Confirm Password</label>

                    <div className="input-group">
                        <input
                            id="password_confirmation"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            name="password_confirmation"
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



                <div className="mb-3">
                    <p className="small fw-semibold mb-2">
                        Password must contain:
                    </p>

                    <ul className="list-unstyled small mb-0">
                        {passwordRequirements.map((requirement, index) => {
                            const fulfilled = requirement.test(formData.password);

                            return (
                                <li
                                    key={index}
                                    className={`d-flex align-items-center gap-2 mb-1 ${fulfilled ? "text-success" : "text-secondary"
                                        }`}
                                >
                                    <i
                                        className={`bi ${fulfilled ? "bi-check-circle-fill" : "bi-circle"
                                            }`}
                                    ></i>

                                    {requirement.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>



                {formData.password_confirmation.length > 0 && (
                    <div className={`alert py-2 px-3 mt-2 small rounded-3 mb-3 ${passwordsMatch ? "alert-success" : "alert-danger"}`}>
                        {passwordsMatch
                            ? "Passwords match"
                            : "Passwords do not match"}
                    </div>
                )}


                < div className="d-flex justify-content-between align-items-center mb-3">
                    <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
                        <i className="bi bi-arrow-left"></i>   Back
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={!passwordsMatch || loading || !isPasswordValid || !formData.email || !formData.password || !formData.password_confirmation}>
                        <i className="bi bi-arrow-right"></i>   Reset Password
                    </button>
                </div>

                {resetError && (
                    <p className="alert alert-danger py-2 px-3 mt-2 small rounded-3 mb-3" role="alert">
                        {resetError}
                    </p>
                )}
            </form>


        </div>
    );
}

export default ResetPassword;