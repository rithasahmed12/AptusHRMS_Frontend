// store/attendanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceState {
  punchStatus: 'in' | 'out' | null;
  lastPunchTime: string | null;
}

const loadStateFromLocalStorage = (): AttendanceState => {
  const savedState = localStorage.getItem('attendanceState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    punchStatus: null,
    lastPunchTime: null,
  };
};

const saveStateToLocalStorage = (state: AttendanceState) => {
  localStorage.setItem('attendanceState', JSON.stringify(state));
};

const initialState: AttendanceState = loadStateFromLocalStorage();

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setPunchStatus: (state, action: PayloadAction<'in' | 'out' | null>) => {
      state.punchStatus = action.payload;
      saveStateToLocalStorage(state);
    },
    setLastPunchTime: (state, action: PayloadAction<string | null>) => {
      state.lastPunchTime = action.payload;
      saveStateToLocalStorage(state);
    },
  },
});

export const { setPunchStatus, setLastPunchTime } = attendanceSlice.actions;
export default attendanceSlice.reducer;