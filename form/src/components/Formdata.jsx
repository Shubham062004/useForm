import { useState } from "react";
import {useForm} from 'react-hook-form';
import "./Form.css";

function Form() {
  const initialValues = { username: "", email: "", number:"", password: "", repeatPass:"" };

  const {register, handleSubmit} = useForm()
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = () => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/i;
    const regexNum = /(\d{3})[ -]?(\d{3})[ -]?(\d{4})/i;


    if (!values.username) {
      errors.username = "Username is required!";
    }
    else if (values.username.length < 3) {
      errors.username = "Name must be more than 3 characters";
    } else if (values.username.length > 30) {
      errors.username = "Name cannot exceed more than 30 characters";
    }
  


    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if(!values.number){
      errors.number = "Number can't be empty!"
    }
    else if(!regexNum.test(values.number)){
      errors.number = "Invalid Number!";
    }

    
    if (!values.password) {
      errors.password = "Password is required!";
    } 
    else if(!regexPass.test(values.password)){
      errors.password = "Password should be 10 digit long, should include ateast one uppercase, one lowercase, one number and one special character!"
    }

    if(!values.repeatPass){
      errors.repeatPass = "Confirm Your Password!"
    }
    else if(values.repeatPass !==values.password){
      errors.repeatPass = "Password Doesn't match!"
    }

    return errors;
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h1 className="message">Signed in successfully</h1>
      ) : (
        <h1 className="message">Fill up your credentials!</h1>
      )}
        <div className="form">

          <div className="field">
            
            <input
              type="text"
              {...register("username")}
              placeholder="Your Name"
              value={formValues.username}
              onChange={handleChange}/>

          </div>
          <p>{formErrors.username}</p>


          <div className="field">
            
            <input
              type="text"
              {...register("email")}
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}/>

          </div>
          <p>{formErrors.email}</p>


          <div className="field">
           
            <input
              type="text"
              {...register("number")}
              placeholder="PhoneNumber"
              value={formValues.number}
              onChange={handleChange}/>

          </div>
          <p>{formErrors.number}</p>


          <div className="field">
            
            <input
            className="pass-input"
              type={passwordShown ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}/>
              <h2 id="pass" onClick={()=>setPasswordShown(!passwordShown)}>👁</h2>
          </div>
          <p>{formErrors.password}</p>


          <div className="field">
            
            <input
              type={repeatPasswordShown ? "text" : "password"}
             {...register("repeatPass")}
              placeholder="Confirm your Password"
              value={formValues.repeatPass}
              onChange={handleChange}/>
              <h2 id="pass" onClick={()=>setRepeatPasswordShown(!repeatPasswordShown)}>👁</h2>
              

          </div>
          <p>{formErrors.repeatPass}</p>

          <button className="button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Form;