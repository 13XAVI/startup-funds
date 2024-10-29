"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CreateCampaignForm = () => {
  const { writeContractAsync: createCampaign } = useScaffoldWriteContract("StartupFunding");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      target: 0,
      deadline: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      target: Yup.string().required("Target is required"),
      deadline: Yup.string().required("Deadline is required"),
      image: Yup.string().required("Image is required"),
    }),
    onSubmit: async values => {
      setIsLoading(true);
      try {
        const targetValue = values.target * 18;
        const deadlineTimestamp = BigInt(Math.floor(new Date(values.deadline).getTime() / 1000));

        const imageUrl = values.image;
        console.log(imageUrl);
        const tagert = BigInt(targetValue);

        await createCampaign({
          functionName: "createCampaign",
          args: [values.title, values.description, tagert, deadlineTimestamp, imageUrl],
        });

        router.push("/userdashboard");
      } catch (error) {
        console.error("Error creating campaign:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg mx-auto animate-fadeIn">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Create Campaign</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white h-24"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Target Input */}
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-white mb-2">
              Target
            </label>
            <input
              id="target"
              name="target"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.target}
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            />
            {formik.touched.target && formik.errors.target ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.target}</div>
            ) : null}
          </div>

          {/* Deadline Input */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-white mb-2">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deadline}
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            />
            {formik.touched.deadline && formik.errors.deadline ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.deadline}</div>
            ) : null}
          </div>

          {/* Image Input */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-white mb-2">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={event => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  formik.setFieldValue("image", imageUrl);
                }
              }}
              onBlur={formik.handleBlur}
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
