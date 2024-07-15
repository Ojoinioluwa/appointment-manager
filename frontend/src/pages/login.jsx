import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import {error, success} from '../utils/toast'
import login from '../assets/login.jpg'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ----------------  STATES ------------------
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [loadingDiv, setLoadingDiv] = useState(false);

  // const [token, setToken] = useState('')
  const [eyesOpen, setEyesOpen] = useState(false);

  // --------------- FUNCTIONS -----------------

  // --- The Login function ---
  const Login = async () => {
    setLoadingDiv(true);

    try {
      const response = await axios.post("http://localhost:3000/v1/users/login",userInfo);
      
      success(response.data.message);

      // console.log({
      //   token:response.data.data.accessToken, 
      //   username: response.data.user.username,
      //   role: response.data.user.role
      // })

      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      sessionStorage.setItem('currentPage', 'Dashboard')

      setLoadingDiv(false);
      navigate("/");
      console.log('here')
      setUserInfo({
        username: "",
        password: "",
      });
    } 
    catch (err) {
      console.log(err)
      error(err)
      setLoadingDiv(false);
    }
  };

  // --- onchange function for filling the user info ---
  const fillingData = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  // --- function for toggling password visibility ---
  const toggleEye = () => {
    setEyesOpen(!eyesOpen);
  };

  return (
    <div className="auth-page flex-row-reverse">
      {
        loadingDiv &&
        <div className="loading-div">
          <AiOutlineLoading3Quarters className="loading-effect" />
        </div>
      }

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>

        <p className="hero-text">Login</p>

        <ul className="auth-ul">

          <li>
            <label className="label" htmlFor="username"> Username </label>

            <input
              name="username"
              className="input"
              type="text"
              id="username"
              value={userInfo.username}
              onChange={(e) => fillingData(e)}
              placeholder="e.g mubiloney"
              maxLength={25}
              autoComplete="true"
            />
            
          </li>

          <li>
            <label className="label" htmlFor="password">
              Password
            </label>

            <div className="auth-input-cont">
              {eyesOpen ? (
                <input
                  name="password"
                  className="input eyes"
                  type="text"
                  id="password"
                  value={userInfo.password}
                  onChange={(e) => fillingData(e)}
                  placeholder="your password"
                  autoComplete="true"
                />
              ) : (
                <input
                  name="password"
                  className="input eyes"
                  type="password"
                  id="password"
                  value={userInfo.password}
                  onChange={(e) => fillingData(e)}
                  placeholder="your password"
                  autoComplete="true"
                />
              )}

              {
                userInfo.password.length !== 0 && 
                (
                  <span className="switchEye" onClick={toggleEye}>
                    {eyesOpen ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )
              }

              {/* <span
                className="text-sm ml-2.5 cursor-pointer"
                onClick={() => navigate('/forget-password')}
              >
                Forgot password?
              </span> */}
            </div>
          </li>
        </ul>

        <div>
          <button
            className="auth-btn"
            onClick={() => Login()}
            disabled={
              userInfo.username.length === 0 || userInfo.password.length === 0
            }
          >
            Login
          </button>
        </div>

        <p className="auth-word-cont">
          You don&apos;t have an account yet? &nbsp;
          <span onClick={() => navigate('/signup')} className="auth-word">
            Sign up
          </span>
        </p>
      </form>

      <div className="auth-img-part">
          <img className="rounded-login" src={login} alt="login" />
          <p className="p">Welcome back!</p>
      </div>
    </div>
  );
}

export default Login;