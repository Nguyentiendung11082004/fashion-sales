import { HeroRight, Icon1, Product2 } from "@/components/icons";
import ButtonSubmit from "@/components/icons/about/ButtonSubmit";
import React from "react";

const About = () => {
  return (
    <>
      <div>
        <div className="hd-PageAbout overflow-hidden relative">
          <div
            className="hd-BgGlassmorphism absolute inset-x-0 md:top-10 min-h-0 pl-20 py-24 flex overflow-hidden z-0"
            data-nc-id="BgGlassmorphism"
          >
            <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96" />
            <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000" />
          </div>
          <div className="hd-page-head">
            <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
              <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
                <div className="z-[100] relative hd-container text-white">
                  <h1 className="text-xl font-medium leading-5 mb-3">
                    Giới thiệu
                  </h1>
                  <p className="text-sm">
                    Hãy theo đuổi đam mê, thành công sẽ theo đuổi bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hd-page-body-content container py-10 lg:py-20 space-y-16 lg:space-y-28">
            <div className="hd-SectionTop relative " data-nc-id="SectionHero">
              <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
                <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
                  <h2 className="text-2xl !leading-tight font-semibold text-neutral-900 md:text-3xl xl:text-4xl ">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        👋 Về chúng tôi.
                      </span>
                    </span>
                  </h2>
                  <span className="block text-sm xl:text-base hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Chúng tôi vô tư và độc lập, đồng thời mỗi ngày chúng tôi
                        tạo ra các chương trình và nội dung đặc biệt, nhằm cung
                        cấp thông tin, mua sắm và giải trí cho hàng triệu người
                        trên khắp thế giới.
                      </span>
                    </span>
                  </span>
                </div>
                <div className="flex-grow">
                  <img
                    fetchPriority="high"
                    width={1450}
                    height={638}
                    decoding="async"
                    data-nimg={1}
                    className="w-[5300px] relative -right-40"
                    srcSet="
          "
                    src={HeroRight}
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
            {/*end hd-SectionTop*/}
            <div className="hd-SectionPeople relative -top-14">
              <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-0 lg:mb-14 text-neutral-900 text-center lg:text-left">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        ⛱ Người sáng lập
                      </span>
                    </span>
                  </h2>
                  <span className="mt-2 md:mt-3 font-normal block text-sm sm:text-base hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Chúng tôi vô tư và độc lập, đồng thời mỗi ngày chúng tôi
                        tạo ra các chương trình và nội dung mua sắm thú vị, đặc
                        biệt
                      </span>
                    </span>
                  </span>
                  <span className="block text-sm sm:text-lg hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Đồng sáng lập &amp; Điều hành
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-2 gap-y-5 lg:grid-cols-7 xl:gap-x-5 mx-[80px] lg:mx-auto">
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      src=""
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Trung Đức
                      </span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      src="./images/z6080913682718_0437356e59304fbfb80754b6b07df34c.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Tiến Dũng
                      </span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      srcSet="
              "
                      src="./images/z5513883787421_7d1f10db8a5171d1da722feb02185edd.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>Thu Hằng</span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      srcSet="
              "
                      src="./images/z6080902480848_00dba82ce951d41b5cbd2cdf379607a8.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Công Trang
                      </span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      srcSet="
              "
                      src="./images/iamgeKimHue.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>Kim Huệ</span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      srcSet="
              "
                      src="./images/z6080904489132_be65fadd49e6806784032537c238ad3f.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Mạnh Cường
                      </span>
                    </span>
                  </h3>
                </div>
                <div className="max-w-sm">
                  <div className="relative h-0 lg:pb-[300px] rounded-xl overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="absolute inset-0 object-cover hidden lg:block"
                      sizes="300px"
                      srcSet="
              "
                      src="./images/z6080907305180_9095ebc9d001ef6aae02f629b373af48.jpg"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 lg:mt-4 md:text-xl text-center">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Phan Quyết
                      </span>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            {/*end hd-SectionPeople*/}
            <div className="hd-SectionStatus relative">
              <div className="hd-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        🚀 Thông tin
                      </span>
                    </span>
                  </h2>
                  <span className="mt-2 md:mt-3 font-normal block text-sm sm:text-base hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Chúng tôi vô tư và độc lập, đồng thời mỗi ngày chúng tôi
                        tạo ra các chương trình và nội dung mua sắm thú vị, đặc
                        biệt
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                <div className="p-6 bg-neutral-50 rounded-2xl dark:border-neutral-800">
                  <h3 className="text-xl font-semibold leading-none text-neutral-900 md:text-2xl">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>10 triệu</span>
                    </span>
                  </h3>
                  <span className="block text-sm mt-3 sm:text-sm hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Bài viết đã được công khai trên toàn thế giới (tính đến
                        ngày 30 tháng 7 năm 2024)
                      </span>
                    </span>
                  </span>
                </div>
                <div className="p-6 bg-neutral-50 rounded-2xl dark:border-neutral-800">
                  <h3 className="text-xl font-semibold leading-none text-neutral-900 md:text-2xl">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>100.000</span>
                    </span>
                  </h3>
                  <span className="block text-sm mt-3 sm:text-sm hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Tài khoản người dùng đã đăng ký (tính đến ngày 30 tháng
                        9 năm 2024)
                      </span>
                    </span>
                  </span>
                </div>
                <div className="p-6 bg-neutral-50 rounded-2xl dark:border-neutral-800">
                  <h3 className="text-xl font-semibold leading-none text-neutral-900 md:text-2xl">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>220+</span>
                    </span>
                  </h3>
                  <span className="block text-sm mt-3 sm:text-sm hd-all-textgrey">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Các quốc gia và khu vực có sự hiện diện của chúng tôi
                        (tính đến ngày 30 tháng 9 năm 2024)
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/*end hd-SectionStatus*/}
            <div className="hd-SectionVoucher">
              <div className="relative flex flex-col lg:flex-row bg-slate-50 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
                <div className="absolute inset-0">
                  <img
                    alt="backgroundLineSvg"
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="absolute w-full h-full object-contain object-bottom"
                    src={Icon1}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      inset: 0,
                      color: "transparent",
                    }}
                  />
                </div>
                <div className="lg:w-[50%] max-w-lg relative">
                  <h2 className="font-semibold text-2xl md:text-3xl">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Đừng bỏ lỡ các ưu đãi đặc biệt
                      </span>
                    </span>
                  </h2>
                  <span className="block mt-5 hd-all-textgrey text-sm">
                    <span style={{ verticalAlign: "inherit" }}>
                      <span style={{ verticalAlign: "inherit" }}>
                        Đăng ký để nhận tin tức mới nhất, các chương trình
                        khuyến mại, mã giảm giá...
                      </span>
                    </span>
                  </span>
                  <ul className="space-y-4 mt-10">
                    <li className="flex items-center space-x-4">
                      <span className="hd-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-purple-800 bg-purple-100">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>01</span>
                        </span>
                      </span>
                      <span className="font-medium text-neutral-700 text-sm">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>
                            Combo tiết kiệm
                          </span>
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <span className="hd-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-blue-800 bg-blue-100 relative">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>02</span>
                        </span>
                      </span>
                      <span className="font-medium text-neutral-700 text-sm">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>
                            Miễn phí vận chuyển
                          </span>
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <span className="hd-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-red-800 bg-red-100 relative">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>03</span>
                        </span>
                      </span>
                      <span className="font-medium text-neutral-700 text-sm">
                        <span style={{ verticalAlign: "inherit" }}>
                          <span style={{ verticalAlign: "inherit" }}>
                            Tạp chí cao cấp
                          </span>
                        </span>
                      </span>
                    </li>
                  </ul>
                  <form className="mt-10 relative max-w-sm">
                    <input
                      className="block w-full outline-0 border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-full text-sm font-normal h-11 px-4 py-3"
                      required
                      aria-required="true"
                      placeholder="Nhập email của bạn"
                      type="email"
                    />
                    <button
                      className="ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-[#00BADB] hover:bg-[#00b0cf] text-slate-50 absolute transform top-1/2 -translate-y-1/2 right-1 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                      type="submit"
                    >
                      <ButtonSubmit />
                    </button>
                  </form>
                </div>
                <div className="relative lg:block lg:absolute lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)] hidden">
                  <img
                    loading="lazy"
                    width={450}
                    height={824}
                    decoding="async"
                    data-nimg={1}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    srcSet="
          "
                    src={Product2}
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
            {/*end hd-SectionVoucher*/}
          </div>
          {/*end hd-page-body-content*/}
        </div>
      </div>
    </>
  );
};

export default About;
