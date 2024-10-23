import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-10">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
