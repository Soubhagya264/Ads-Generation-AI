"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Aceternity UI
import DashboardCard from "@/components/ui/BackgroundCards";
// Optional: For effects if using sparkles
import { SparklesCore } from "@/components/ui/sparkles";

import CreateAdModal from "./CreateAdModal";
export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Welcome to AI Ads Studio 🚀
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 text-white hover:scale-105 transition">
          + Create Ad
        </Button>
      </div>
      <CreateAdModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* Sparkles or Gradient Effect */}
      {/* Optional: If using SparklesCore */}
      <SparklesCore className="h-20 w-full" particleColor="#9333ea" background="transparent" />

      {/* Cards Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DashboardCard title="Create Ad" description="Launch your first AI ad campaign." />
        <DashboardCard title="My Videos" description="Browse your generated video ads." />
        <DashboardCard title="Billing" description="Manage your subscription and invoices." />
      </div>

      {/* Billing Section */}
      <div className="mt-12 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Billing Overview</h2>
            <p className="text-gray-400 mt-1">Manage your plan, usage and invoices.</p>
          </div>
          <Link href="/workspace/billing">
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition">
              Go to Billing
            </Button>
          </Link>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold text-white">Tools & Add-ons</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li>Brand Voice Tuning (upload your brand tone)</li>
          <li>Auto-publish to connected Ad accounts</li>
        </ul>
      </div>
    </div>
  );
}
