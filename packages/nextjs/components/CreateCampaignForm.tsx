"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donators: readonly string[];
  donations: readonly bigint[];
}

interface CreateCampaignFormProps {
  onClose: () => void;
  onCreate: (campaignData: any) => Promise<void>;
}

const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ onClose, onCreate }) => {
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
      target: Yup.number().required("Target is required").positive().integer(),
      deadline: Yup.date().required("Deadline is required"),
      image: Yup.string().required("Image is required"),
    }),
    onSubmit: async values => {
      setIsLoading(true);
      try {
        const targetValue = values.target * 1e18; // Adjust to wei if necessary
        const deadlineTimestamp = BigInt(Math.floor(new Date(values.deadline).getTime() / 1000)); // Convert to seconds
        const imageUrl = values.image;

        // Create campaign by calling the smart contract
        const campaignIndex = await createCampaign({
          functionName: "createCampaign",
          args: [values.title, values.description, BigInt(targetValue), deadlineTimestamp, imageUrl],
        });
        console.log(campaignIndex, "Campain index created");

        // Close the modal and redirect
        onClose();
        router.push("/userdashboard");
      } catch (error) {
        console.error("Error creating campaign:", error);
        alert("Failed to create campaign. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="rounded-lg shadow-xl p-8 w-full max-w-lg mx-auto animate-fadeIn bg-[#212025]">
        <h2 className="text-2xl font-semibold text-center text-white">Create Campaign</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="flex space-x-8">
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
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white mb-2">
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
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
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
              )}
            </div>
          </div>

          <div className="flex space-x-8">
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
              {formik.touched.target && formik.errors.target && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.target}</div>
              )}
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-white mb-2">
                Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deadline}
                className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              />
              {formik.touched.deadline && formik.errors.deadline && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.deadline}</div>
              )}
            </div>
          </div>

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
              className="input input-bordered w-full border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white h-16"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            )}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              type="submit"
              className="btn btn-primary w-44 rounded-lg py-2 border-blue-500 hover:bg-blue-600 text-white text-lg"
            >
              {isLoading ? "Creating..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary w-44 rounded-lg py-2 border-red-500 hover:bg-red-600 text-white text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
