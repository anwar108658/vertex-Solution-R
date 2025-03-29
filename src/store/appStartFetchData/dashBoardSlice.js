import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const baseurl = import.meta.env.VITE_BASE_URL;

// for Combo

export const getComboData = createAsyncThunk(
    "getComboData",
    async (val, { rejectWithValue }) => {
        try {
            const userdata = JSON.parse(sessionStorage.getItem('userData'))
            const response = await fetch(`${baseurl}user/user_company`, {
                method: "POST",
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
// for Menu

export const getMenuData = createAsyncThunk("getMenuData", async (val,{rejectWithValue}) => {
    try {
        const userdata = JSON.parse(sessionStorage.getItem('userData'))
        const response = await fetch(`${baseurl}user/menu`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userdata.authToken}`,
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          return data;
  
        } catch (error) {
          return rejectWithValue(error.message);
     }
})

export const dasBoardslice = createSlice({
    name:"startApp",
    initialState:{
        combo:[],
        menuData:[],
        isLoading:false,
        isError:null,
    },
    reducers:{
        logOut:(state) => {
            state.message=""
            sessionStorage.removeItem("userData")
        }
    }
    ,
    extraReducers:(builder) => {
        // for combo data
        builder.addCase(getComboData.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(getComboData.fulfilled,(state,action) => {
            state.isLoading = false
            state.combo=action.payload?.data
        })
        builder.addCase(getComboData.rejected,(state,action) => {
            state.isError = action.payload
        })

        // for menu and sub menu
        builder.addCase(getMenuData.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(getMenuData.fulfilled,(state,action) => {
            state.isLoading = false
            state.menuData = action.payload?.data?.modules
        })
        builder.addCase(getMenuData.rejected,(state,action) => {
            state.isError=action.payload
        })
    }
})

export default dasBoardslice.reducer