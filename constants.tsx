import React from 'react';
import { Coordinator, Prize, RuleCategory } from './types';

export const EVENT_NAME = "RoboRace 26";
export const TAGLINE = "The Ultimate Racing Bots Challenge";
export const VENUE = "G.H. Raisoni University, Amravati";
export const ORGANIZER = "Department of Electronics & Telecommunication, G.H. Raisoni University";

export const PRIZES: Prize[] = [
  { rank: "1st Prize", amount: "₹7000", icon: "🥇", color: "from-yellow-400 to-yellow-600" },
  { rank: "2nd Prize", amount: "₹5000", icon: "🥈", color: "from-gray-300 to-gray-500" },
  { rank: "3rd Prize", amount: "₹3000", icon: "🥉", color: "from-orange-400 to-orange-600" },
];

export const COORDINATORS: Coordinator[] = [
  { name: "Prathmesh Sapate", phone: "+91 99220 25916", role: "Faculty Coordinator", image: "https://picsum.photos/seed/prathmesh/400/400" },
  { name: "Shreyash Pachade", phone: "+91 80100 95355", role: "Event Lead", image: "https://picsum.photos/seed/shreyash/400/400" },
  { name: "Vansh Dhobale", phone: "+91 99222 62583", role: "Technical Head", image: "https://picsum.photos/seed/vanshdh/400/400" },
];

export const RULES: RuleCategory[] = [
  {
    title: "Robot Specifications",
    rules: [
      "Max Dimensions: 30cm x 30cm x 30cm.",
      "Max Weight: 5kg including battery.",
      "Wireless control is mandatory (Bluetooth/RF).",
      "No ready-made kits like LEGO allowed for the chassis."
    ]
  },
  {
    title: "Power Supply",
    rules: [
      "Max voltage allowed: 24V DC.",
      "Only onboard batteries are allowed.",
      "Lithium-polymer (LiPo) batteries must be handled safely."
    ]
  },
  {
    title: "Track Rules",
    rules: [
      "The track consists of slopes, sharp turns, and obstacles.",
      "Robots must remain within the track boundaries.",
      "Penalty of 5 seconds for each track reset.",
      "A total of 2 resets allowed per heat."
    ]
  },
  {
    title: "Safety & Ethics",
    rules: [
      "No sharp weapons or corrosive materials.",
      "Intentional damage to the track or other robots leads to DQ.",
      "Decisions by referees are final and binding."
    ]
  }
];

export const SCHEDULE = [
  { time: "Feb 15, 2026", event: "Registration Deadline", icon: "📝" },
  { time: "8:00 AM", event: "Race Day Reporting", icon: "🏁" },
  { time: "10:30 AM", event: "Competition Start", icon: "⚡" },
  { time: "4:30 PM", event: "Result Announcement", icon: "🏆" },
];

export const DEPARTMENTS = [
  "B.Tech CSE",
  "B.Tech EXTC",
  "B.Tech AI & ML",
  "B.Tech Mechanical",
  "B.Tech Electrical",
  "B.Tech Civil",
  "B.Tech IT",
  "B.Tech Biotechnology",
  "B.Pharm",
  "MBA",
  "MCA",
  "Other"
];