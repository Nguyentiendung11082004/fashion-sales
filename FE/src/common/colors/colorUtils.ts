export const colorClassMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
    slate: "bg-slate-500",
    // Thêm các màu khác nếu cần
  };

  export const convertColorNameToClass = (colorName: string): string => {
    const lowerCaseColor = colorName.toLowerCase();
    if (Object.keys(colorClassMap).includes(lowerCaseColor)) {
      return colorClassMap[lowerCaseColor];
    } else {
      throw new Error(`Invalid color: ${colorName}`);
    }
  };