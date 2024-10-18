import React, { useState } from 'react';
import { Button, Modal } from 'antd';


type Props = {
    title: string;
    content: React.ReactNode
}
const CustomeModal = ({ title,content }: Props) => {
    return (
        <>
            <Modal title={title}>
                {content}
            </Modal>
        </>
    );
};

export default CustomeModal;