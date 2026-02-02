import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/validationSchemas";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("role", data?.user?.role);

      dispatch(setAuth({ user: data?.user, token: data?.token }));
      reset();
      toast.success("Login successful")
      navigate('/dashboard')
    },
    onError: (error) => {
      reset()
      const message = error.response?.data?.error || "Login failed"; toast.error(message);
    },
  });

  const onSubmit = (data) => mutation.mutate(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 rounded w-full mb-2"
      />
      <p className="text-red-500">{errors.email?.message}</p>

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 rounded w-full mb-2"
      />
      <p className="text-red-500">{errors.password?.message}</p>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>

  );
}
