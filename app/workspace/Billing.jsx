"use client";

import React, { useContext, useState } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

const creditOptions = [
  { credits: 10, price: 9 },
  { credits: 20, price: 16 },
  { credits: 50, price: 35 },
];

const Billing = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const updateUser = useMutation(api.user.UpdateUser);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (credits) => {
    setLoading(true);
    try {
      const updatedCredits = (userDetails?.credits || 0) + credits;
      await updateUser({ _id: userDetails._id, credits: updatedCredits });

      setUserDetails((prev) => ({
        ...prev,
        credits: updatedCredits,
      }));

      alert(`Successfully purchased ${credits} credits!`);
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen mx-auto px-6 py-12 min-h-screen bg-gradient-to-br from-black via-gray-700 to-blue-500">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-500">Buy Credits</h1>

      <div className="mb-10 text-center">
        <p className="text-lg">You currently have</p>
        <span className="text-5xl font-extrabold text-blue-600">{userDetails?.credits}</span>
        <p className="text-lg">credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-5xl">
        {creditOptions.map((option, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg p-8 bg-gradient-to-tr from-white via-blue-200 to-blue-50 transition hover:shadow-2xl flex flex-col justify-between ${selected === index ? "ring-4 ring-blue-400" : ""
              }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <h2 className="text-2xl font-bold text-blue-900">{option.credits} Credits</h2>
              <p className="text-lg font-medium text-blue-700">${option.price}</p>
              <p className="text-sm text-gray-600">
                (${(option.price / option.credits).toFixed(2)} per credit)
              </p>
            </div>

            <div className="mt-6 ">
              <PayPalButtons
                style={{ layout: "vertical", shape: "pill", height: 48, label: "pay" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: option.price.toString(),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={async () => {
                  setSelected(index);
                  await handlePurchase(option.credits);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;
