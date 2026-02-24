"use client";

import { memo, useState } from "react";
import { Home } from "lucide-react";
import { toggleVideoHomepage } from "@/lib/actions/videos";

interface ToggleHomepageVideoProps {
  id: string;
  initialValue: boolean;
}

export const ToggleHomepageVideo = memo(function ToggleHomepageVideo({ id, initialValue }: ToggleHomepageVideoProps) {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    const result = await toggleVideoHomepage(id, newValue);

    if (result.error) {
      // Revert on error
      setIsEnabled(!newValue);
      alert("Failed to update: " + result.error);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isEnabled ? "Remove from homepage" : "Show on homepage"}
      className={`
        p-1.5 rounded transition-all duration-200
        ${isEnabled
          ? "bg-primary-100 text-primary-600 hover:bg-primary-200"
          : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <Home className="h-4 w-4" />
    </button>
  );
})
