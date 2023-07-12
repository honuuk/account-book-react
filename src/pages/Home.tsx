import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";

import SpendingRecord from "../components/page/SpendingRecord";
import AddRecord from "../components/page/AddRecord";
import "./home.css";
import { Record } from "../types";

interface Props {}

const data: Record[] = [
  {
    title: "장보기",
    category: "living",
    type: "card",
    price: 23000,
    description: "",
  },
  {
    title: "외식",
    category: "eat out",
    type: "cash",
    price: 20000,
    description: "",
  },
  {
    title: "약속",
    category: "family",
    type: "welfare",
    price: 30000,
    description: "",
  },
  {
    title: "약속",
    category: "friend",
    type: "welfare",
    price: 30000,
    description: "",
  },
  {
    title: "약속",
    category: "transport",
    type: "welfare",
    price: 30000,
    description: "",
  },
  {
    title: "약속",
    category: "health",
    type: "welfare",
    price: 30000,
    description: "",
  },
  {
    title: "약속",
    category: "etc",
    type: "welfare",
    price: 30000,
    description: "",
  },
];

const Home: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabClick = (
    e: React.SyntheticEvent<Element, Event>,
    index: number
  ) => setTabIndex(index);

  return (
    <>
      <DatePicker
        value={selectedDate}
        onChange={(date) => setSelectedDate(date!)}
        views={["year", "month"]}
        openTo="month"
        format="YYYY-MM"
        slotProps={{ textField: { disabled: true } }}
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: "16px" }}>
        <Tabs value={tabIndex} onChange={handleTabClick}>
          <Tab label="지출" />
          <Tab label="수입" disabled />
        </Tabs>
      </Box>
      <Box>
        <TableContainer
          sx={{
            marginTop: "32px",
            minHeight: 500,
            maxWidth: 930,
            overflowX: "auto",
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 930 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  생활비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  외식비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  가족비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  친구비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  교통비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  건강비
                </TableCell>
                <TableCell sx={{ width: 100, textAlign: "center" }}>
                  기타
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="장보기" price={23000} type="card" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="외식" price={20000} type="cash" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="약속" price={30000} type="welfare" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="약속" price={30000} type="welfare" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="약속" price={30000} type="welfare" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="약속" price={30000} type="welfare" />
                </TableCell>
                <TableCell component="td" scope="row">
                  <SpendingRecord detail="약속" price={30000} type="welfare" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddRecord />
    </>
  );
};

export default Home;
