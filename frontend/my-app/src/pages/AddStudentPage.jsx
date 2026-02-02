import { useMutation } from "@tanstack/react-query";
import { addStudent } from "../api/studentApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "../utils/validationSchemas";

export default function AddStudentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(studentSchema),
  });

  const mutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      reset();
      toast.success("Student added successfully")
    },
    onError: () => {
      reset();
      toast.error("Error adding student")
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "photo") {
        formData.append("photo", data.photo[0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Add Student</h2>

      <div className="mb-4">
        <label>Name</label>
        <input {...register("name")} className="border px-3 py-2 w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label>Class</label>
        <input {...register("className")} className="border px-3 py-2 w-full" />
        {errors.className && <p className="text-red-500">{errors.className.message}</p>}
      </div>

      <div className="mb-4">
        <label>Email</label>
        <input type="email" {...register("email")} className="border px-3 py-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label>Gender</label>
        <input {...register("gender")} className="border px-3 py-2 w-full" />
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
      </div>

      <div className="mb-4">
        <label>Profile Photo</label>
        <input type="file" {...register("photo")} className="border px-3 py-2 w-full" />
        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
}
