"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const TransferOwnership = () => {
  const { writeContractAsync: transferOwnership } = useScaffoldWriteContract("RewardToken");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async values => {
      console.log("Form values", values);
      await transferOwnership({
        functionName: "transferOwnership",
        args: [values.address],
      });
      router.push("/userdashboard");
    },
  });

  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <div className="bg-[#131217]/40 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">Transfer Ownership</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                Address To Transfer
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className="input input-bordered w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary w-full rounded-lg py-2 mt-2">
              Transfer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferOwnership;
