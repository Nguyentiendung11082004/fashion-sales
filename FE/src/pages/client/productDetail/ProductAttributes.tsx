/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { findProductVariant } from "@/services/api/client/productClient.api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string | undefined;
  }>({});

  const [productVariant, setProductVariant] = useState<object>({});

  const handleAttributeSelect = (key: string, id: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: prev[key] === id ? undefined : id,
    }));
    console.log(id);
  };

  useEffect(() => {
    const fetchProductVariant = async (productId: number) => {
      try {
        const variant = await findProductVariant(`/find-variant/${productId}`);
        console.log("Product variant:", variant);
        setProductVariant(variant);
      } catch (error) {
        console.log("Call api thất bại", error);
      }
    };

    // if (Object.keys(selectedAttributes).length > 0 && !isNaN(productId)) {
    //   fetchProductVariant();
    // }
  }, [selectedAttributes, productId]);

  return (
    <div>
      {Object.entries(getUniqueAttributes).map(([key, attribute], index) => (
        <div key={index}>
          <label>
            <span className="font-medium">{key}:</span>
            {selectedAttributes[key] && (
              <span className="ml-2 font-bold">
                {attribute[selectedAttributes[key]]}
              </span>
            )}
          </label>

          <div className="flex mt-3 gap-2 ">
            {Object.entries(attribute).map(([id, value]) => (
              <div
                key={id}
                className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full cursor-pointer ${
                  selectedAttributes[key] === id
                    ? "border-gray-400 border-4"
                    : "border-primary-6000 border-2"
                }`}
                style={{
                  backgroundColor: key === "color" ? value : "transparent",
                }}
                onClick={() => handleAttributeSelect(key, id)}
              >
                {key !== "color" && (
                  <div className="absolute inset-0.5 rounded-full flex items-center justify-center overflow-hidden z-0 bg-gray-300 text-sm md:text-base text-center">
                    {value}
                  </div>
                )}
                {key === "color" && (
                  <div className="absolute inset-0.5 rounded-full flex items-center justify-center overflow-hidden z-0 border-2 border-gray-300">
                    <span className="text-sm md:text-base text-center"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;
