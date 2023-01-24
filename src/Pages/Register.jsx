import React, { useContext, useEffect, useState } from "react";


import { ImFacebook2 as FacebookIcon } from "react-icons/im";
import { AiFillEye as EyeIcon } from "react-icons/ai";
import { AiFillEyeInvisible as EyeInvisibleIcon } from "react-icons/ai";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";


import { isValidEmail } from "../App/utility";
import { AuthContext } from "../Context-authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../IIb/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { user, signUp } = useContext(AuthContext);

  if (user) navigate("/");

  const showError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) showError("Invalid email address");
    else if (password.length < 6)
      showError("Password must be at least 6 characters");
    if (isValidEmail(email) && password.length > 6) {
      setFormLoading(true);

      const userQuery = query(
        collection(firestore, "user"),
        where("username", "==", username)
      );

      const users = await getDocs(userQuery);
      if (!users.empty) {
        setErrorMsg("User with this username already exists");
        setFormLoading(false);
      }
      if (users.empty) {
        const user = await signUp(email, password, username, fullname);
        if (user) {
          setEmail("");
          setFullname("");
          setUsername("");
          setPassword("");
          setFormLoading(false);
        }

        if (!user)
          showError(
            "Sorry, your password was incorrect. Please double-check your password."
          );
      }
    }
  };

  useEffect(() => {
    setDisabled(email.length > 0 && password.length > 0 ? false : true);
  }, [email, password]);





  return (
    <>
      <div className="h-screen w-screen flex flex-wrap items-center justify-center p-5" >
        <div className="flex items-center">
          <div className="hidden md:block"style={{"border-radius":"60px"}}>


            <div className="flex flex-col items-center justify-center rounded w-full border-[5px] border-gray-300 bg-white p-1"style={{"border-radius":"50px","background":"url(./cosmos-input.png)"}}>
              <div className="w-full">
                <img  src="/images/logo-full.png"   className="h-15 mt-4 mx-auto my-3"    alt="instagram"  />
              </div>
              
              <p className="text-center font-bold  text-lg text-slate-900"style={{"color":"white", "fontFamily":"Import"}}>
                Sign up to see photos and videos from your friends.
              </p>
                
         
              <div className="my-5 bg-blue-400 p-3  rounded">
                <button className="text-white flex items-center justify-center w-full"   type="button" disabled        >
                  
                <FacebookIcon fill="#FFFF00	" />
                      <span className="text-xs font-semibold ml-1 "style={{"fontWeight":"bold", "color":"yellow"}}>
                          Log in with Facebook
                        </span>
                </button>
              </div>
              
              <div className="flex gap-3 items-center my-4 w-full">
                <div className="border-b-[2px] bg-transparent border-yellow-500 h-1 w-full"></div>
                <div className="uppercase text-yellow-500 font-semibold text-base">
                  OR
                </div>
                <div className="border-b-[2px] bg-transparent border-yellow-500 h-1 w-full"></div>
              </div>


              <div className="w-full px-5">
                <form className="" method="POST" onSubmit={(e) => submitForm(e)} >
                <div className="w-full">
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input  placeholder="Enter your Email"style={{"color":"white", "textAlign":"center","fontWeight":"bold","border-radius":"50px"}} type="text" className="text-xm p-3 border-[3px] rounded bg-yellow-400/20 w-full " onChange={(e) => setEmail(e.target.value)}value={email} />
                        </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full mb-3">
                      <input
                          placeholder="Full Name"style={{"color":"white", "textAlign":"center","fontWeight":"bold","border-radius":"50px"}} 
                          type="text"
                          className="text-xm p-3 border-[3px] rounded bg-yellow-400/20 w-full "
                          onChange={(e) => setFullname(e.target.value)}
                          value={fullname} />
                     </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full mb-3">
                      <input
                          placeholder="Username"style={{"color":"white", "textAlign":"center","fontWeight":"bold","border-radius":"50px"}}
                          type="text"
                          className="text-xm p-3 border-[3px] rounded bg-yellow-400/20 w-full "  onChange={(e) => setUsername(e.target.value)}
                          value={username}  />
                     </div>
                    </div>
                    <div className="">
                      <div className="relative">
                      <input
                          type={showPassword ? "password" : "text"}
                          className="text-xm p-3 border-[3px] rounded bg-yellow-400/20 w-full "  onChange={(e) => setUsername(e.target.value)}
                          placeholder="Password"style={{"color":"white", "textAlign":"center","fontWeight":"bold","border-radius":"50px"}}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password} />
                       {password.length > 0 && (
                          <div className="absolute top-15 right-1 h-full flex items-center">
                           <button className="cursor-pointer text-slate-900" type="button"   onClick={() => setShowPassword(!showPassword)}>         
                              {showPassword ? (
                                <EyeIcon />
                              ) : (
                                <EyeInvisibleIcon />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-5">
                      <button  className="w-full bg-blue-500 text-xs text-white font-semibold p-5 rounded-sm"style={{"color":"yellow","font-size":"20px","border":"3px solid blue","border-radius":"50px"}}
                    disabled={disabled}     type="submit"       >
                        {formLoading ? (
                          <SpinnerIcon className="w-5 h-5 animate-spin my-5 mx-auto" />
                        ) : (
                          "Sign up"
                        )}
                      </button>
                    </div>
                  </div>

                 
                  {errorMsg?.length > 0 && (
                       <div className="text-center text-xs my-5 text-red-700">
                       {errorMsg}
                    </div>
                  )}

                          {/* Footer start */}

                         <div className="text-center w-full text-xs font-thin mb-5">
                    <a href="/accounts/password/reset/"style={{"color":"yellow","fontFamily":"import"}}>Forgot password?</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded w-full border-[5px] border-gray-300 mt-4 bg-white p-6"style={{"border-radius":"50px","background":"url(./cosmos-input.png)"}}>
            <div className="text-sm" style={{"color":"yellow","fontFamily":"import" }}>
                Have an account?{" "}
                <Link to="/login" className="text-blue-500 font-semibold"style={{"fontSize":"20px"}}>
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer  finishend/> */}
    </>
  );
};

export default Register;
