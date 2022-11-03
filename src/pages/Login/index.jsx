import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import authAPI from "../../redux/api/authAPI";
import "./login.scss";

const LoginPage = () => {
  const { setAuth } = useAuth();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const queryClient = useQueryClient();

  const mutation = useMutation(authAPI.loginUser, {
    onSuccess: (data) => {
      const { id, firstName, role, accessToken } = data?.data;
      if (!data.error) {
        queryClient.setQueryData("loginDetails", () => data.data);
        setAuth({ id, firstName, role, accessToken });
        localStorage.setItem("user", JSON.stringify({ id, firstName }));
        window.location.replace("/blog");
      }
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
    },
  });
  const onSubmit = (data) => {
    const loginDetails = data;
    mutation.mutate({ loginDetails });
  };

  const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return (
    <div className="login-wrapper pt-5">
      <div className="col-sm-12 col-md-6 col-lg-4 container">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="form-title mb-5">Welcome</h3>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Email"
              {...register("email", {
                required: true,
                validate: (value) =>
                  emailTest.test(value) || "Invalid email format",
              })}
            />
            <label className="error-label">
              {errors.email?.type === "required" && "Email is required"}
            </label>
            <label className="error-label">{errors?.email?.message}</label>
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <label className="error-label">
              {errors?.password?.type === "required" && "Password is required"}
            </label>
            <label className="error-label">{errors?.password?.message}</label>
          </div>
          <button
            type="submit"
            disabled={!isDirty && !isValid}
            className="btn col-12 mt-2"
          >
            {mutation.isLoading ? "Please wait..." : "Login"}
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
