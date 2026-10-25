import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../assets/css/auth/LoginLayout.css";
import logo from "../../assets/logo/logo.svg";
import { Outlet } from "react-router-dom";
const LoginLayout = () => {
    return (
        <div className="container-fluid loginLayout-page">

            <div className="row min-vh-100">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white">
                    <div className="login-box w-100 px-4">
                        <div className="mb-3 d-flex justify-content-center">
                            <img src={logo} alt="MaliCrest" height={60} width={60} />
                        </div>
                        <Outlet />
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

export default LoginLayout