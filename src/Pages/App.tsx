import "../Css/App.css";
import { TD, TH, THead, TR, Table } from "../Components";
import { useAppDispatch, useAppSelector } from "../Hook/hooks";
import { useEffect, useState } from "react";
import {
  changeAddress,
  changeName,
  fetchCompanies,
  selectCompany,
  toggleSelectedAll,
  addNewEmployee,
} from "../Services/companiesSlice";
import {
  addEmployee,
  changeFirstname,
  changeLastname,
  changePosition,
  deleteEmployee,
  fetchEmployee,
  selectEmployee,
} from "../Services/employeeSlice";

function App() {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companiesSlice.companies);
  const employee = useAppSelector((state) => state.employeeSlice.employee);
  const selectCompanies = useAppSelector(
    (state) => state.companiesSlice.selectedCompaniesID
  );
  const selectEmployeeID = useAppSelector(
    (state) => state.employeeSlice.selectEmployeeID
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (fetching) {
      dispatch(fetchCompanies(currentPage));
    }
    setCurrentPage((prevState) => prevState + 1);
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    if (selectCompanies.length === 1) {
      dispatch(fetchEmployee(selectCompanies));
    }
  }, [selectCompanies]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  function NewEmployee(id: number) {
    dispatch(addNewEmployee(id));
    dispatch(addEmployee(id));
  }

  return (
    <div className="App">
      <div className="Table">
        <Table>
          <THead>
            <TR>
              <TH>
                <input
                  checked={selectCompanies.length === companies.length}
                  onChange={() => dispatch(toggleSelectedAll())}
                  type="checkbox"
                />
              </TH>
              <TH>Название компании</TH>
              <TH>Кол-во сотрудников</TH>
              <TH>Адрес</TH>
            </TR>
          </THead>
          {companies?.map((i: any) => (
            <TR key={i.id}>
              <TD>
                <input
                  type="checkbox"
                  checked={selectCompanies.includes(i.id)}
                  onChange={() => dispatch(selectCompany(i))}
                />
              </TD>
              <TD>
                <input
                  value={i.name}
                  onChange={(e) =>
                    dispatch(changeName({ ...i, name: e.target.value }))
                  }
                />
              </TD>
              <TD>{i.employeesCount}</TD>
              <TD>
                <input
                  value={i.address}
                  onChange={(e) =>
                    dispatch(changeAddress({ ...i, address: e.target.value }))
                  }
                />
              </TD>
            </TR>
          ))}
        </Table>
      </div>
      {selectCompanies.length === 1 && (
        <div className="Table">
          <div className="buttonAddBlock">
            <button
              className="buttonAdd"
              onClick={() => NewEmployee(selectCompanies[0])}
            >
              Добавить сотрудника
            </button>
            <button
              className="buttonAdd"
              onClick={() => dispatch(deleteEmployee(selectCompanies))}
            >
              Удалить сотрудников
            </button>
          </div>
          <Table>
            <THead>
              <TR>
                <TH></TH>
                <TH>Фамилия</TH>
                <TH>Имя</TH>
                <TH>Должность</TH>
              </TR>
            </THead>
            {employee?.map((i: any) => (
              <TR
                key={i.id}
                className={` ${selectEmployeeID.includes(i.id) && "select"}`}
              >
                <TD>
                  <input
                    type="checkbox"
                    checked={selectEmployeeID.includes(i.id)}
                    onChange={() => dispatch(selectEmployee(i))}
                  />
                </TD>
                <TD>
                  <input
                    value={i.firstname}
                    onChange={(e) =>
                      dispatch(
                        changeFirstname({ ...i, firstname: e.target.value })
                      )
                    }
                  />
                </TD>
                <TD>
                  <input
                    value={i.lastname}
                    onChange={(e) =>
                      dispatch(
                        changeLastname({ ...i, lastname: e.target.value })
                      )
                    }
                  />
                </TD>
                <TD>
                  <input
                    value={i.position}
                    onChange={(e) =>
                      dispatch(
                        changePosition({ ...i, position: e.target.value })
                      )
                    }
                  />
                </TD>
              </TR>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
}

export default App;
