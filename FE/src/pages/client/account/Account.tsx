import { useAuth } from "@/common/context/Auth/AuthContext";
import { useUser } from "@/common/context/User/UserContext";
import { IUser } from "@/common/types/users";
import AddImage from "@/components/icons/about/AboutInfo";
import Address from "@/components/icons/account/Address";
import DateBirth from "@/components/icons/account/DateBirdth";
import Email from "@/components/icons/account/Email";
import Phone from "@/components/icons/account/Phone";
import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const Account = () => {
  const { user, urlImage, setUrlImage } = useUser();
  const dataUser = user?.InforUser;
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string | undefined>(dataUser?.name);
  const [tempEmail, setTempEmail] = useState<string | undefined>(
    dataUser?.email
  );
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // State lưu trữ thông tin người dùng
  const [formData, setFormData] = useState<Partial<IUser>>({
    name: dataUser?.name || "",
    email: dataUser?.email || "",
    phone_number: dataUser?.phone_number || "",
    address: dataUser?.address || "",
    birth_date:
      dataUser?.birth_date instanceof Date
        ? dataUser.birth_date.toISOString().split("T")[0]
        : dataUser?.birth_date || "",
    gender: dataUser?.gender ?? undefined,
    avatar: dataUser?.avatar || "",
  });

  // Xử lý khi thay đổi giá trị input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "gender"
          ? value === "Nam"
          : name === "birth_date"
            ? value
            : value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (newUserData: Partial<IUser>) => {
      const res = await instance.put("/user/update ", newUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Dữ liệu người dùng sau khi cập nhật:", data);
      queryClient.invalidateQueries({ queryKey: ["user", token] });
      toast.success("Cập nhật thành công");
      // Cập nhật tên, email và avatar trong bộ nhớ đệm
      queryClient.setQueryData(["user", token], (oldData: any) => {
        if (!oldData || !oldData["Infor User"]) return oldData; // kiểm tra dữ liệu tồn tại
        return {
          ...oldData,
          "Infor User": {
            ...oldData["Infor User"],
            avatar: newAvatar,
            name: formData.name, // cập nhật name mới
            email: formData.email, // cập nhật email mới
          },
        };
      });

      setTempName(formData.name);
      setTempEmail(formData.email);

      if (newAvatar) {
        setUrlImage(newAvatar);
      }
    },
    onError: (error: any) => {
      if (error?.response && error?.response.data.errors) {
        setErrors(error?.response.data.errors); // Lưu lỗi vào trạng thái
      }
      toast.success("Cập nhật thất bại");
      console.error("Có lỗi xảy ra:", error);
    },
  });

  // Mutation để upload ảnh lên Cloudinary
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload-img");
      formData.append("folder", "upload-img");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dijxcfiff/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload ảnh thất bại");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setNewAvatar(data.url);
      toast.success("Tải ảnh lên thành công");
    },
    onError: (error) => {
      toast.error("Tải ảnh lên thất bại");
      console.error("Lỗi tải ảnh:", error);
    },
  });
  // console.log("User data:", user);
  // console.log("Current urlImage:", urlImage);

  // Xử lý khi chọn file ảnh
  const handleFileChange = (info: any) => {
    const file = info.target.files[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  // Hàm xử lý submit form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Dữ liệu sẽ được cập nhật:", formData);
    const newData = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      birth_date: formData.birth_date,
      gender: formData.gender, // (true = Nam, false = Nữ)
      avatar: newAvatar,
    };
    mutation.mutate({ ...newData, avatar: newAvatar as string | undefined });
  };

  return (
    <main
      id="main-content"
      className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
    >
      <div className="hd-page-head">
        <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
          <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
            <div className="z-[100] relative hd-container">
              <h1 className="text-white text-xl font-medium leading-5">
                Tài khoản
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/*end hd-page-head*/}
      <div className="hd-account-body max-w-5xl w-full mx-auto px-4 text-[14px] lg:my-[80px] my-[50px]">
        <div className="hd-account-head">
          <div className="max-w-auto">
            <div className="max-w-[42rem]">
              <span className="hd-all-textgrey block mt-4">
                <span className="text-black font-semibold">
                  {tempName || dataUser?.name}
                </span>
                <span className="mx-2">{tempEmail || dataUser?.email}</span>
              </span>
            </div>
            <hr className="mt-[1rem] h-0 border-solid border-b-2" />
            <div className="hd-account-menu overflow-x-auto flex uppercase font-medium ">
              <Link
                to="/account"
                className={`${
                  isActive("/account")
                    ? "block w-1/4 lg:text-left text-center flex-shrink-0 py-[1.5rem] leading-4 relative border-b-[3px] border-[#00BADB]"
                    : "hd-account-menu-item "
                }`}
              >
                Thông tin tài khoản
              </Link>
              <Link
                to="/wishlist"
                className={`${
                  isActive("/wishlist")
                    ? "block w-1/4 lg:text-left text-center flex-shrink-0 py-[1.5rem] leading-4 relative border-b-[3px] border-[#00BADB]"
                    : "hd-account-menu-item "
                }`}
              >
                Yêu thích
              </Link>
              <Link
                to="/history-order"
                className={`${
                  isActive("/history-order")
                    ? "block w-1/4 lg:text-left text-center flex-shrink-0 py-[1.5rem] leading-4 relative border-b-[3px] border-[#00BADB]"
                    : "hd-account-menu-item "
                }`}
              >
                Lịch sử mua hàng
              </Link>
              <Link
                to="/password/reset"
                className={`${
                  isActive("/password/reset")
                    ? "block w-1/4 lg:text-left text-center flex-shrink-0 py-[1.5rem] leading-4 relative border-b-[3px] border-[#00BADB]"
                    : "hd-account-menu-item "
                }`}
              >
                Đổi mật khẩu
              </Link>
            </div>
            <hr className="h-0 border-solid border-b-2" />
          </div>
        </div>
        {/*end hd-account-head*/}
        <div className="hd-account-content pt-[30px] mx-auto">
          <div className="hd-ct-text">
            <h2 className="lg:mb-[50px] mb-[30px] lg:mt-[25px] lg:text-2xl text-xl font-semibold uppercase">
              Thông tin tài khoản
            </h2>
            <div className="lg:flex">
              <div className="lg:w-1/4 items-start flex-shrink-0 flex mb-[25px] justify-center lg:justify-start">
                <div className="rounded-full overflow-hidden flex relative text-white">
                  <img
                    alt="avatar"
                    loading="lazy"
                    width={128}
                    height={128}
                    decoding="async"
                    data-nimg={1}
                    className="w-32 h-32 rounded-full object-cover z-0"
                    src={newAvatar || urlImage || dataUser?.avatar}
                    style={{ color: "transparent" }}
                  />
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-35">
                    <AddImage />
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/*end item-start*/}
              <form onSubmit={handleSubmit} className="lg:w-3/4 max-w-full">
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Họ tên
                  </label>

                  <input
                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Email
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-envelope">
                        <Email />
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      name="email"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email[0]}
                    </span>
                  )}
                </div>

                <div className="max-w-lg mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Ngày sinh
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-calendar">
                        <DateBirth />
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      type="date"
                      name="birth_date"
                      value={
                        typeof formData.birth_date === "string"
                          ? formData.birth_date
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-envelope">
                        <Address />
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      value={formData.address}
                      onChange={handleChange}
                      type="text"
                      name="address"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Giới tính
                  </label>
                  <select
                    className="nc-Select h-11 mt-1.5 px-[10px] block w-full outline-0 rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50"
                    value={formData.gender ? "Nam" : "Nữ"}
                    onChange={handleChange}
                    name="gender"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-phone-volume">
                        <Phone />
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      value={formData.phone_number}
                      onChange={handleChange}
                      type="text"
                      name="phone_number"
                    />
                  </div>
                  {errors.phone_number && (
                    <span className="text-red-500 text-sm">
                      {errors.phone_number[0]}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Về bạn
                  </label>
                  <textarea
                    className="block w-full outline-0 px-[10px] rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 mt-1.5"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="text-base mt-10 bg-[#00BADB] h-[50px] w-auto px-[45px] font-semibold rounded-full text-white inline-flex items-center relative overflow-hidden hover:bg-[#23b6cd] transition-all ease-in-out duration-300"
                >
                  Cập nhật
                </button>
              </form>
              {/*end item-end*/}
            </div>
          </div>
        </div>
        {/*end hd-account-content*/}
      </div>
      {/*end hd-account-body*/}
    </main>
  );
};

export default Account;
