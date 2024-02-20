import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../Hook/hooks";
interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  companyId: number;
}

interface EmployeeState {
  employee: Array<Employee>;
  selectEmployeeID: Array<number>;
}

const initialState: EmployeeState = { employee: [], selectEmployeeID: [] };

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (selectCompanies: number[]) => {
    return fetch(
      `http://localhost:3001/employee?companyId=${selectCompanies[0]}`
    ).then((res) => res.json());
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    changeFirstname(state, action: PayloadAction<Employee>) {
      let employee = state.employee.find(
        (employee) => employee.id === action.payload.id
      );
      if (employee) {
        employee.firstname = action.payload.firstname;
      }
    },
    changeLastname(state, action: PayloadAction<Employee>) {
      let employee = state.employee.find(
        (employee) => employee.id === action.payload.id
      );
      if (employee) {
        employee.lastname = action.payload.lastname;
      }
    },
    changePosition(state, action: PayloadAction<Employee>) {
      let employee = state.employee.find(
        (employee) => employee.id === action.payload.id
      );
      if (employee) {
        employee.position = action.payload.position;
      }
    },
    selectEmployee(state, action: PayloadAction<Employee>) {
      const index = state.selectEmployeeID.findIndex(
        (id) => id === action.payload.id
      );
      if (index === -1) {
        state.selectEmployeeID.push(action.payload.id);
      } else {
        state.selectEmployeeID.splice(index, 1);
      }
    },
    addEmployee(state, action: PayloadAction<number>) {
      state.employee.push({
        id: Number(Date.now()),
        firstname: "",
        lastname: "",
        position: "",
        companyId: action.payload,
      });
    },
    deleteEmployee(state, action: PayloadAction<any>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmployee.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        state.employee = action.payload;
      }
    );
  },
});

export const {
  changeFirstname,
  changeLastname,
  changePosition,
  addEmployee,
  deleteEmployee,
  selectEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
