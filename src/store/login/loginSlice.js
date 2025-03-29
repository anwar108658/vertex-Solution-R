import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const baseurl = import.meta.env.VITE_BASE_URL;

// for login

export const userLogin = createAsyncThunk("userLogin", async (val,{rejectWithValue}) => {
    try {
        const response = await fetch(`${baseurl}user/login?userId=${val.userName}&password=${val.password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json()
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        users:[],
        isLoading:false,
        isError:null,
        message:"",
        navigate:false,
    },
    reducers:{
        logOut:(state) => {
            state.message=""
            state.navigate=false
            sessionStorage.removeItem("userData")
        }
    }
    ,
    extraReducers:(builder) => {
        builder.addCase(userLogin.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(userLogin.fulfilled,(state,action) => {
            state.isLoading = false
            if (action.payload.StatusCode !== 400) {
                const userData = {
                    userName: action.payload.data.userId || "",
                    userRole: action.payload.data.userName || "",
                    authToken: action.payload.token || "",
                };
                sessionStorage.setItem("userData", JSON.stringify(userData));
                state.navigate = true
                state.message = "Login SuccessFully"
            }else{
                state.navigate = false
                state.message = action.payload?.response?.message
            }
        })
        builder.addCase(userLogin.rejected,(state,action) => {
            state.isError = action.payload
            console.log("error",action.payload)
        })
    }
})

export const {logOut} = loginSlice.actions

export default loginSlice.reducer