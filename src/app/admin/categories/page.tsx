"use client";

import { ICategory } from "@/database/models/category.schema";
import Modal from "../components/modal/modal";
import { useState, useEffect } from "react";

async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:3000/api/category", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data || []);
    };
    getCategories();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(isModalOpen)

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
      {isModalOpen && <Modal onClose={closeModal} isOpen={isModalOpen} />}
        <div className="min-w-full inline-block align-middle">
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="flex justify-between">
              <input
                type="text"
                id="default-search"
                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search for company"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}>
                + Category
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">User ID</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Industry Type</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {categories.length > 0 ? (
                  categories.map((category: ICategory) => (
                    <tr key={category._id} className="bg-white hover:bg-gray-50">
                      <td className="p-5 text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="p-5 text-sm text-gray-900">{category.description}</td>
                      <td className="p-5 text-sm text-gray-900">Customer</td>
                      <td className="p-5 text-sm text-gray-900">Accessories</td>
                      <td className="p-5">
                        <button className="p-2 text-indigo-500 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-5 text-center text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
