import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStudentById, updateStudent } from "../api/studentApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  className: yup
    .string()
    .matches(/^[0-9]+[A-Z]$/, "Class name must be like 10A, 9B")
    .required("Class is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required("Gender is required"),
});

export default function EditStudentPage() {
  const { id } = useParams();
  const { data: student, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
  });

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (student) {
      reset(student);
    }
  }, [student, reset]);

  const mutation = useMutation({
    mutationFn: (data) => updateStudent(id, data),
    onSuccess: () => toast.success("Student updated successfully"),
    onError: () => toast.error("Error updating student"),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;

  const currentValues = watch();
  const isChanged = student && Object.keys(student).some(
    (key) => currentValues[key] !== student[key]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Student</h2>

      <div>
        <label className="block font-medium">Name</label>
        <input {...register("name")} className="w-full border rounded px-3 py-2" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Class</label>
        <input {...register("className")} className="w-full border rounded px-3 py-2" />
        {errors.className && <p className="text-red-500 text-sm">{errors.className.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input type="email" {...register("email")} className="w-full border rounded px-3 py-2" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Gender</label>
        <input {...register("gender")} className="w-full border rounded px-3 py-2" />
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isChanged}
        className={`px-4 py-2 rounded ${isChanged ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
      >
        Update
      </button>
    </form>
  );
}
