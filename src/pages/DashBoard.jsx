import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import React, { useEffect, useMemo, useState } from 'react'
import {DropDownButton, TextBox, Toolbar} from 'devextreme-react'
import { Drawer } from 'devextreme-react'
import {List} from 'devextreme-react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import loading from "../assets/load.gif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightDots, faFileInvoice, faMagnifyingGlass, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/login/loginSlice'
import BodySection from '../components/BodySection'
import { getComboData, getMenuData } from '../store/appStartFetchData/dashBoardSlice'
import { getSubMenu } from '../store/subMenuData/subMenuSlice'

const DashBoard = () => {
  const DashboardData = useSelector(state => state.DashboardData)
  const {tabs} = useSelector(state => state.subMenu)
  const dispatch = useDispatch()
  const [showMenu,setShowMenu] = useState(0)
  const [opened,setOpened] = useState(false)
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(DashboardData?.combo[0]);
  const [menu,setMenu] = useState({})
  
  // for subMenu dispatch on global State
  const subMenuHandler = (modName,grpName,menus,item) => {
    setMenu({moduleName:modName,groupName:grpName,menu:menus})
    navigate("/menus")
  }
  useEffect(() => {
    dispatch(getSubMenu(menu))
  }, [menu])
  
  // get All data Appear on Dashboard 
  useEffect(() => {
    dispatch(getComboData())
    dispatch(getMenuData());
  }, [dispatch])

  // 
useEffect(() => {
  if (tabs?.length > 0) {
    navigate("/form")
  }
}, [])


  // showing default value on combo/dropdown in Navbar
  useEffect(() => {
    if (DashboardData?.combo?.length > 0) {
      setSelectedItem(DashboardData.combo[0]); // Set default selected item
    }
  }, [DashboardData]);
  
  // first Time loading
  if (DashboardData?.isLoading) {
    return(
      <div className='absolute flex justify-center items-center w-full h-screen z-[4000] backdrop-blur-sm bg-black/10'>
        <img className='w-[80px] sm:w-[100px] md:w-[150px]' src={loading} alt="" />
      </div>
    )
  }
  
  
  
  
  // for Side Menu
  const sideMenuItem = () => {
    
    return(
      <>
        <div className='flex bg-white flex-col  gap-4  p-2 h-full'>

          {/* heading */}
          <div className='flex gap-6 items-center'>
            <img src={logo} className='w-[30px]' alt="" />
            {opened && <h1 className='whitespace-nowrap text-[1.4rem] [text-shadow:_-10px_2px_4px_rgb(99_102_241_/_0.3)] font-bold text-center text-cyan-600'>Vertex-R</h1>}
          </div>

          {/* search-box */}
          <div>
            {opened && <div className='flex items-center gap-2 border-blue-500 border-b-1 text-gray-700  p-1'>
              <FontAwesomeIcon className='text-blue-500' icon={faMagnifyingGlass} />
              <input type="text" placeholder='Search...' className='w-full outline-0'/>
            </div>}
            <div></div>
          </div>

          {/* Item */}
          <div className='flex flex-col gap-1'>
              {DashboardData.menuData.length > 0 ? DashboardData.menuData.map((item,index) => (
                <ul key={index} className='text-[.8rem] text-gray-600'>
                  <div onClick={() => setShowMenu(index)} className='flex gap-3  items-center p-2 cursor-pointer rounded-lg hover:bg-blue-200 whitespace-nowrap'>
                    <FontAwesomeIcon fontSize="16px" className='text-[#0092B8]' icon={faArrowUpRightDots} />
                    {opened && item.moduleName}
                  </div>
                  {item?.groups?.length > 0 ? item?.groups?.map((item1,index1) => (
                    <li key={index1} onClick={() => subMenuHandler(item.moduleName,item1.groupName,item1.menus,item)}>
                    {index===showMenu && <div className={`ml-3 flex gap-2 p-1 px-2 items-center ${!opened && "justify-center"} cursor-pointer rounded-md hover:bg-blue-200 whitespace-nowrap`}>
                        <FontAwesomeIcon fontSize="15px" className='text-blue-500' icon={faFileInvoice} />
                        {opened && item1.groupName}
                      </div>}
                    </li>
                    )):""}
                </ul>
              )):""}
          </div>
        </div>
      </>
    )
  }


  return (
    <Drawer 
    opened={opened}
    position='left'
    revealMode='expand'
    openedStateMode='shrink'
    component={sideMenuItem} // for side Menu
    maxSize="250px"
    minSize="60px"
    height="100vh"
    >
      <>
      {/*  Navbar */}
      <nav className='flex sticky justify-between items-center  py-2 px-2'>
        <div>
          <button onClick={() => setOpened(!opened)} className='cursor-pointer'>
            <FontAwesomeIcon className='text-gray-700' fontSize="17px" icon={faBars} />
          </button>
        </div>
        <div className='flex items-center gap-3'>
          <DropDownButton
            items={DashboardData?.combo}
            id={DashboardData?.combo?.indx}
            displayExpr="companyName"
            keyExpr="text"
            splitButton={true}
            text={selectedItem?.companyName}
            icon={"https://cdn.pixabay.com/photo/2020/06/26/11/43/uae-5342435_1280.png"}
            type='default'
            width={120}
            stylingMode="outlined"
            showArrowIcon={true}
            dropDownOptions={{
              hideOnOutsideClick: true, 
            }} 
            selectedItem={selectedItem?.companyName}
            onItemClick={(e) => setSelectedItem(e.itemData)}
          />
            <button onClick={() => [dispatch(logOut()),navigate("/login")]} className='cursor-pointer'>
             <FontAwesomeIcon fontSize="17px" className='text-gray-700 hover:text-blue-400 hover:scale-125 duration-200 transition-all'  icon={faPowerOff} />
            </button>
        </div>
      </nav>
      {/* Body Section */}
      <BodySection/>
      </>
    </Drawer>
  );
};

export default DashBoard
