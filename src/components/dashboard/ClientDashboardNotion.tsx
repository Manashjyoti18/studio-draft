"use client";

import React, { useState } from "react";
import { Check, Clock, Eye, AlertCircle, Calendar, ArrowRight } from "lucide-react";

type StageKey = "Design" | "Build" | "Launch" | "Support";
type StatusType = "Not started" | "In progress" | "Review" | "Done";

interface DashboardTask {
  id: string;
  stage: StageKey;
  task: string;
  assignee: string;
  status: StatusType;
  date: string;
  deliverable: string;
}

const DASHBOARD_TASKS: DashboardTask[] = [
  // Design
  {
    id: "t1",
    stage: "Design",
    task: "Brand Tokens & Palette Architecture",
    assignee: "Abhigyan S.",
    status: "Done",
    date: "Nov 12",
    deliverable: "tokens.config.ts",
  },
  {
    id: "t2",
    stage: "Design",
    task: "Wireframe & Conversion UX Mapping",
    assignee: "Somujjal H.",
    status: "Done",
    date: "Nov 14",
    deliverable: "figma.com/sprint-v1",
  },
  {
    id: "t3",
    stage: "Design",
    task: "Interactive Micro-Interactions & States",
    assignee: "Abhigyan S.",
    status: "Done",
    date: "Nov 16",
    deliverable: "Figma Prototype link",
  },

  // Build
  {
    id: "t4",
    stage: "Build",
    task: "Next.js App Router Scaffold & Tailwind Setup",
    assignee: "Manash B.",
    status: "Done",
    date: "Nov 18",
    deliverable: "git/repo/init",
  },
  {
    id: "t5",
    stage: "Build",
    task: "Database Schema & Table Booking Engine",
    assignee: "Manash B.",
    status: "In progress",
    date: "Nov 21",
    deliverable: "api/bookings/route.ts",
  },
  {
    id: "t6",
    stage: "Build",
    task: "Digital Menu & WhatsApp Routing Integration",
    assignee: "Abhigyan S.",
    status: "In progress",
    date: "Nov 22",
    deliverable: "components/menu.tsx",
  },
  {
    id: "t7",
    stage: "Build",
    task: "Stripe & Razorpay Checkout Integration",
    assignee: "Manash B.",
    status: "Not started",
    date: "Nov 24",
    deliverable: "api/checkout/session",
  },

  // Launch
  {
    id: "t8",
    stage: "Launch",
    task: "Lighthouse Performance & 99+ Speed Audit",
    assignee: "Manash B.",
    status: "Not started",
    date: "Nov 26",
    deliverable: "lighthouse-report.json",
  },
  {
    id: "t9",
    stage: "Launch",
    task: "Custom Domain DNS Records & SSL Verification",
    assignee: "Manash B.",
    status: "Not started",
    date: "Nov 27",
    deliverable: "Vercel / Cloudflare DNS",
  },
  {
    id: "t10",
    stage: "Launch",
    task: "Google Search Console & Local Schema Submission",
    assignee: "Gouri G.",
    status: "Not started",
    date: "Nov 28",
    deliverable: "sitemap.xml",
  },

  // Support
  {
    id: "t11",
    stage: "Support",
    task: "Founder Walkthrough & Video Handover Call",
    assignee: "Abhigyan & Manash",
    status: "Not started",
    date: "Nov 30",
    deliverable: "Google Meet + Loom",
  },
  {
    id: "t12",
    stage: "Support",
    task: "30-Day Direct SLA & Maintenance Window",
    assignee: "Studio Draft Squad",
    status: "Not started",
    date: "Dec 01",
    deliverable: "Direct WhatsApp Line",
  },
];

const STAGE_KEYS: StageKey[] = ["Design", "Build", "Launch", "Support"];

