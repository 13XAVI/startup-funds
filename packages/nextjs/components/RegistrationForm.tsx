"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RegistrationForm = () => {
  const { writeContractAsync: registerUser } = useScaffoldWriteContract("StartupFunding");
  const [isOpen, setIsOpen] = useState(true); // Control popup visibility
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleClose = () => setIsOpen(false);

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async values => {
      console.log("Form values", values);
      await registerUser({
        functionName: "registerUser",
        args: [values.name, values.email],
      });
      router.push("/userdashboard");
      handleClose(); // Close popup on successful submit
    },
  });

  if (!isOpen) return null; // Don't render if popup is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div ref={popupRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Register</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary w-full rounded-lg py-2 mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
