import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseurl = import.meta.env.VITE_BASE_URL;

export const loadForm = createAsyncThunk(
    "loadForm",
    async (val, { rejectWithValue }) => {
        try {
            console.log("first",val)
            const userdata = JSON.parse(sessionStorage.getItem('userData'))
            const response = await fetch(`${baseurl}report/ReportConfig/${val}`, {
                method: "GET",
                headers: {
            Authorization: `Bearer ${userdata.authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const subMenuSlice =  createSlice({
    name:"subMenu",
    initialState:{
        subMenu:[],
        tabs:[],
        activeTab:"",
        isLoading:true
    },
    reducers:{
        getSubMenu:(state,action) => {
            state.subMenu = action.payload
        },
        activeTab:(state,action) => {
            state.activeTab = action.payload
        },
        removeTab:(state,action) => {
            state.tabs = state.tabs.filter(item => item.id !== action.payload)
        },
        clearSubMenuSlice:(state) => {
            state.subMenu=[]
            state.tabs=[]
        }
    },
    extraReducers:(builder) => {
        // for LoadForm
        builder.addCase(loadForm.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(loadForm.fulfilled,(state,action) => {
            state.isLoading = false
            const tab = {
                ...action.payload?.data,
                id: Math.floor(Math.random() * 100000),
            }
            state.activeTab = tab.id
            state.tabs.push(tab)
        })
        builder.addCase(loadForm.rejected,(state,action) => {
            console.log("error>>>",action.payload)
        })
    }
})

export const {getSubMenu,activeTab,removeTab,clearSubMenuSlice} = subMenuSlice.actions

export default subMenuSlice.reducer