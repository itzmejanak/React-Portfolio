import React from 'react';
import { GrUserExpert } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";

const IconTest = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <GrUserExpert style={{ fontSize: '24px', color: 'var(--primary)' }} />
        <span style={{ fontSize: '12px' }}>GrUserExpert</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <IoMdAnalytics style={{ fontSize: '24px', color: 'var(--primary)' }} />
        <span style={{ fontSize: '12px' }}>IoMdAnalytics</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <MdOutlineSupportAgent style={{ fontSize: '24px', color: 'var(--primary)' }} />
        <span style={{ fontSize: '12px' }}>MdOutlineSupportAgent</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <RiExchange2Fill style={{ fontSize: '24px', color: 'var(--primary)' }} />
        <span style={{ fontSize: '12px' }}>RiExchange2Fill</span>
      </div>
    </div>
  );
};

export default IconTest;