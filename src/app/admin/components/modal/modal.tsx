"use client";
import { useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        alert("Category added successfully");
        setName("");
        setDescription("");
        onClose(); // Close the modal after success
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`${
              loading ? "bg-blue-300" : "bg-blue-500"
            } text-white px-4 py-2 rounded-md`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
