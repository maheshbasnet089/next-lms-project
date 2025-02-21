"use client"
import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteCategory, fetchCategories } from "@/store/categorySlice";
import Modal from "../components/modal/modal";

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useAppSelector((store) => store.categories);
  const dispatch = useAppDispatch();
  const isFirstRender = useRef(true);
  const [searchTerm,setSearchTerm] = useState<string>("")

  useEffect(() => {
    // Prevent running the effect twice in Strict Mode (for dev mode)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const openModal = useCallback(() => { setIsModalOpen(true)},[]);
  const closeModal = useCallback(() => { setIsModalOpen(false)},[]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");


  const handleDelete = async (id: string) => {
    console.log("Recreated again function")
    if (id) {
      await dispatch(deleteCategory(id));
    }
  };
//  console.log("Re rendered")
//   useEffect(()=>{
//     const handler = setTimeout(()=>{
//       setDebouncedSearchTerm(searchTerm)
//     },500)
//     return () => clearTimeout(handler);
//   },[searchTerm])

  const filteredCategories = categories.filter((category) =>
  category.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        {isModalOpen && <Modal onClose={closeModal} isOpen={isModalOpen} />}
        <div className="min-w-full inline-block align-middle">
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="flex justify-between">
              <input
               onChange={(e)=>setSearchTerm(e.target.value)}
                type="text"
                id="default-search"
                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                + Category
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    User ID
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Industry Type
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className="bg-white hover:bg-gray-50">
                      <td className="p-5 text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="p-5 text-sm text-gray-900">
                        {category.description}
                      </td>
                      <td className="p-5 text-sm text-gray-900">Customer</td>
                      <td className="p-5 text-sm text-gray-900">Accessories</td>
                      <td className="p-5">
                        <button
                          className="p-2 text-indigo-500 hover:underline"
                          onClick={() => handleDelete(category._id)}
                        >
                          Delete
                        </button>
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
