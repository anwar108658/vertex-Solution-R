import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../store/login/loginSlice";
import dasBoardslice  from "../store/appStartFetchData/dashBoardSlice";
import subMenuSlice from "./subMenuData/subMenuSlice";

export const store = configureStore({
    reducer:{
        login:loginSlice,
        DashboardData:dasBoardslice,
        subMenu:subMenuSlice,
    }
})