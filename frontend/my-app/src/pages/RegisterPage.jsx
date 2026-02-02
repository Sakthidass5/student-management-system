import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { registerSchema } from "../utils/validationSchemas";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(registerSchema) });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      reset()
      toast.success("Registered successfully")
      navigate("/login")
    },
    onError: (error) => {
      reset()
      const message = error.response?.data?.error || "Registration failed"; toast.error(message);
    }
  });


  const onSubmit = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <input {...register("name")} placeholder="Name" className="border p-2 rounded w-full" />
      <p className="text-red-500">{errors.name?.message}</p>

      <input {...register("email")} placeholder="Email" className="border p-2 rounded w-full" />
      <p className="text-red-500">{errors.email?.message}</p>

      <input type="password" {...register("password")} placeholder="Password" className="border p-2 rounded w-full" />
      <p className="text-red-500">{errors.password?.message}</p>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>

  );
}
