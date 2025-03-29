import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { activeTab, loadForm } from '../store/subMenuData/subMenuSlice';

const SubMenu = () => {
    const {subMenu} = useSelector(state => state.subMenu);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname.split('/')[1];
    const HandleSubMenu = (item) => {
      dispatch(loadForm(item?.reportId))
      navigate("/form")
    }
  return (
           <div className={`${location === "menus" ? "block":"hidden"}`}>
            {subMenu.moduleName && <div className='border-b-1 border-blue-500'>
              <div className='px-2 py-1 text-[.8rem] font-bold text-blue-400'>
                {subMenu?.moduleName} <span className='px-3'>{">"}</span> {subMenu?.groupName}
              </div>
            </div>}
            <div className='flex gap-3 text-[.7rem] px-5 py-2'>
              {
                subMenu && subMenu?.menu?.length > 0 ? subMenu.menu.map((item,index) => (
                  <div onClick={() => HandleSubMenu(item)} className='p-2 inline-flex flex-col gap-2 items-end bg-blue-50  shadow-lg shadow-blue-100 rounded-lg border-1  border-blue-300 hover:scale-105 transition-all duration-300 hover:cursor-pointer hover:bg-blue-300 '>
                    <p>
                      {item.menuName}
                    </p>
                    <FontAwesomeIcon className='text-left text-blue-200 text-2xl' icon={faFile} />
                  </div>
                )):""
              }
            </div>  
          </div>
  )
}

export default SubMenu