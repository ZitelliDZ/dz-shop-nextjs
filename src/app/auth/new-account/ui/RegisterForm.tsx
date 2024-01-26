"use client";
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const { name, email, password } = data;
    const res = await registerUser(name, email, password);

    if (!res.ok) {
      setErrorMessage(res.message);
      return;
    }

    const resp = await login(email.toLowerCase(), password);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Nombre completo</label>
      {errors.name?.type === "required" && (
        <span className="text-red-500">* El nombre es requerido.</span>
      )}
      <input
        autoFocus
        id="name"
        {...register("name", { required: true })}
        className={clsx("px-5 py-2 border bg-gray-300 rounded mb-5", {
          "border-red-500": errors.name?.type === "required",
        })}
        type="text"
      />

      <label htmlFor="email">Correo electrónico</label>
      {errors.email?.type === "required" && (
        <span className="text-red-500">* El correo es requerido.</span>
      )}
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        className={clsx("px-5 py-2 border bg-gray-300 rounded mb-5", {
          "border-red-500":
            errors.email?.type === "required" ||
            errors.email?.type === "pattern",
        })}
        type="email"
      />

      <label htmlFor="email">Contraseña</label>
      {errors.password?.type === "required" && (
        <span className="text-red-500">* La contraseña es requerida.</span>
      )}
      <input
        {...register("password", { required: true })}
        className={clsx("px-5 py-2 border bg-gray-300 rounded mb-5", {
          "border-red-500": errors.password?.type === "required",
        })}
        type="password"
      />

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Regresar al login
      </Link>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </form>
  );
};

export default RegisterForm;
