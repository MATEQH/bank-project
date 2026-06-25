import type {User} from "../auth/auth-api.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import api from "../api/client.ts";

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
}

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const res = await api.get('/auth/me');
            return res.data as User;
        } catch (error) {
            localStorage.removeItem(token);
            return rejectWithValue(null);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (token: string, { dispatch }) => {
        localStorage.setItem('token', token);
        await dispatch(fetchCurrentUser());
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User | null>) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;