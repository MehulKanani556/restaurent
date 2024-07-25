import React, { useState,useEffect } from "react";
// import login from "../Image/login.jpg";
import login from "../Image/loginLarge1.jpeg";
import loginlarge from "../Image/login_n1.png";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Image/Group.png";


const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1441) {
        console.log("small");
        setImageSrc(login);
      } else if (window.innerWidth >= 1441) {
        console.log("large");
        setImageSrc(loginlarge);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "El correo es requerido";
    } else if (!emailRegex.test(email)) {
      errors.email = "El correo no es válido";
    }

    if (!password) {
      errors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password
      });
      console.log(response.data)
      if (response.data) {
        const { email, name, access_token , role,id } = response.data; // Adjust based on your API response structure

      // Store data in session storage
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userId' ,id )
        // Handle successful login (e.g., store token, redirect)
        navigate("/dashboard");
        setEmail('');
        setPassword('');
      } else {
        setErrors({ api: "Credenciales inválidas" });
      }
    } catch (error) {
      setErrors({ api: "Error al iniciar sesión. Intente nuevamente." });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handleLogin();
    }
  };
  return (
    <div>
      <div className="j-login-page">
        <div className="login-container">
          <div className="row j-row-width">
            <div className="col-6  login-img-col">
            <div className="login-img position-relative">
                <div  className="a_loginImg"><img src={imageSrc} alt="login"/></div>
                <img src={logo} alt="login"  className="logo_position"/>
              </div>
            </div>
            <div className="col-6 j-form-center">
              <div className="login-form">
                <form
                onSubmit={handleSubmit}
                >
                  <div className="j-form-head">
                    <h2 className="text-white">Bienvenido a Cypro</h2>
                    <p className="text-white">
                      Llena tus datos de cuenta para ingresar
                    </p>
                  </div>
                  <div className="j-form-body">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-white">
                        Correo
                      </label>
                      <div className="icon-input">
                        <IoMdMail className="i" />
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Escribir . . ."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label text-white"
                      >
                        Contraseña
                      </label>
                      <div className="icon-input">
                        <IoMdLock className="i" />
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          placeholder="Escribir . . ."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          className="border-0 bg-transparent"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)}
                        >
                          {showPassword ? (
                            <FaEye className="i" />
                          ) : (
                            <FaEyeSlash className="i" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                    
                      <button type="submit" className="j-login-btn text-white">
                        Ingresar
                      </button>
                    
                  </div>
                </form>

                <div className="j-login-last text-white text-center">
                  <a href="" className="me-2">
                    <span>Términos y Condiciones</span>{" "}
                  </a>
                  /
                  <a href="" className="ms-2">
                    <span>Políticas de privacidad</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
