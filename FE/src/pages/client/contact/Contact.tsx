import { Icon2, Icon3, Icon5, Icon6 } from "@/components/icons";
import React from "react";

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
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src={Icon2}
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src={Icon5}
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src={Icon6}
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src={Icon3}
                      style={{ color: "transparent" }}
                    />
                  </a>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                          />
                        </svg>
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
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src="./src/assets/images/facebook.b22e79d5.svg"
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src={Icon5}
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src="./src/assets/images/youtube.bcae2a7a.svg"
                      style={{ color: "transparent" }}
                    />
                  </a>
                  <a
                    className="block w-6 h-6"
                    href="#"
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
                      src="./src/assets/images/telegram.a3c75624.svg"
                      style={{ color: "transparent" }}
                    />
                  </a>
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
