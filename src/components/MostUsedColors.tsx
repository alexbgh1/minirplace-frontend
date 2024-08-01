import { useState, useEffect } from "react";
import { UserColorStat } from "../types";
import { getUserColorStat } from "../services/stats/user/userColorStatService";

const MostUsedColors = () => {
  const [userColorStat, setUserColorStat] = useState<UserColorStat[] | []>([]);

  const fetchUserColorStat = async () => {
    try {
      // This call expect to be Authenticated
      const data = await getUserColorStat();
      setUserColorStat(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserColorStat();
    })();
  }, []);

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={fetchUserColorStat}
        className="text-white transition duration-300 ease-in-out bg-transparent border-none opacity-50 hover:opacity-100 "
      >
        Refresh
      </button>
      {userColorStat.length > 0
        ? userColorStat.map((color) => {
            return (
              <div key={color.id} className="flex flex-col">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hex }}></div>
                <span>{color.count}</span>
              </div>
            );
          })
        : "No colors used yet"}
    </div>
  );
};

export default MostUsedColors;
