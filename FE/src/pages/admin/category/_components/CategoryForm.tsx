import Loading from '@/common/Loading/Loading'
import { Icategories } from '@/common/types/categories'
import instance from '@/configs/axios'
import { categoriesCreate, categoriesShow, categoriesUpdate } from '@/services/api/categories'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Radio, Upload, UploadProps, message } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type Props = {}

const CategoryForm = (props: Props) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [urlImage, setUrlImage] = useState<any>();
    const location = useLocation();
    const currentCategoryPage = location.state?.currentCategoryPage || 1;
    const queryClient = useQueryClient();
    const [error, setError] = useState();
    const { data, isFetching,refetch } = useQuery({
        queryKey: ['category', id],
        queryFn: () => categoriesShow(id),
    })

    const createCategories = useMutation({
        mutationFn: categoriesCreate,
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            toast.success('Thành công');
            form.resetFields();
            queryClient.setQueryData(['currentCategoryPage'], 1);
            navigate('/admin/categories')
        },
        onError: (error: any) => {
            console.log(error?.response)
            setError(error?.response.data.message)
            toast.error('Thất bại');
            setIsLoading(false)
        }
    })

    const updateCategories = useMutation({
        mutationFn: (data: Icategories) => categoriesUpdate(Number(id), data),
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['tag', id], data);
            refetch();
            setIsLoading(false);
            toast.success('Sửa thành công');
            queryClient.setQueryData(['currentCategoryPage'], currentCategoryPage); 
            navigate('/admin/categories');
        },
        onError: (error:any) => {
            setError(error?.response.data.message)
            setIsLoading(false)
            toast.error('Sửa thất bại');
        }

    })
    const propImgCategory: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info?.file?.type);
                if (isImage) {
                    setUrlImage(info.file.response.url);
                    message.open({
                        type: "success",
                        content: "Upload ảnh thành công",
                    })
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }
    const onFinish = (data: Icategories) => {
        if (id) {
            updateCategories.mutate({
                ...data,
                img_thumbnail: urlImage
            }
            )
        } else {
            createCategories.mutate({
                ...data,
                img_thumbnail: urlImage
            })
        }

    }
    return (
        <div className="p-6 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                    {id ? 'Sửa Category' : 'Thêm Category'}
                </h1>
            </div>
            {
                isFetching ? (<Loading />)
                    : <Form onFinish={onFinish} form={form} layout='vertical' initialValues={data}>
                        <Form.Item name='name' label='Tên category'>
                            <Input placeholder='Tên category' />
                        </Form.Item>
                        {
                            error ? (<div className=' text-red-600'>{error}</div>) : ''
                        }
                        <Form.Item name='img_thumbnail' label='Ảnh'>
                            <Upload {...propImgCategory}
                                showUploadList={{
                                    showPreviewIcon: false,
                                    showRemoveIcon: true,
                                }}
                                onRemove={() => {
                                    setUrlImage(null);
                                }}
                            >
                                {urlImage ? (
                                    <>
                                        <img src={urlImage} alt="Uploaded" style={{ marginTop: 16, width: 100, marginBottom: '10px' }} />
                                    </>
                                ) : (
                                    data?.img_thumbnail && (
                                        <>
                                            <img src={data.img_thumbnail} alt="Uploaded" style={{ marginTop: 16, width: 100, marginBottom: '10px' }} />
                                        </>
                                    )
                                )}

                                <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name='description' label='Mô tả'>
                            <Input placeholder='Mô tả category' />
                        </Form.Item>
                        <Button
                            htmlType='submit'
                            type="primary"
                            className='mt-2'
                            loading={isLoading}
                        >
                            {isLoading ? 'Loading' : 'Submit'}
                        </Button>
                    </Form>
            }
        </div>
    )
}


export default CategoryForm
