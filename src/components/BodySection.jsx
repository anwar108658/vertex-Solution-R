import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComboData } from '../store/appStartFetchData/dashBoardSlice'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromWaterPump, faFile } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import Tabs from './Tabs';
import FormContainer from './FormContainer';

const BodySection = () => {
    const {subMenu,tabs,activeTab} = useSelector(state => state.subMenu);
    const location = useLocation().pathname.split('/')[1]

  return (
    <div className='w-full h-screen bg-white shadow-[inset_0_2px_20px_rgba(59,130,246,0.2)] '>
      {/* subMenu */}
       <SubMenu/>

      {/* TabSection */}
      <Tabs/>

      {/* form */}
      <div>
        {tabs.length > 0 && tabs.map((item,index) => (
          <div key={index} className={activeTab === item?.id ? "block":"hidden"}>
            <FormContainer item={item}/>
          </div>
        ))}  
      </div>
    </div>
  )
}

export default BodySection