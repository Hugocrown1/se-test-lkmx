"use client";

import useForm from "@/hooks/useForm";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
};

const UsersTable = () => {
  // Lógica del formulario
  const { formState, onInputChange, onResetForm } = useForm(initialState);

  // Lógica de usuarios
  const { usersList, isLoading, addUser } = useUsers();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    onResetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación del formulario
    // Tambien se podria hacer una validación más completa  pasandole funciones de validacion a useForm
    if (!formState.name.trim() || !formState.email.trim()) {
      console.error("Name and email are required");
      return;
    }

    const success = await addUser(formState);
    if (success) {
      handleCloseModal();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <button
        onClick={() => setIsOpenModal(!isOpenModal)}
        className=" bg-green-700 mb-2 text-white "
      >
        Agregar Usuario
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className=" bg-gray-200 text-black font-medium uppercase text-sm leading-normal">
            <th className=" py-3 px-6 text-left">ID</th>
            <th className=" py-3 px-6 text-left">Nombre</th>
            <th className=" py-3 px-6 text-left">Email</th>
          </tr>
        </thead>
        <tbody className=" text-black  text-sm">
          {usersList.map((user) => (
            <tr
              key={user.id}
              className=" border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <td className=" py-3 px-6">{user.id}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className=" py-3 px-6">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`fixed inset-0 z-20 h-screen bg-black/30 transition-all ${
          isOpenModal ? "block" : "hidden"
        }`}
      >
        <div className=" bg-white max-w-[500px] max-h-[250px] m-auto fixed inset-0 rounded-lg p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg font-bold">Agregar Usuario</h2>
            <button
              onClick={handleCloseModal}
              className=" font-bold hover:bg-gray-300 transition-colors p-1 rounded-full"
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} action="submit">
            <div className="flex flex-col w-full gap-y-2 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formState.name}
                onChange={onInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={onInputChange}
              />
              <button type="submit" className="bg-blue-500 text-white  w-full">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
