"use client"
import React from 'react';
import Workspaceprovider from './provider';
const Workspacelayout = ({children}) => {
  return (
    <Workspaceprovider>
        {children}
    </Workspaceprovider>
  );
}

export default Workspacelayout;
