import React from 'react';
import { Column } from '@ant-design/charts';

// import { Typography } from 'antd';
// const { Title } = Typography;
const data = [
      { type: 'Jan', value: 30 },
      { type: 'Feb', value: 70 },
      { type: 'Mar', value: 45 },
      { type: 'Apr', value: 85 },
      { type: 'May', value: 87 },
      { type: 'Jun', value: 84 },
      { type: 'Jul', value: 88 },
      { type: 'Aug', value: 89 },
      { type: 'Sep', value: 82 },
      { type: 'Oct', value: 65 },
      { type: 'Nov', value: 75 },
      { type: 'Dec', value: 70 },

];

const Chart = () => {
      const config = {
            data,
            xField: 'type',
            yField: 'value',
            columnWidth: 0.1,
            label: {
                  position: 'middle',
                  style: { fill: '#FFFFFF', opacity: 0.6 },
            },
      };

      return <>
            <Column {...config} />
      </>;
};

export default Chart;
