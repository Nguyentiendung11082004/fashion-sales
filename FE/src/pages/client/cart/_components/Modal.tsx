import React from 'react'
import { Modal as AntModal } from 'antd';
type Props = {
    open: boolean,
    onClose: () => void;
}

const ModalCart = ({ open, onClose }: Props) => {
    return (
        <AntModal open={open} onCancel={onClose} footer={false} closable={false} maskClosable={false}>
            <div>
                <h2>Blush Beanie</h2>
                <span>378.000 đ</span>
                <div className='bienthe'>
                    <div>
                        <p>Color : <span>Black</span> </p>
                        <div className="flex mt-3 gap-2">
                            <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                                <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-gray-300"></div>
                            </div>
                            <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                                <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-pink-200"></div>
                            </div>
                            <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                                <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-black"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Size : <span>L</span></p>
                        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3 ">
                            <div
                                className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                            >
                                XS
                            </div>
                            <div
                                className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                            >
                                S
                            </div>
                            <div
                                className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                            >
                                M
                            </div>
                            <div
                                className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                            >
                                L
                            </div>
                            <div
                                className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                            >
                                XL
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="nc-Button relative right-2 h-14 w-64 inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium sm:py-3.5 sm:px-2 lg:px-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0  animate-bounce focus:animate-none hover:animate-none text-md  mt-8 ml-28 border bg-[#56cfe1] text-white">
                        <svg
                            className="hidden lg:hidden xl:block sm:inline-block w-5 h-5 mb-0.5"
                            viewBox="0 0 9 9"
                            fill="none"
                        >
                            <path
                                d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                                fill="currentColor"
                            ></path>

                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span className="xl:ml-3 ml-1 lg:text-base xl:text-lg">
                            Xác nhận
                        </span>
                    </button>
                </div>
            </div>
        </AntModal>
    )
}

export default ModalCart