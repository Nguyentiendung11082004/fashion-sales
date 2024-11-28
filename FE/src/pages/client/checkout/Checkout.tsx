import Loading from "@/common/Loading/Loading";
import { useAuth } from "@/common/context/Auth/AuthContext";
import { FormatMoney } from "@/common/utils/utils";
import CheckoutIcon22 from "@/components/icons/checkout/CheckoutIcon22";
import Completed from "@/components/icons/checkout/Completed";
import Map from "@/components/icons/checkout/Map";
import instance from "@/configs/axios";
import { CreditCardOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Radio, Select } from "antd";
import { createContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAddress from "./_components/Address";
export const ContextCheckout = createContext({});
const Checkout = () => {
  const { Option } = Select;
  const { token } = useAuth();
  const queryClient = useQueryClient()
  const location = useLocation();
  const navigate = useNavigate();
  const savedCartIds = localStorage.getItem('cartIds');
  const cartIds = location.state?.cartIds || (savedCartIds ? JSON.parse(savedCartIds) : []);
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
  const mutationVoucher = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/checkout`, {
        cart_item_ids: cartIds,
        voucher_code: voucher,
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
  const handleChangeMethod = (e: any) => {
    const newPaymentMethod = e.target.value;
    setPaymentMethod(newPaymentMethod);
    setOrder((prev) => ({
      ...prev,
      payment_method_id: newPaymentMethod,
    }));
  };
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
    ship_user_address: '',
    shipping_method: paymentMethhod,
    voucher_code: voucher,
    cart_item_ids: cartIds || [],
    quantityOfCart: quantityOfCart || {},
    product_id: _payload?.product_id || null,
    product_variant_id: _payload?.product_variant_id || null,
    quantity: _payload?.quantity || null,

  });
  const orderMutation = useMutation({
    mutationFn: async () => {
      console.log("order", order)
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
      localStorage.removeItem('cartIds')
      localStorage.removeItem('checkedItems');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    }
  });
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
    })),
      setIdTinh(Number(e.value));
    setShipPing('')
    setIdQuanHuyen(null)
    setIdXa(null)
  };
  const handleChangeQuanHuyen = (e: any) => {
    setOrder((prev: any) => ({
      ...prev,
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
    setIdXa(Number(e.value));
  };

  const handleOpenModal = () => {
    setVisible(true)
  }
  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleSaveDiaChi = (dataIdAddress: any) => {
    setVisible(false)
    setPayLoadDiaChi(dataIdAddress)
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
  const getShipp = async () => {
    // if (!(payloadDiaChi?.ward && payloadDiaChi?.district) || !(idXa && idQuanHuyen)) {
    //   console.log("1")
    //   return; // Dừng lại nếu không có đủ thông tin
    // }
    // setIsLoading(true);
    try {
      setTimeout(async () => {
        // Tiến hành các bước tính toán phí vận chuyển
        let weight = dataCheckout?.order_items?.map((e: any) => Number(e.product.weight));
        let totalWeight = weight?.reduce((sum: any, currentWeight: any) => sum + currentWeight, 0);
        let toWardCode = payloadDiaChi?.ward?.id || idXa;
        let toDistrictId = payloadDiaChi?.district?.id || idQuanHuyen;
        let res = await instance.post(`/calculateshippingfee`, {
          to_ward_code: String(toWardCode),
          to_district_id: Number(toDistrictId),
          weight: totalWeight
        });
        setShipPing(res?.data?.fee?.total); // Cập nhật phí vận chuyển
      }, 2000);
    } catch (error) {
      console.error("Error calculating shipping fee", error); // In lỗi nếu có
    }
  };
  useEffect(() => {
    if (dataCheckout && dataCheckout.user) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        ship_user_email: dataCheckout.user.email || '',
        ship_user_name: dataCheckout.user.name || '',
        ship_user_phonenumber: dataCheckout.user.phone_number || '',
        ship_user_address: dataDiaChi[0]?.address || '',
        tinh: dataDiaChi[0]?.city?.name || '',
        huyen: dataDiaChi[0]?.district?.name || '',
        xa: dataDiaChi[0]?.ward?.name || '',
        quantityOfCart: quantityOfCart,
      }));
    }
  }, [dataCheckout]);
  useEffect(() => {
    if (!_payload) {
      return;
    }
  })
  const handleBuyCart = async () => {
    let payload = { cart_item_ids: cartIds };
    if (cartIds.length > 0) {
      try {
        setIsLoading(true);
        console.log("1")
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
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
  useEffect(() => {
    handleBuyNow()
  }, [_payload, payloadDiaChi])
  useEffect(() => {
    handleBuyCart()
  }, [payloadDiaChi]);
  useEffect(() => {
    if (payloadDiaChi && payloadDiaChi.district && payloadDiaChi.ward) {
      getShipp();
    }
    else if (idQuanHuyen && idXa) {
      getShipp();
    }
  }, [_payload, payloadDiaChi, idXa, idQuanHuyen]);

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
          <main className="container py-16 lg:pb-28 lg:pt-20">
            {
              // isLoading ? <Loading /> :
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                  <div className="space-y-8">
                    <div id="hd-ContactInfo" className="scroll-mt-24">
                      <div className="border border-slate-200 rounded-xl overflow-hidden z-0">
                        {
                          token && <div className="flex flex-col sm:flex-row items-start p-6">
                            <span className="hidden sm:block mt-4 ">
                              <Map />
                            </span>
                            <div className="sm:ml-4">
                              <h3 className="text-black flex">
                                <span className="uppercase tracking-tight">
                                  Địa chỉ nhận hàng
                                </span>
                                <Completed />
                              </h3>
                              <div className="font-semibold mt-1 text-sm">
                                <span>{dataCheckout?.user?.name}</span>
                                <span className="ml-3 tracking-tighter">
                                  {dataCheckout?.user?.phone_number}
                                </span>
                              </div>
                              <div className="mt-2">
                                {
                                  dataDiaChi?.map((e: any) => {
                                    const addressParts = [
                                      e?.address,
                                      e?.ward?.name,
                                      e?.district?.name,
                                      e?.city?.name
                                    ];
                                    const fullAddress = addressParts.filter(Boolean).join(' - ');
                                    return <div key={e.id}>{fullAddress}</div>;
                                  })
                                }


                              </div>

                            </div>
                            <button onClick={handleOpenModal} className="py-2 px-4 bg-slate-50 hover:bg-slate-100 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                              Thay đổi
                            </button>
                          </div>
                        }
                        {/* <button onClick={handleOpenModal} className="py-2 px-4 bg-slate-50 hover:bg-slate-100 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                           Địa chỉ nhận hàng
                        </button> */}
                        <div className="hd-no-account border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 hidden">
                          <div className="flex justify-between flex-wrap items-baseline">
                            <h3 className="text-lg font-semibold">
                              Thông tin liên lạc
                            </h3>
                            <span className="block text-sm my-1 md:my-0">
                              Bạn chưa có tài khoản?
                              <Link
                                to="##"
                                className="text-primary-500 font-medium"
                              >
                                Đăng nhập
                              </Link>
                            </span>
                          </div>
                          <div className="max-w-lg">
                            <label
                              className="nc-Label font-medium text-neutral-900 text-sm"
                              data-nc-id="Label"
                            >
                              Số điện thoại
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="text"
                              defaultValue="+84 xxx"
                            />
                          </div>
                          <div className="max-w-lg">
                            <label
                              className="nc-Label font-medium text-neutral-900 text-sm"
                              data-nc-id="Label"
                            >
                              Email
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                                 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 
                                 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                                  focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="email"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row pt-6">
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 sm:!px-7 shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Lưu &amp; Tiếp tục mua sắm
                            </button>
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 mt-3 sm:mt-0 sm:ml-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="hd-ShippingAddress" className="scroll-mt-24">
                      <div className="border border-slate-200 rounded-xl">
                        <div className="hd-body-ShippingAddress border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 block">
                          {
                            !token &&
                            <>
                              <h3 >Thông tin người nhận hàng</h3>
                              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Họ và tên
                                  </label>
                                  <input
                                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                           focus:ring focus:ring-primary-200 focus:ring-opacity-50
                            bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25
                             dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                              focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    onChange={(e) => setForm("ship_user_name", e.target.value)}
                                  />
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Địa chỉ cụ thể
                                  </label>
                                  <input
                                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                           focus:ring focus:ring-primary-200 focus:ring-opacity-50
                            bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25
                             dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                              focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    onChange={(e) => setForm("ship_user_address", e.target.value)}
                                  />
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Số điện thoaị
                                  </label>
                                  <input
                                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                           focus:ring focus:ring-primary-200 focus:ring-opacity-50
                            bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25
                             dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                              focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setForm("ship_user_phonenumber", e.target.value)}
                                  />
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Email
                                  </label>
                                  <input
                                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                           focus:ring focus:ring-primary-200 focus:ring-opacity-50
                            bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25
                             dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                              focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setForm("ship_user_email", e.target.value)}
                                  />
                                </div>
                              </div>
                              {/* chọn đia chỉ */}
                              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Thành Phố
                                  </label>
                                  <Select
                                    labelInValue
                                    onChange={handleChangeTinh}
                                    showSearch
                                    optionFilterProp="children"
                                    className="hd-Select outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                      tinhThanh?.provinces?.map((e: any) => (
                                        <Option value={e?.ProvinceID}>{e?.ProvinceName}</Option>
                                      ))
                                    }
                                  </Select>
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Quận huyện
                                  </label>
                                  <Select
                                    labelInValue
                                    value={idQuanHuyen ? { value: idQuanHuyen } : ''}
                                    onChange={handleChangeQuanHuyen} className="hd-Select  outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                      quanHuyen?.districts?.map((quan: any) => (
                                        <Option key={quan.DistrictID} value={quan.DistrictID}>
                                          {quan.DistrictName}
                                        </Option>
                                      ))
                                    }
                                    <option value=""></option>
                                  </Select>
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="hd-Label text-base font-medium text-neutral-900"
                                    data-nc-id="Label"
                                  >
                                    Phường Xã
                                  </label>
                                  <Select
                                    labelInValue
                                    value={idXa ? { value: String(idXa) } : null}
                                    onChange={handleChangeXa}
                                    className="hd-Select outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                      phuongXa?.wards?.map((e: any) => (
                                        <Option key={e?.WardCode} value={`${e?.WardCode}`}>{e?.WardName}</Option>
                                      ))
                                    }
                                  </Select>
                                </div>
                              </div>
                            </>
                          }




                          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
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
                        {/*end hd-body-ShippingAddress*/}
                      </div>
                    </div>
                    {/*end hd-ShippingAddress*/}
                    <div>
                      <label
                        className="hd-Label text-lg font-semibold text-neutral-900"
                        data-nc-id="Label"
                      >
                        Phương thức thanh toán
                      </label>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex items-center space-x-3 text-sm sm:text-base">
                          <div className={`flex items-center border-2 rounded-lg p-2 transition-all 
                              ${paymentMethhod == '1' ? 'border-[#0099B5] ' : ' bg-transparent'} 
                                 hover:border-slate-600  focus-within:bg-[#e3f0f1]`}>
                            <Radio value={'1'}
                              id="Address-type-home"
                              type="danger"
                              checked={paymentMethhod == '1'}
                              onChange={handleChangeMethod}
                            ></Radio>
                            <FileDoneOutlined />
                            <label
                              htmlFor="Address-type-home"
                              className="text-slate-900 font-medium select-none pl-2.5"
                            >
                              Thanh toán khi nhận hàng
                            </label>
                          </div>
                        </div>
                        {/* Thanh toán online */}
                        <div className="flex items-center space-x-3 text-sm sm:text-base">
                          <div className={`flex items-center border-2 rounded-lg p-2 transition-all 
                            ${paymentMethhod == '2' ? 'border-[#0099B5] bg-[#A0E3F8]' : ' bg-transparent'} 
                            hover:border-slate-600 focus-within:border-[#0099B5] focus-within:bg-[#e3f0f1]`}>
                            <Radio value={'2'}
                              id="Address-type-office"
                              checked={paymentMethhod == '2'}
                              onChange={handleChangeMethod}
                            ></Radio>
                            <CreditCardOutlined />
                            <label
                              htmlFor="Address-type-office"
                              className="text-slate-900 font-medium select-none pl-2.5"
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
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
                <div className="w-full lg:w-[36%]">
                  <h3 className="text-lg font-semibold mb-4">Đặt hàng</h3>
                  {
                    // isLoading ? <Loading /> :
                    dataCheckout?.order_items.map((e: any) => (
                      <>
                        <div className="relative flex  first:pt-0 last:pb-0">
                          <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden  ">
                            <img
                              alt={e?.product?.name || "Product Image"}
                              loading="lazy"
                              decoding="async"
                              data-nimg="fill"
                              className="w-full object-contain object-center rounded-xl"
                              sizes="150px"
                              src={e?.variant?.image ? e?.variant?.image : e?.product?.img_thumbnail}

                            />
                            <Link className="absolute inset-0" to="/product-detail" />
                          </div>
                          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <div className="">
                                  <h3 className="text-base font-semibold">
                                    <Link to="/product-detail">
                                      {e?.product?.name}
                                    </Link>
                                  </h3>
                                  <div className="mt-1.5  flex text-sm text-slate-600">
                                    <div className="flex items-center ">

                                      {
                                        e?.variant?.attributes?.map((z: any, index: number) => (
                                          <span >
                                            {z.pivot.value}
                                            {index < e.variant.attributes.length - 1 && <span className="mx-2">/</span>}
                                          </span>
                                        ))
                                      }
                                    </div>


                                  </div>
                                  <div className="mt-3 flex justify-between w-full sm:hidden relative">
                                    <select
                                      name="qty"
                                      id="qty"
                                      className="form-select text-sm rounded-md py-1 border-slate-200 relative z-10"
                                    >
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                    </select>
                                    <div>
                                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                                        <span className="text-green-500 !leading-none">
                                          $74
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/*end-form-change-qty*/}
                                </div>
                                <div className="hidden flex-1 sm:flex justify-end">
                                  <div className="mt-[1.7px]">
                                    <div className="flex items-center text-sm font-medium">
                                      {/* <del className="mr-1">{FormatMoney(e.variant.price_regular)}</del> */}
                                      <span className="text-[red]">{e?.variant?.price_sale ? FormatMoney(e.variant.price_sale) : FormatMoney(e?.product?.price_sale)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-end mt-6 justify-between text-sm">
                              <div className="hidden sm:block text-center relative">
                                <div className="flex items-center">
                                  <span>Số lượng:  </span><p className="font-bold ml-2 text-base">{e?.quantity}</p>
                                </div>
                              </div>
                              <Link
                                to="##"
                                className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                              >

                              </Link>
                            </div>
                          </div>
                        </div>

                      </>
                    ))}

                  <div className="hd-checkout-pro mt-8 divide-y divide-slate-200/70">


                  </div>
                  {/*end hd-checkout-pro*/}
                  <div className="hd-checkout-text-count mt-10 pt-6 text-sm text-slate-500 border-t border-slate-200/70 dark:border-slate-700">
                    {
                      token && <>
                        <div>
                          <label
                            className="nc-Label text-base font-medium text-neutral-900"
                            data-nc-id="Label"
                          >
                            Mã giảm giá
                          </label>
                          <div className="flex mt-1.5">
                            <Select
                              onChange={(e) => setVoucher(e)}
                              className="hd-Select outline-0 h-11 mt-1.5 block w-[80%] text-sm rounded-2xl border border-neutral-200
                             focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50
                              dark:focus:ring-primary-6000 dark:focus:ring-opacity-25"
                            >
                              {
                                dataCheckout?.listVoucher
                                  ?.map((e: any) => (
                                    <Option value={`${e.code}`}>
                                      {e?.title}
                                    </Option>
                                  ))
                              }
                            </Select>
                            <button onClick={() => handleVoucher()} className="ml-5 bg-[#00BADB] hover:bg-[#23b6cd] text-white rounded-lg my-2 p-2">
                              Áp dụng
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span>Voucher</span>
                          <span className="font-semibold text-slate-900"> {totalDiscount !== undefined ? FormatMoney(totalDiscount) : FormatMoney(0)}</span>
                        </div>
                      </>
                    }
                    <div className="flex justify-between py-2.5 mt-2">
                      <span>Phí ship</span>
                      <span className="font-semibold text-slate-900">{FormatMoney(Number(shiping)) || 0}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
                      <span>Tổng tiền</span>
                      <span>
                        {FormatMoney(
                          (subTotal || dataCheckout?.sub_total || 0) + (Number(shiping) || 0)
                        )}
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