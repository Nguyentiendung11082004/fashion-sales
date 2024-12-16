import Loading from "@/common/Loading/Loading";
import { useAuth } from "@/common/context/Auth/AuthContext";
import { FormatMoney } from "@/common/utils/utils";
import CheckoutIcon22 from "@/components/icons/checkout/CheckoutIcon22";
import Completed from "@/components/icons/checkout/Completed";
import Map from "@/components/icons/checkout/Map";
import instance from "@/configs/axios";
import { CreditCardOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Radio, Select } from "antd";
import { createContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAddress from "./_components/Address";
import User from "@/components/icons/checkout/User";
export const ContextCheckout = createContext({});
const Checkout = () => {
  const { Option } = Select;
  const { token } = useAuth();
  const queryClient = useQueryClient()
  const location = useLocation();
  const navigate = useNavigate();
  // const savedCartIds = localStorage.getItem('cartIds');
  // || (savedCartIds ? JSON.parse(savedCartIds) : []);
  // const cartIds = location.state?.cartIds;
  const [cartIds, setCartIds] = useState<number[]>(location.state?.cartIds || []);
  const [validCartIds, setValidCartIds] = useState<any[]>([])
  const [_payload, _setPayLoad] = useState(location.state?._payload);
  const [paymentMethhod, setPaymentMethod] = useState('1');
  const [shiping, setShipPing] = useState<string>('');
  const [voucher, setVoucher] = useState<any>();
  const [subTotal, setSubTotal] = useState(); // giá khi áp dụng voucher
  const [totalDiscount, setTotalDiscount] = useState<number | undefined>();
  const [dataCheckout, setDataCheckout] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [visible, setVisible] = useState(false)
  const [idTinh, setIdTinh] = useState<number | null>(0)
  const [idQuanHuyen, setIdQuanHuyen] = useState<number | null>(0)
  const [idXa, setIdXa] = useState<number | null>(0);
  const [payloadDiaChi, setPayLoadDiaChi] = useState<any>(null);

  // lỗi
  const [error, setError] = useState<any>({})
  const [errorOrder, setErrorOrder] = useState<any>()
  const [errorCheckout, setErrorCheckout] = useState<any>()

  const handleChangeMethod = (e: any) => {
    const newPaymentMethod = e.target.value;
    setPaymentMethod(newPaymentMethod);
    setOrder((prev) => ({
      ...prev,
      payment_method_id: newPaymentMethod,
    }));
  };
  // console.log("error", error)
  const qty = dataCheckout?.order_items?.map((e: any) => e?.quantity);
  const cartItemIds = dataCheckout?.order_items?.map((e: any) => e);
  const quantityOfCart = cartItemIds?.reduce((acc: any, id: any, index: number) => {
    acc[id] = qty[index];
    return acc;
  }, {});
  const [order, setOrder] = useState({
    payment_method_id: 1,
    user_note: "",
    ship_user_email: '',
    ship_user_name: '',
    ship_user_phonenumber: '',
    ship_user_address: dataCheckout?.user?.address,
    shipping_method: paymentMethhod,
    voucher_code: voucher,
    shipping_fee: shiping,
    cart_item_ids: cartIds || [],
    // quantityOfCart: quantityOfCart || {},
    product_id: _payload?.product_id || null,
    product_variant_id: _payload?.product_variant_id || null,
    quantity: _payload?.quantity || null,

  });
  const mutationVoucher = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/checkout`, {
        cart_item_ids: cartIds,
        voucher_code: voucher,
        product_id: order.product_id,
        product_variant_id: order.product_variant_id,
        quantity: order.quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setTotalDiscount(res?.data?.total_discount)
      setSubTotal(res?.data?.sub_total)
      return res.data;
    },
  });

  const orderMutation = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/order`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res?.data;
    },
    onSuccess: (data: any) => {
      if (data.payment_url) {
        window.location.href = data?.payment_url;
        localStorage.removeItem('checkedItems');
        setTimeout(() => {
          navigate('/thank', { replace: true });
        }, 2000);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['cart']
        });
        localStorage.removeItem('checkedItems');
        navigate('/thank', { replace: true });
      }
      localStorage.removeItem('checkedItems');
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      if (errors?.out_of_stock || errors?.insufficient_stock) {
        // Lỗi liên quan đến số lượng
        setErrorOrder(errors);
      } else {
        // Lỗi liên quan đến validate thông tin
        setError(errors);
      }
      toast.error(error?.response?.data?.errors);
    }
  });
  useEffect(() => {
    if (errorOrder) {
      const allErrors = [...errorOrder?.out_of_stock, ...errorOrder?.insufficient_stock];
      allErrors.forEach(error => toast.error(error.message));
      const outOfStockCartIds = errorOrder.out_of_stock.map((error: any) => error.cart_id);
      const filteredCartIds = cartIds.filter((id: number) => !outOfStockCartIds.includes(id));
      setCartIds(filteredCartIds);
      setOrder((prev) => ({
        ...prev,
        cart_item_ids: filteredCartIds
      }))
    } else if (errorCheckout) {
      const allErrors = [...errorCheckout?.out_of_stock, ...errorCheckout?.insufficient_stock,];
      allErrors.forEach(error => toast.error(error.message));
      const outOfStockCartIds = errorCheckout.out_of_stock.map((error: any) => error.cart_id);
      const filteredCartIds = cartIds.filter((id: number) => !outOfStockCartIds.includes(id));
      setCartIds(filteredCartIds);
      setOrder((prev) => ({
        ...prev,
        cart_item_ids: filteredCartIds
      }))
    }
  }, [errorOrder, errorCheckout]);
  const handleOrder = () => {
    orderMutation.mutate();
  };
  const handleVoucher = () => {
    setOrder((prev: any) => ({
      ...prev,
      voucher_code: voucher
    }))
    mutationVoucher.mutate();
  };
  const handleCancelVoucher = () => {
    setVoucher("")
    setOrder((prev: any) => ({
      ...prev,
      voucher_code: ""
    }))
    mutationVoucher.mutate();
  }
  const setForm = (props: any, value: any) => {
    setOrder((prev) => ({
      ...prev,
      [props]: value
    }));
  };
  const { data: tinhThanh } = useQuery({
    queryKey: ['tinhThanh'],
    queryFn: async () => {
      const res = await instance.get(`/getprovinces`);
      return res.data;
    }
  });
  const { data: quanHuyen } = useQuery<any>({
    queryKey: ['quanHuyen', idTinh],
    queryFn: async () => {
      const res = await instance.post(`/getdistricts`, { province_id: idTinh });
      return res?.data;
    },
    enabled: !!tinhThanh
  });
  const { data: phuongXa } = useQuery({
    queryKey: ['phuongXa', idQuanHuyen],
    queryFn: async () => {
      const res = await instance.post(`/getwards`, { district_id: idQuanHuyen });
      return res.data;
    },
    enabled: !!quanHuyen
  });
  const handleChangeTinh = (e: any) => {
    setOrder((prev: any) => ({
      ...prev,
      tinh: e.label,
      huyen: '',
      xa: '',
    })),
      setIdTinh(Number(e.value));
    setShipPing('')
    setIdQuanHuyen(null)
    setIdXa(null)
  };
  const handleChangeQuanHuyen = (e: any) => {
    setOrder((prev: any) => ({
      ...prev,
      xa: '',
      huyen: e.label,
    })),
      setShipPing('')
    setIdXa(null)
    setIdQuanHuyen(e.value);
  };
  const handleChangeXa = async (e: any) => {
    setOrder((prev: any) => ({
      ...prev,
      xa: e.label,
    }));
    setIdXa((e.value));
  };

  const handleOpenModal = () => {
    setVisible(true)
  }
  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleSaveDiaChi = (dataIdAddress: any) => {
    setPayLoadDiaChi(dataIdAddress)
    setVisible(false)
  }

  let dataDiaChi = dataCheckout?.user?.addresses?.filter((e: any) => e.is_default === true);
  useEffect(() => {
    if (dataCheckout?.user?.addresses && !payloadDiaChi) {
      const defaultAddress = dataCheckout.user.addresses.find((address: any) => address.is_default);
      if (defaultAddress) {
        setPayLoadDiaChi(defaultAddress);
      }
    }
  }, [dataCheckout]);


  useEffect(() => {
    if (dataCheckout && dataCheckout.user) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        ship_user_email: dataCheckout.user.email || '',
        ship_user_name: dataCheckout.user.name || '',
        ship_user_phonenumber: dataCheckout.user.phone_number || '',
        ship_user_address: dataCheckout?.user?.address || '',
        // tinh: dataDiaChi[0]?.city?.name || '',
        // huyen: dataDiaChi[0]?.district?.name || '',
        // xa: dataDiaChi[0]?.ward?.name || '',
        // quantityOfCart: quantityOfCart,
      }));
    }
  }, [dataCheckout]);
  useEffect(() => {
    if (!_payload) {
      return;
    }
  })
  const handleBuyCart = async () => {
    const payload = { cart_item_ids: cartIds };
    if (cartIds.length > 0) {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/v1/checkout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          navigate('/cart', { replace: true });
          toast.error("Sản phẩm đã hết hàng")
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setErrorCheckout(data.errors)
        setDataCheckout(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      finally {
        setIsLoading(false);
      }
    }
  }

  const handleBuyNow = async () => {
    try {
      if (_payload || payloadDiaChi) {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/v1/checkout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(_payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log("data", data)
        // setErrorCheckout(data?.errors)
        setDataCheckout(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
    finally {
      setIsLoading(false);
    }
  }
  let weight = dataCheckout?.order_items?.map((e: any) => Number(e.product.weight));
  let totalWeight = weight?.reduce((sum: any, currentWeight: any) => sum + currentWeight, 0);
  let toWardCode = payloadDiaChi?.ward?.id || idXa;
  let toDistrictId = payloadDiaChi?.district?.id || idQuanHuyen;
  const getShipp = async () => {
    let res = await instance.post(`/calculateshippingfee`, {
      to_ward_code: String(toWardCode),
      to_district_id: Number(toDistrictId),
      weight: totalWeight
    });
    setShipPing(res?.data?.fee?.total || 21000);
    setOrder((prev) => ({ ...prev, shipping_fee: res?.data?.fee?.total || 21000 }));
  };
  useEffect(() => {
    handleBuyNow()
  }, [_payload, payloadDiaChi, errorOrder])
  useEffect(() => {
    handleBuyCart()
  }, [payloadDiaChi, errorOrder]);
  // useEffect(() => {
  //   console.log("errorOrder", errorOrder)
  //   if (errorOrder) {
  //     handleBuyCart(payload);
  //   } else {
  //     let payload = { cart_item_ids: cartIds };
  //     handleBuyCart(payload);
  //   }
  // }, [payloadDiaChi, errorOrder]);


  useEffect(() => {
    // if (payloadDiaChi && payloadDiaChi.district && payloadDiaChi.ward) {
    //   getShipp();
    // }
    if (idQuanHuyen && idXa) {
      getShipp();
    }
  }, [idXa, idQuanHuyen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // if (isLoading) return <Loading />
  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center ">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 py-[50px] mb-0">
              <div className="relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Thanh toán
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-page-head*/}
        <div className="hd-CheckoutPage">
          <main className="container lg:pb-28 lg:pt-20">
            {
              // isLoading ? <Loading /> :
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                  <div className="space-y-8">
                    {
                      token &&
                      <div className="scroll-mt-24 mt-2">
                        <div className="border border-slate-200 rounded-xl shadow-md overflow-hidden z-0">
                          <div className="flex flex-col sm:flex-row items-start p-6 bg-white dark:bg-neutral-900">
                            <span className="hidden sm:block mt-4">
                              <User />
                            </span>
                            <div className="sm:ml-4 flex-1">
                              <h3 className="text-black text-lg font-semibold flex items-center space-x-2">
                                <span className="uppercase tracking-tight text-base">{'Thông tin người dùng'}</span>
                                <Completed />
                              </h3>
                              <div className="font-semibold mt-2 text-sm text-gray-700 dark:text-gray-300">
                                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                                  <div className="flex-1">
                                    <label className="text-sm font-medium text-neutral-600">Tên người dùng: </label>
                                    <span className="text-lg font-semibold text-gray-800">{dataCheckout?.user?.name}</span>
                                  </div>
                                  <div className="flex-1">
                                    <label className="text-sm font-medium text-neutral-600">Số điện thoại: </label>
                                    <span className="text-lg font-semibold text-gray-800">{dataCheckout?.user?.phone_number}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-slate-200 rounded-xl overflow-hidden z-0 mt-4 p-6 shadow-lg bg-white dark:bg-neutral-800">
                          <div>
                            <div className="sm:ml-4">
                              <h3 className="text-black flex items-center space-x-2">
                                <Map />
                                <span className="uppercase tracking-tight font-semibold text-xl">Địa chỉ nhận hàng</span>
                                <Completed />
                              </h3>

                              <div className="space-y-6 ">
                                {/* Thành phố */}
                                <div className="flex flex-col">
                                  <label className="text-base font-medium text-neutral-900">Thành phố</label>
                                  <Select
                                    labelInValue
                                    onChange={handleChangeTinh}
                                    showSearch
                                    optionFilterProp="children"
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.tinh ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25`}
                                  >
                                    {tinhThanh?.provinces?.map((e: any) => (
                                      <Option key={e?.ProvinceID} value={e?.ProvinceID}>
                                        {e?.ProvinceName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.tinh && <p className="text-sm text-red-500">{error?.tinh[0]}</p>}
                                </div>

                                {/* Quận huyện */}
                                <div className="flex flex-col">
                                  <label className="text-base font-medium text-neutral-900">Quận huyện</label>
                                  <Select
                                    labelInValue
                                    value={idQuanHuyen ? { value: idQuanHuyen } : ''}
                                    onChange={handleChangeQuanHuyen}
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.huyen ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25`}
                                  >
                                    {quanHuyen?.districts?.map((quan: any) => (
                                      <Option key={quan.DistrictID} value={quan.DistrictID}>
                                        {quan.DistrictName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.huyen && <p className="text-sm text-red-500">{error?.huyen[0]}</p>}
                                </div>

                                {/* Phường xã */}
                                <div className="flex flex-col">
                                  <label className="text-base font-medium text-neutral-900">Phường Xã</label>
                                  <Select
                                    labelInValue
                                    value={idXa ? { value: String(idXa) } : null}
                                    onChange={handleChangeXa}
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.xa ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25`}
                                  >
                                    {phuongXa?.wards?.map((e: any) => (
                                      <Option key={e?.WardCode} value={`${e?.WardCode}`}>
                                        {e?.WardName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.xa && <p className="text-sm text-red-500">{error?.xa[0]}</p>}
                                </div>
                              </div>


                              <div className="mt-4">
                                <label className="text-base font-medium text-neutral-900">Địa chỉ cụ thể</label>
                                <input
                                  className={`block w-full outline-none border ${error?.ship_user_address ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5`}
                                  type="text"
                                  defaultValue={order?.ship_user_address}
                                  placeholder="Nhập địa chỉ cụ thể"
                                  onChange={(e) => setForm("ship_user_address", e.target.value)}
                                />
                                {error?.ship_user_address && (
                                  <p className="text-sm text-red-500">{error?.ship_user_address[0]}</p>
                                )}
                              </div>
                              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 mt-3">
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Ghi chú
                                  </label>
                                  <input
                                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                    type="text"
                                    onChange={(e) => setForm("user_note", e.target.value)}
                                    placeholder="Ghi chú"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      !token && (
                        <div id="hd-ShippingAddress" className="scroll-mt-24">
                          <div className="border border-slate-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 shadow-lg">
                            <div className="hd-body-ShippingAddress border-t border-slate-200 dark:border-neutral-600 px-6 py-7 space-y-6 sm:space-y-8">
                              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white border-b-2 border-gray-300 pb-2 mb-6">
                                Thông tin người nhận hàng
                              </h3>

                              {/* Dòng 1: Họ và tên, Địa chỉ cụ thể */}
                              <div className="sm:grid sm:grid-cols-2 sm:gap-6 space-y-1 sm:space-y-0">
                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Họ và tên</label>
                                  <input
                                    className={`block w-full outline-none border ${error?.ship_user_name ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white rounded-2xl h-11 px-4 py-3 mt-1.5`}
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    onChange={(e) => setForm("ship_user_name", e.target.value)}
                                  />
                                  {error?.ship_user_name && (
                                    <p className="text-sm text-red-500 mt-1">{error.ship_user_name[0]}</p>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Địa chỉ cụ thể</label>
                                  <input
                                    className={`block w-full outline-none border ${error?.ship_user_address ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white rounded-2xl h-11 px-4 py-3 mt-1.5`}
                                    type="text"
                                    placeholder="Nhập địa chỉ cụ thể"
                                    defaultValue={dataCheckout?.user?.address}
                                    onChange={(e) => setForm("ship_user_address", e.target.value)}
                                  />
                                  {error?.ship_user_address && (
                                    <p className="text-sm text-red-500 mt-1">{error?.ship_user_address[0]}</p>
                                  )}
                                </div>
                              </div>

                              {/* Dòng 2: Số điện thoại, Email */}
                              <div className="sm:grid sm:grid-cols-2 sm:gap-6 space-y-1 sm:space-y-0">
                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Số điện thoại</label>
                                  <input
                                    className={`block w-full outline-none border ${error?.ship_user_phonenumber ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white rounded-2xl h-11 px-4 py-3 mt-1.5`}
                                    type="text"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setForm("ship_user_phonenumber", e.target.value)}
                                  />
                                  {error?.ship_user_phonenumber && (
                                    <p className="text-sm text-red-500 mt-1">{error?.ship_user_phonenumber[0]}</p>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Email</label>
                                  <input
                                    className={`block w-full outline-none border ${error?.ship_user_email ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white rounded-2xl h-11 px-4 py-3 mt-1.5`}
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setForm("ship_user_email", e.target.value)}
                                  />
                                  {error?.ship_user_email && (
                                    <p className="text-sm text-red-500 mt-1">{error?.ship_user_email[0]}</p>
                                  )}
                                </div>
                              </div>

                              {/* Dòng 3: Thành phố */}
                              <div className="sm:flex sm:space-x-6 space-y-1 sm:space-y-0">
                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Thành phố</label>
                                  <Select
                                    labelInValue
                                    onChange={handleChangeTinh}
                                    showSearch
                                    optionFilterProp="children"
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.tinh ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white`}
                                  >
                                    {tinhThanh?.provinces?.map((e: any) => (
                                      <Option key={e?.ProvinceID} value={e?.ProvinceID}>
                                        {e?.ProvinceName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.tinh && (
                                    <p className="text-sm text-red-500 mt-1">{error?.tinh[0]}</p>
                                  )}
                                </div>
                              </div>

                              {/* Dòng 4: Quận huyện, Phường xã */}
                              <div className="sm:grid sm:grid-cols-2 sm:gap-6 space-y-1 sm:space-y-0">
                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Quận huyện</label>
                                  <Select
                                    labelInValue
                                    value={idQuanHuyen ? { value: idQuanHuyen } : ''}
                                    onChange={handleChangeQuanHuyen}
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.huyen ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white`}
                                  >
                                    {quanHuyen?.districts?.map((quan: any) => (
                                      <Option key={quan.DistrictID} value={quan.DistrictID}>
                                        {quan.DistrictName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.huyen && (
                                    <p className="text-sm text-red-500 mt-1">{error?.huyen[0]}</p>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <label className="text-base font-medium text-neutral-900 dark:text-neutral-100">Phường Xã</label>
                                  <Select
                                    labelInValue
                                    value={idXa ? { value: String(idXa) } : null}
                                    onChange={handleChangeXa}
                                    className={`hd-Select outline-none h-11 mt-1.5 block w-full text-sm rounded-2xl border ${error?.xa ? 'border-red-500' : 'border-neutral-200'} focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white`}
                                  >
                                    {phuongXa?.wards?.map((e: any) => (
                                      <Option key={e?.WardCode} value={`${e?.WardCode}`}>
                                        {e?.WardName}
                                      </Option>
                                    ))}
                                  </Select>
                                  {error?.xa && (
                                    <p className="text-sm text-red-500 mt-1">{error?.xa[0]}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    <div>
                      <label className="hd-Label text-lg font-semibold text-neutral-900">
                        Phương thức thanh toán
                      </label>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Thanh toán khi nhận hàng */}
                        <div className="flex items-center space-x-3 text-sm sm:text-base">
                          <div
                            className={`flex items-center border-2 rounded-lg p-3 transition-all duration-300 
             ${paymentMethhod == '1' ? 'border-[#0099B5] bg-[#A0E3F8]' : 'bg-transparent'}
             hover:border-[#0099B5] focus-within:bg-[#e3f0f1]`}
                          >
                            <Radio
                              value={'1'}
                              id="Address-type-home"
                              type="danger"
                              checked={paymentMethhod == '1'}
                              onChange={handleChangeMethod}
                            />
                            <FileDoneOutlined />
                            <label
                              htmlFor="Address-type-home"
                              className="text-slate-900 font-medium select-none pl-3"
                            >
                              Thanh toán khi nhận hàng
                            </label>
                          </div>
                        </div>
                        {/* Thanh toán online */}
                        <div className="flex items-center space-x-3 text-sm sm:text-base">
                          <div
                            className={`flex items-center border-2 rounded-lg p-3 transition-all duration-300 
          ${paymentMethhod == '2' ? 'border-[#0099B5] bg-[#A0E3F8]' : 'bg-transparent'} 
          hover:border-[#0099B5] focus-within:border-[#0099B5] focus-within:bg-[#e3f0f1]`}
                          >
                            <Radio
                              value={'2'}
                              id="Address-type-office"
                              checked={paymentMethhod == '2'}
                              onChange={handleChangeMethod}
                            />
                            <CreditCardOutlined />
                            <label
                              htmlFor="Address-type-office"
                              className="text-slate-900 font-medium select-none pl-3"
                            >
                              Thanh toán online
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*end hd-PaymentMethod*/}
                  </div>
                </div>
                {/*end-left*/}
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-8" />
                <div className="w-full lg:w-[42%] bg-white dark:bg-neutral-800 px-6 pb-5 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Đặt hàng</h3>
                  {
                    isLoading ? <Loading /> :
                      dataCheckout?.order_items.map((e: any) => (
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 my-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
                          {/* Product Image Section */}
                          <div className="relative h-32 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-neutral-600">
                            <img
                              alt={e?.product?.name || "Product Image"}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain object-center rounded-lg px-2"
                              src={e?.variant?.image ? e?.variant?.image : e?.product?.img_thumbnail}
                            />
                            <Link className="absolute inset-0" to="/product-detail" />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-col sm:flex-1">
                            <div>
                              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                <Link to="/product-detail" className="hover:text-[#00BADB]">
                                  {e?.product?.name}
                                </Link>
                              </h3>
                              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center">
                                {e?.variant?.attributes?.map((z: any, index: number) => (
                                  <span key={index} className="mr-2">
                                    {z.pivot.value}
                                    {index < e.variant.attributes.length - 1 && <span className="mx-2">/</span>}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Price and Quantity */}
                            <div className="mt-4 flex justify-between items-center">
                              {/* Quantity */}
                              <div className="text-sm text-slate-600 dark:text-slate-300 flex">
                                <span className="mr-2">Số lượng:  </span><p className="font-bold text-base pb-2">{e?.quantity}</p>
                              </div>

                              {/* Price */}
                              <div className="flex items-center space-x-2">
                                <span className="text-[red] font-semibold">
                                  {e?.variant?.price_sale ? FormatMoney(e.variant.price_sale) : FormatMoney(e?.product?.price_sale)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  }


                  {error?.quantity && (
                    <p className="text-sm text-red-500 mt-2">{error?.quantity[0]}</p>
                  )}
                  {/* <div className="hd-checkout-pro mt-8 divide-y divide-slate-200/70">
                  </div> */}
                  {/*end hd-checkout-pro*/}
                  <div className="mt-5 text-sm text-slate-500 border-t border-slate-200/70 dark:border-slate-700">
                    {token && (
                      <>
                        <div>
                          <label className="mt-5 pt-5 text-lg font-medium text-neutral-900">Mã giảm giá</label>
                          <div className="flex mt-2 space-x-4">
                            <Select
                              value={voucher}
                              onChange={(e) => setVoucher(e)}
                              className="hd-Select outline-0 h-9 w-[65%] text-sm rounded-2xl border border-neutral-300
                        focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-700 
                         dark:border-neutral-600 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25"
                            >
                              {dataCheckout?.listVoucher?.map((e: any) => (
                                <Option key={e.code} value={`${e.code}`}>
                                  {e?.title}
                                </Option>
                              ))}
                            </Select>
                            <div className="flex space-x-4 items-center justify-start">
                              <Button
                                onClick={() => handleVoucher()}
                                className="px-3  bg-[#00BADB] hover:bg-[#23b6cd] text-white rounded-md sm:w-auto max-w-[160px] transition duration-200 ease-in-out"
                              >
                                Áp dụng
                              </Button>
                              <Button
                                onClick={() => handleCancelVoucher()}
                              // className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl w-full sm:w-auto max-w-[160px] transition duration-200 ease-in-out"
                              >
                                Huỷ
                              </Button>
                            </div>

                          </div>
                        </div>
                        <div className="flex justify-between py-3 mt-4 border-t border-t-neutral-200">
                          <span className="text-neutral-800">Voucher</span>
                          <span className="font-semibold text-neutral-900">
                            {totalDiscount !== undefined ? FormatMoney(totalDiscount) : FormatMoney(0)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between py-3 mt-4 border-t border-t-neutral-200">
                      <span className="text-neutral-800">Phí ship</span>
                      <span className="font-semibold text-neutral-900">
                        {FormatMoney(Number(shiping)) ? FormatMoney(Number(shiping)) : FormatMoney(Number(21000))}
                      </span>
                    </div>

                    <div className="flex justify-between py-3 mt-6 font-semibold text-lg text-slate-900 border-t border-t-neutral-300">
                      <span>Tổng tiền</span>
                      <span>
                        {FormatMoney((subTotal || dataCheckout?.sub_total || 0) + (Number(shiping) || 0))}
                      </span>
                    </div>
                  </div>

                  {/*end hd-checkout-text-count*/}
                  <button onClick={handleOrder} className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#00BADB] hover:bg-[#23b6cd] text-white shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Xác nhận đơn hàng
                  </button>
                  {/*end hd-checkout-btn*/}
                  <div className="hd-checkout-text-note mt-5 text-sm text-slate-500 flex items-center justify-center">
                    <p className="block relative pl-5">
                      <CheckoutIcon22 />
                      Tìm hiểu thêm thông tin về
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to="##"
                        className="text-slate-900 underline font-medium"
                      >
                        Thuế
                      </Link>
                      <span> và </span>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to="##"
                        className="text-slate-900 underline font-medium"
                      >
                        Vận chuyển
                      </Link>
                    </p>
                  </div>
                  {/*end hd-checkout-text-note*/}
                </div>
                {/*end-right*/}
              </div>
            }
          </main>
        </div>
        {/*end hd-CheckoutPage*/}
      </main>
      <ModalAddress title="Thông tin địa chỉ" open={visible} onClose={handleCloseModal} dataCheckout={dataCheckout} onHandleOk={handleSaveDiaChi} />
    </>
  );
};

export default Checkout;