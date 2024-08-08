import { Facebook, Telegram, Twitter, Youtube } from "@/components/icons";
import React from "react";
import { Link } from "react-router-dom";
import Email from "@/components/icons/account/Email";
import Phone from "@/components/icons/account/Phone";

const Contact = () => {
  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Liên hệ
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-page-head*/}
        <div className="hd-se_contact_map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8939060848147!2d144.81158271584684!3d-37.74563313792195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65fa6debeb781%3A0xe1d23f5d1759961e!2s184%20Main%20Rd%20E%2C%20St%20Albans%20VIC%203021%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1618277125252!5m2!1svi!2s"
            width="100%"
            height={450}
            className=" lg:block hidden"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8939060848147!2d144.81158271584684!3d-37.74563313792195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65fa6debeb781%3A0xe1d23f5d1759961e!2s184%20Main%20Rd%20E%2C%20St%20Albans%20VIC%203021%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1618277125252!5m2!1svi!2s"
            width="100%"
            height={225}
            className="block lg:hidden"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        {/*end hd-contact-map*/}
        <div className="max-w-5xl w-full px-4 text-[14px] mx-auto lg:my-[80px] my-[30px]">
          <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="max-w-sm space-y-8 lg:block hidden">
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>🗺 ĐỊA CHỈ</span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      Trịnh Văn Bô, Bắc Từ Liêm, Hà Nội, Việt Nam
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>💌 EMAIL</span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      nc.example@example.com
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      ☎ ĐIỆN THOẠI
                    </span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      0921 735 576
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <nav className="nc-SocialsList flex gap-2 text-2xl text-neutral-6000 dark:text-neutral-300 mt-2">
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Facebook}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Twitter}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Youtube"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={135}
                      decoding="async"
                      data-nimg={1}
                      src={Youtube}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Điện tín"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Telegram}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                </nav>
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Họ &amp; tên
                  </label>
                  <input
                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Email
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-envelope">
                   <Email/>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      placeholder="example@example.com"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-phone-volume">
                      <Phone/>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Tin nhắn
                  </label>
                  <textarea
                    className="block w-full outline-0 px-[10px] rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 mt-1.5"
                    rows={4}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-base bg-[#00BADB] h-[50px] w-auto px-[45px] font-semibold rounded-full text-white inline-flex items-center relative overflow-hidden hover:bg-[#23b6cd] transition-all ease-in-out duration-300"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
            <div className="max-w-sm space-y-8 mt-10 block lg:hidden">
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>🗺 ĐỊA CHỈ</span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      Trịnh Văn Bô, Bắc Từ Liêm, Hà Nội, Việt Nam
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>💌 EMAIL</span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      nc.example@example.com
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      ☎ ĐIỆN THOẠI
                    </span>
                  </span>
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  <span style={{ verticalAlign: "inherit" }}>
                    <span style={{ verticalAlign: "inherit" }}>
                      0921 735 576
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <nav className="nc-SocialsList flex gap-2 text-2xl text-neutral-6000 dark:text-neutral-300 mt-2">
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Facebook}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Twitter}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Youtube"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={135}
                      decoding="async"
                      data-nimg={1}
                      src={Youtube}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                  <Link
                    to=""
                    className="block w-6 h-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Điện tín"
                  >
                    <img
                      loading="lazy"
                      width={136}
                      height={136}
                      decoding="async"
                      data-nimg={1}
                      src={Telegram}
                      style={{ color: "transparent" }}
                    />
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-contact-body*/}
      </main>
    </>
  );
};

export default Contact;
