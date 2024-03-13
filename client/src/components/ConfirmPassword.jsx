import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function ConfirmPassword({ newUser, setNewUser }) {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters long"),
    confirmPwd: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  //   function onSubmit(data) {
  //     //alert("SUCCESS!! :)\n\n");
  //     setNewUser({ ...newUser, password: data.password });
  //     return false;
  //   }

  return (
    <div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          // className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        {/* <div className="invalid-feedback">{errors.password?.message}</div> */}
        <div>{errors.password?.message}</div>
      </div>
      <div>
        <input
          name="confirmPwd"
          type="password"
          placeholder="Confirm password"
          {...register("confirmPwd")}
          // className={`form-control ${errors.confirmPwd ? "is-invalid" : ""}`}
        />
        {/* <div className="invalid-feedback">{errors.confirmPwd?.message}</div> */}
        <div>{errors.confirmPwd?.message}</div>
      </div>
      <button
        onClick={(e) => setNewUser({ ...newUser, password: e.target.value })}
      >
        Register
      </button>
    </div>
  );
}

/* FROM: https://jasonwatmore.com/post/2021/09/15/react-hook-form-password-and-confirm-password-match-validation-example */
