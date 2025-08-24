// components/RoleAvatar.jsx
import React from "react";

// 🔹 Keyword-based icons
const roleIcons = [
  { keywords: ["analyst", "data"], icon: "📊" },
  { keywords: ["engineer", "developer", "software"], icon: "💻" },
  { keywords: ["designer", "ui", "ux"], icon: "🎨" },
  { keywords: ["manager", "lead"], icon: "📋" },
  { keywords: ["marketing", "sales"], icon: "📢" },
];

// 🔹 Helper: detect role → emoji
const getRoleIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  for (const { keywords, icon } of roleIcons) {
    if (keywords.some((k) => lowerRole.includes(k))) {
      return icon;
    }
  }
  return null; // fallback if no match
};

// 🔹 Helper: generate initials
const getInitials = (role: string) => {
  return role
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const RoleAvatar = ({ role }: { role: string }) => {
  const icon = getRoleIcon(role);

  if (icon) {
    // ✅ If keyword matched → show emoji
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-2xl">
        {icon}
      </div>
    );
  }

  // ❌ If no match → fallback (initials + emoji)
  const initials = getInitials(role);
  const fallbackEmoji = "✨"; // could randomize later

  return (
    <div className="w-12 h-12 flex flex-col items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
      <span>{initials}</span>
      <span className="text-xs">{fallbackEmoji}</span>
    </div>
  );
};

export default RoleAvatar;
