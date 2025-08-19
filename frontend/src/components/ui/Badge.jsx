import React from 'react';

function Badge({ className = '', variant = "default", ...props }) {
  const baseClasses = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium";
  const variantClasses = {
    "one-time": "bg-blue-50 text-blue-700", // Changed from "approved"
    "recurring": "bg-orange-50 text-orange-700", // Changed from "pending"
    default: "bg-gray-100 text-gray-800"
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`.trim();

  return (
    <span
      className={classes}
      {...props}
    />
  );
}

function BadgeIndicator({ className = '', variant = "default" }) {
  const baseClasses = "h-2 w-2 rounded-full";
  const variantClasses = {
    "one-time": "bg-blue-500", // Changed from "approved"
    "recurring": "bg-orange-500", // Changed from "pending"
    default: "bg-gray-500"
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`.trim();

  return (
    <span
      className={classes}
    />
  );
}

export { Badge, BadgeIndicator };