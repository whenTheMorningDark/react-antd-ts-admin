import React from 'react';
import { Button, ConfigProvider } from 'antd';


const WorkPlace = () => {
  console.log('1');
  return (
    <div>
      <ConfigProvider
        theme={{
          'token': {
            'colorPrimary': '#52C41A',
            'colorText': 'red'
          }
        }}
      >
        <Button>
          1231
        </Button>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#52C41A',
            },
          }}
        >
          <Button type='primary'>
            1232
          </Button>
        </ConfigProvider>
      </ConfigProvider>
    </div>
  );
};

export default WorkPlace;