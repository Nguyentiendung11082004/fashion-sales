export const colorClassMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    pink: "bg-pink-300",
    orange: "bg-orange-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
    slate: "bg-slate-500",
    brown:"bg-brown-500"
    // Thêm các màu khác nếu cần (lưu ý trong database phải khai báo value là tiếng anh)
  };

  export const convertColorNameToClass = (colorName: string): string => {
    const lowerCaseColor = colorName.toLowerCase();
    if (Object.keys(colorClassMap).includes(lowerCaseColor)) {
      return colorClassMap[lowerCaseColor];
    } else {
      throw new Error(`Invalid color: ${colorName}`);
    }
  };

  export const colorTranslations: { [key: string]: string } = {
    Red: "Đỏ",
    Black: "Đen",
    White: "Trắng",
    Green: "Xanh lá",
    Blue: "Xanh biển",
    Yellow: "Vàng",
    Gray: "Xám",
    Purple: "Tím",
    Pink: "Hồng",
    Orange: "Cam",
    Rose: "Đỏ hồng",
    Violet: "Tím",
    Slate: "Xám ",
    Brown:"Ghi"
    // Thêm các màu khác nếu cần (lưu ý chữ cái đầu phải viết hoa)
  };
  
