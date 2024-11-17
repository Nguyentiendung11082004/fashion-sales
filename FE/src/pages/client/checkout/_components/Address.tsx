import React, { useState } from 'react';
import { Modal as AntModal, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';
import { useAuth } from '@/common/context/Auth/AuthContext';
import Loading from '@/common/Loading/Loading';
import AddressAction from './AddressAction';

type Props = {
  open: boolean,
  onClose: () => void,
  title: string,
  dataCheckout: any,
  onHandleOk: (id: any, dataIdAddress: any) => void;
}

const ModalAddress = ({ open, onClose, title, dataCheckout, onHandleOk }: Props) => {
  const { token } = useAuth();
  const [addressAction, setAddressAction] = useState(false);
  const [idAddress, setIdAddress] = useState();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setSelectedId(id);
  };

  const [dataIdAddress, setDataIdAddress] = useState();

  const handleClose = () => {
    onClose();
    setSelectedId(selectedId);
  };

  const handleOk = (id: any, dataIdAddress: any) => {
    onHandleOk(id, dataIdAddress);
    onClose();
  };

  const handleOpenAddress = (id?: any) => {
    setIdAddress(id);
    setAddressAction(true);
  };

  const handleCloseAddress = () => {
    setAddressAction(false);
    setIdAddress(undefined);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['address'],
    queryFn: async () => {
      const res: any = await instance.get('/addresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data?.addresses;
    },
    enabled: open,
  });

  const checkDefault = data?.find((e:any) => e?.is_default === true);
  const defaultId = checkDefault?.id;
  const handleSaveValueAddress = (data: any) => {
    setDataIdAddress(data);
  };
  return (
    <>
      <AntModal title={title} open={open} onCancel={onClose} closable={false} maskClosable={false} footer={false}>
        {isFetching ? (
          <Loading />
        ) : (
          data?.sort((a: any, b: any) => (a.is_default === true ? -1 : 1))?.map((e: any) => (
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200" key={e.id}>
              <div className="col-span-1 flex items-center justify-center">
                <input
                  type="radio"
                  name="radio-group"
                  value={e.id}
                  checked={defaultId === e.id}
                  onChange={(event) => handleChange(event, e.id)}
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="col-span-8">
                <div className="flex">
                  <p className="font-medium text-gray-900 text-xl">
                    {dataCheckout?.user?.name}
                  </p>
                  <span className="text-sm text-gray-600 ml-4 mt-1"> | {e?.phone}</span>
                </div>
                <div className="my-2">
                  <p className="text-sm text-gray-700 mb-2">
                    {e.address}, {e.ward?.name}, {e.district?.name}, {e.city?.name}
                  </p>

                </div>
              </div>
              <div className="col-span-3">
                <button onClick={() => handleOpenAddress(e.id)}>Cập nhật</button>
              </div>
            </div>
          ))
        )}

        <div>
          <button onClick={() => handleOpenAddress()} className="mb-2">
            Thêm địa chỉ mới
          </button>
        </div>
        <Button className="mr-2" onClick={handleClose}>
          Quay lại
        </Button>
        <Button type="primary" onClick={() => handleOk(selectedId, dataIdAddress)}>
          Ghi lại
        </Button>
      </AntModal>
      <AddressAction
        title={`${idAddress ? 'Cập nhật' : 'Thêm mới'} địa chỉ`}
        open={addressAction}
        onClose={handleCloseAddress}
        idAddress={idAddress}
        onAddressSave={handleSaveValueAddress}
      />
    </>
  );
};

export default ModalAddress;
