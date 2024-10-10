/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

type Attribute = {
  [id: string]: string;
};

type Product = {
  getUniqueAttributes: {
    [key: string]: Attribute;
  };
};

type Props = {
  product: Product;
};

const ProductAttributes: React.FC<Props> = ({ product }) => {
  const { getUniqueAttributes } = product;

  if (!getUniqueAttributes || Object.keys(getUniqueAttributes).length === 0) {
    return <div></div>;
  }

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string | undefined;
  }>({});

  const handleAttributeSelect = (key: string, id: string) => {
    setSelectedAttributes((value) => ({
      ...value,
      [key]: value[key] === id ? undefined : id,
    }));
  };

  return (
    <div>
      {Object.entries(getUniqueAttributes).map(([key, attribute], index) => (
        <div key={index} className="mt-5">
          <label>
            <span className="font-medium">
              {key.toUpperCase()}:
              <span className="ml-1 font-semibold">
                Chọn {key.toLowerCase()}
              </span>
            </span>
          </label>
          <div className="flex mt-3 gap-2">
            {Object.entries(attribute).map(([id, value]) => (
              <div
                key={id}
                className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full cursor-pointer transition-all duration-300 ${
                  key === "color"
                    ? "border border-black"
                    : "border border-black bg-gray-100"
                } ${selectedAttributes[key] === id ? "border-4" : "border"}`}
                style={{
                  backgroundColor: key === "color" ? value : "transparent",
                  opacity:
                    selectedAttributes[key] && selectedAttributes[key] !== id
                      ? 0.5
                      : 1,
                  cursor:
                    selectedAttributes[key] && selectedAttributes[key] !== id
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() => handleAttributeSelect(key, id)}
              >
                {key !== "color" && (
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                    {value}
                  </span>
                )}

                {key === "color" && (
                  <div className="absolute inset-0.5 rounded-full z-0 object-cover"></div>
                )}
              </div>
            ))}
          </div>
          {key !== "color" && !selectedAttributes[key] && (
            <div className="mt-2 text-red-500 font-medium">
              Lỗi: vui lòng chọn {key.toLowerCase()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;
