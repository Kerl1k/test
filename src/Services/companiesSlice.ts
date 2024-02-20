import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface Company {
  id: number;
  name: string;
  address: string;
  employeesCount: number;
}

interface CompaniesState {
  companies: Array<Company>;
  selectedCompaniesID: Array<number>;
}

const initialState: CompaniesState = { companies: [], selectedCompaniesID: [] };

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (page: number) => {
    return fetch(`http://localhost:3001/companies?_page=${page}&_per_page=25`)
      .then((res) => res.json())
      .then((res) => res.data);
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<Company>) {
      const company = state.companies.find(
        (company) => company.id === action.payload.id
      );
      if (company) {
        company.name = action.payload.name;
      }
    },
    changeAddress(state, action) {
      const company = state.companies.find(
        (company) => company.id === action.payload.id
      );
      if (company) {
        company.address = action.payload.address;
      }
    },
    selectCompany(state, action: PayloadAction<Company>) {
      const index = state.selectedCompaniesID.findIndex(
        (id) => id === action.payload.id
      );
      if (index === -1) {
        state.selectedCompaniesID.push(action.payload.id);
      } else {
        state.selectedCompaniesID.splice(index, 1);
      }
    },
    toggleSelectedAll(state) {
      if (state.selectedCompaniesID.length === state.companies.length) {
        state.selectedCompaniesID = [];
      } else {
        state.selectedCompaniesID = state.companies.map(
          (company) => company.id
        );
      }
    },
    addNewEmployee(state, action: PayloadAction<number>) {
      const company = state.companies.find(
        (company) => company.id === action.payload
      );
      if (company) {
        company.employeesCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCompanies.fulfilled,
      (state, action: PayloadAction<Company[]>) => {
        state.companies = [...state.companies, ...action.payload];
      }
    );
  },
});

export const {
  changeName,
  changeAddress,
  selectCompany,
  toggleSelectedAll,
  addNewEmployee,
} = companiesSlice.actions;
export default companiesSlice.reducer;
