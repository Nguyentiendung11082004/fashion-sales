import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailAdmin = () => {
    const { id } = useParams();

    const { data: productShow, isFetching, isError } = useQuery({
        queryKey: ['productShow', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await instance.get(`/products/${id}`);
            return response.data.product;
        },
        enabled: !!id
    });

    if (isFetching) return <Skeleton />;

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                    Chi tiết sản phẩm
                </h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-5 gap-4">
                {/* Phần gallery bên trái */}
                <div className="col-span-1 flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                    {productShow.galleries?.map((gallery: any) => (
                        <img
                            key={gallery.id}
                            src={gallery.image}
                            alt={`Gallery ${gallery.id}`}
                            className="w-[135px] h-auto  object-cover rounded-md shadow"
                        />
                    ))}
                </div>

                {/* Phần ảnh sản phẩm lớn ở giữa */}
                <div className="col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h3>
                    <img
                        src={productShow.img_thumbnail}
                        alt={productShow.name}
                        className="w-full h-auto object-cover rounded-md mb-4 shadow-lg"
                    />
                </div>

                {/* Phần thông tin sản phẩm bên phải */}
                <div className="col-span-2 flex flex-col">
                    <h3 className="text-lg font-semibold mb-4">Thông tin</h3>

                    <h2 className="text-2xl font-semibold text-gray-900">Tên sản phẩm : {productShow.name}</h2>
                    <p className="text-gray-600">SKU: <span className="font-medium">{productShow.sku}</span></p>
                    <p className="text-lg font-bold text-gray-800">
                        Giá: <span className="text-gray-600 line-through">{productShow.price_regular} VNĐ</span>
                    </p>
                    <p className="text-lg font-bold text-red-500">Giá Sale: {productShow.price_sale} VNĐ</p>
                    <p className="text-sm text-gray-500">Số lượng: {productShow.quantity}</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Mô tả sản phẩm</h3>
                        <p className="mt-2 text-gray-800 font-medium">Tiêu đề mô tả:</p>
                        <p className="mt-1 text-gray-700">{productShow.description_title}</p>
                        <p className="mt-4 text-gray-800 font-medium">Nội dung:</p>
                        <p className="mt-1 text-gray-600">{productShow.description}</p>
                    </div>



                    <div className="mt-4">
                        <p className="font-semibold">Trạng thái:
                            <span className={`ml-1 ${productShow.status ? 'text-green-500' : 'text-red-500'}`}>
                                {productShow.status ? 'Còn hàng' : 'Hết hàng'}
                            </span>
                        </p>
                        <p className="mt-1 font-semibold">Xu hướng:
                            <span className={`ml-1 ${productShow.trend ? 'text-green-500' : 'text-gray-500'}`}>
                                {productShow.trend ? 'Có' : 'Không'}
                            </span>
                        </p>
                        <p className="mt-1 font-semibold">Mới:
                            <span className={`ml-1 ${productShow.is_new ? 'text-green-500' : 'text-gray-500'}`}>
                                {productShow.is_new ? 'Có' : 'Không'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailAdmin;
