import React, { useState } from "react";
import login from "../Image/login.png";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  // const validate = () => {
  //   const errors = {};
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!email) {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(email)) {
  //     errors.email = "Email is invalid";
  //   }

  //   if (!password) {
  //     errors.password = "Password is required";
  //   } else if (password.length < 6) {
  //     errors.password = "Password must be at least 6 characters";
  //   }

  //   return errors;
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const validationErrors = validate();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log("Form submitted", { email, password });
  //   }
  // };
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
      alert("login")
      if (response.data) {
        // Handle successful login (e.g., store token, redirect)
        // navigate("/dashboard");
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
      alert("Login btn")
    }
  };
  return (
    <div>
      <div className="j-login-page">
        <div className="login-container">
          <div className="row j-row-width">
            <div className="col-6  login-img-col">
              <div className="login-img">
                <img src={login} alt="login" />
              </div>
            </div>
            <div className="col-6 j-form-center">
              <div className="login-form">
                <form
                // onSubmit={handleSubmit}
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