export default function ClientDashboardNotion() {
  const [selectedStage, setSelectedStage] = useState<StageKey | "All">("All");

  const filteredTasks = DASHBOARD_TASKS.filter(
    (t) => selectedStage === "All" || t.stage === selectedStage
  );

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "Done":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FAF5EB] text-[#0A1F44] border border-[#E3DCCB] font-mono text-[10px] uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Done
          </span>
        );
      case "In progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/30 font-mono text-[10px] uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-pulse" />
            In progress
          </span>
        );
      case "Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0A1F44]/10 text-[#0A1F44] border border-[#0A1F44]/20 font-mono text-[10px] uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            Review
          </span>
        );
      case "Not started":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 border border-gray-200 font-mono text-[10px] uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Not started
          </span>
        );
    }
  };

  return (
    <section id="dashboard" className="relative w-full bg-[#FAF5EB] text-[#0A1F44] py-18 sm:py-20 px-6 border-b border-[#E3DCCB]">
      <div className="max-w-6xl mx-auto">
        {/* Pentagram Typography Header */}
        <div className="border-b border-[#E3DCCB] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-mono text-[#FF6B4A] mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span>TRANSPARENCY // LIVE SPRINT OBSERVABILITY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1F44] leading-tight">
              Your Project.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#354B70] max-w-xl font-normal leading-relaxed">
              When we build your product, you get a clean Notion-style workspace showing every task, status, deliverable, and date directly. Zero surprises.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E3DCCB] font-mono text-xs text-[#0A1F44] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold">LIVE DEMO SPRINT</span>
          </div>
        </div>

        {/* Notion Workspace Container */}
        <div className="bg-white rounded-xl border border-[#E3DCCB] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[480px]">
          {/* Notion Left Sidebar (30% desktop) */}
          <div className="w-full md:w-64 bg-[#FAF5EB]/50 border-b md:border-b-0 md:border-r border-[#E3DCCB] p-5 flex flex-col justify-between shrink-0">
            <div>
              {/* Workspace Title */}
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#E3DCCB]">
                <div className="w-6 h-6 rounded bg-[#0A1F44] text-[#FAF5EB] font-serif font-black flex items-center justify-center text-xs">
                  SD
                </div>
                <div className="font-mono text-xs font-bold text-[#0A1F44] tracking-mono truncate">
                  Studio Draft / Live Sprint
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedStage("All")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-mono transition-colors text-left ${
                    selectedStage === "All"
                      ? "bg-[#0A1F44] text-[#FAF5EB] font-bold"
                      : "text-[#0A1F44]/75 hover:bg-white hover:text-[#0A1F44]"
                  }`}
                >
                  <span>All Tasks</span>
                  <span className="text-[10px] opacity-75">{DASHBOARD_TASKS.length}</span>
                </button>

                {STAGE_KEYS.map((stage) => {
                  const count = DASHBOARD_TASKS.filter((t) => t.stage === stage).length;
                  const isSelected = selectedStage === stage;
                  return (
                    <button
                      key={stage}
                      onClick={() => setSelectedStage(stage)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-mono transition-colors text-left ${
                        isSelected
                          ? "bg-[#0A1F44] text-[#FAF5EB] font-bold"
                          : "text-[#0A1F44]/75 hover:bg-white hover:text-[#0A1F44]"
                      }`}
                    >
                      <span>{stage}</span>
                      <span className="text-[10px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Footer info */}
            <div className="pt-4 border-t border-[#E3DCCB] text-[10px] font-mono text-[#0A1F44]/50 space-y-1">
              <div>PROJECT: THE RETRO CAFE</div>
              <div>TIMELINE: 14 DAYS TOTAL</div>
              <div>LEAD: ABHIGYAN &amp; MANASH</div>
            </div>
          </div>

          {/* Main Area: Notion-style Clean Table / List */}
          <div className="flex-1 p-5 sm:p-6 overflow-x-auto flex flex-col justify-between">
            <div>
              {/* Breadcrumb & Search indicator */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E3DCCB]">
                <div className="font-mono text-xs text-[#0A1F44]/60 tracking-mono">
                  VIEW // {selectedStage.toUpperCase()} TASKS ({filteredTasks.length})
                </div>
                <div className="font-mono text-[10px] text-[#0A1F44]/40 uppercase tracking-mono">
                  AUTOSYNC ACTIVE
                </div>
              </div>

              {/* Clean Table */}
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#E3DCCB] font-mono text-[10px] uppercase tracking-mono text-[#0A1F44]/60">
                    <th className="py-2.5 px-3 font-semibold w-2/5">Task Name</th>
                    <th className="py-2.5 px-3 font-semibold w-1/5">Status</th>
                    <th className="py-2.5 px-3 font-semibold w-1/5">Assignee</th>
                    <th className="py-2.5 px-3 font-semibold w-1/5">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DCCB]/60 text-xs font-mono">
                  {filteredTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-[#FAF5EB]/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-sans text-xs font-bold text-[#0A1F44]">
                          {t.task}
                        </div>
                        <div className="text-[10px] text-[#0A1F44]/50 font-mono mt-0.5">
                          {t.deliverable}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        {getStatusBadge(t.status)}
                      </td>
                      <td className="py-3 px-3 text-[#354B70]">
                        {t.assignee}
                      </td>
                      <td className="py-3 px-3 text-[#0A1F44]/60">
                        {t.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notion Table Footer */}
            <div className="mt-6 pt-4 border-t border-[#E3DCCB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#0A1F44]/70">
              <span>+ Direct founder updates delivered via daily WhatsApp voice notes</span>
              <span className="text-[#FF6B4A] font-bold">100% TRANSPARENCY GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
