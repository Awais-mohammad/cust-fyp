import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <Spin fullscreen={true} indicator={<LoadingOutlined style={{ fontSize: 36 , color:"white" }} spin />} />
  );
};

export default Spinner;