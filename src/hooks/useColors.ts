import { useEffect, useState } from "react";
import { Color } from "../types/Color";
import { toast } from "sonner";

/**
 * Fetches the colors from the backend
 * @returns colors and loading state
 * */

export const useColors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchColors = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/colors");
        const colors = await response.json();
        setColors(colors);
      } catch (error) {
        toast.error("Failed to connect to the Server");
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  return { colors, loading };
};
