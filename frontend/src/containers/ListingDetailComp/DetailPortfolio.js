import React, { useState } from 'react';
import DetailList from './DetailList';

const DetailPortfolio = () => {

  return (
    <div className="w-full relative bg-whitesmoke-100 overflow-hidden flex flex-row items-start justify-start py-10 px-8 box-border leading-[normal] tracking-[normal] mq750:pl-4 mq750:pr-4 mq750:box-border">
      <main className="flex-1 shadow-[0px_8px_32px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-gray-white flex flex-col items-end justify-start pt-6 px-6 pb-[19px] box-border gap-[52px] max-w-full mq750:gap-[26px] mq450:gap-[13px] mq450:pt-4 mq450:pb-[40px] mq450:box-border mq1025:pt-[16px] mq1025:pb-[60px] mq1025:box-border">
        <DetailList />
      </main>
    </div>
  );
};

export default DetailPortfolio;
