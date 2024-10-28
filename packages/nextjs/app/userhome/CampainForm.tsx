"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CampaignForm = () => {
  const { writeContractAsync: registerUser } = useScaffoldWriteContract("StartupFunding");
  const [isOpen, setIsOpen] = useState(true); // Control popup visibility
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleClose = () => setIsOpen(false);

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
      title: "",
      description: "",
      target: 0, // Using number here
      amountCollected: 0, // Using number here
      deadline: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      target: Yup.number().required("Target is required").min(1, "Target must be greater than 0"),
      amountCollected: Yup.number().required("Amount collected is required"),
      deadline: Yup.string().required("Deadline is required"),
      image: Yup.string().required("Image is required"),
    }),

    onSubmit: async values => {
      console.log("Form values", values);

      // Convert target and amountCollected to BigInt
      await registerUser({
        functionName: "createCampaign",
        args: [values.title, values.description, BigInt(values.target), BigInt(values.deadline), values.image],
      });
      router.push("/userdashboard");
      handleClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div ref={popupRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Register</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-600 mb-1">
              Target
            </label>
            <input
              id="target"
              name="target"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.target}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.target && formik.errors.target ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.target}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="amountCollected" className="block text-sm font-medium text-gray-600 mb-1">
              Amount Collected
            </label>
            <input
              id="amountCollected"
              name="amountCollected"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amountCollected}
              className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            />
            {formik.touched.amountCollected && formik.errors.amountCollected ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.amountCollected}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary w-full rounded-lg py-2 mt-2">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
