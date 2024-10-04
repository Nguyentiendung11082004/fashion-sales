import Loading from "@/common/Loading/Loading";


import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalActon from './_components/Modal';
import { deleteAttributesItem, getAttributesItem } from "@/services/api/attribute-item";
import { Iattributeitem } from "@/common/types/attribute-item";

const AttributeItemValues: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState<number | undefined>();
    const queryClient = useQueryClient();
    
    const { data, isFetching, isError } = useQuery({
        queryKey: ['attributes-values'],
        queryFn: getAttributesItem
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setCurrentId(undefined);
    };

    const dataSource = data?.map((item: Iattributeitem) => ({
        key: item.id,
        ...item,
    })) || [];

    const handleEdit = (id: number) => {
        setCurrentId(id);
        setVisible(true);
    };

    const handleRemove = (id: number) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa thuộc tính này?',
            onOk: () => {
                return deleteMutation.mutate(id);
            },
        });
    };

    const deleteMutation = useMutation({
        mutationFn: deleteAttributesItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attributes-values'] });
            toast.success('Xóa thành công');
        },
        onError: () => {
            toast.error('Xóa thất bại');
        },
    });

    const columns = [
        {
            title: 'Stt',
            render: (text: any, record: Iattributeitem, index: number) => (index + 1) + (currentPage - 1) * pageSize,
        },
        {
            title: 'Giá trị thuộc tính',
            dataIndex: 'value',
        },
        {
            title: 'Thao tác',
            render: (record: Iattributeitem) => (
                <div>
                    <Button className="mx-2 btn-warning" onClick={() => handleEdit(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button className="btn-danger" onClick={() => handleRemove(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (isError) {
            toast.error('Có lỗi xảy ra');
        }
    }, [isError]);

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                    Giá trị thuộc tính
                </h1>
                <Button className="my-2" type="primary" onClick={openModal}>
                    <PlusOutlined /> Thêm giá trị thuộc tính
                </Button>
            </div>
            <div>
                {isFetching ? (
                    <Loading />
                ) : (
                    <>
                        <Table
                            className="custom-table"
                            dataSource={dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                            columns={columns}
                            pagination={false}
                        />
                        <Pagination
                            className="mt-4"
                            align="end"
                            current={currentPage}
                            total={dataSource.length}
                            pageSize={pageSize}
                            onChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
            <ModalActon currentId={currentId} open={visible} onClose={closeModal} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default AttributeItemValues;
