import { useMemo, useState } from "react";
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
import { RecordData, SpendingCategory } from "../types";

import "./home.css";

interface Props {}

const categoryLabels: Record<SpendingCategory, string> = {
  living: "생활비",
  "eat out": "외식비",
  family: "가족비",
  friend: "친구비",
  transport: "교통비",
  health: "건강비",
  company: "회사비",
  leisure: "여가비",
  etc: "기타",
};

const data: RecordData[] = [
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
    category: "eat out",
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

const categories: SpendingCategory[] = [
  "living",
  "eat out",
  "family",
  "friend",
  "transport",
  "health",
  "company",
  "leisure",
  "etc",
];

const Home: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [tabIndex, setTabIndex] = useState<number>(0);

  const categorizedRecords = useMemo(
    () =>
      data.reduce((acc, record) => {
        if (acc[record.category]) acc[record.category].push(record);
        else acc[record.category] = [record];
        return acc;
      }, {} as Record<SpendingCategory, RecordData[]>),
    [data]
  );
  console.log(categorizedRecords);

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
              <TableRow sx={{ display: "flex" }}>
                {categories.map((category) => (
                  <TableCell sx={{ width: 100, textAlign: "center" }}>
                    {categoryLabels[category]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ display: "flex" }}>
              {categories.map((category) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {categorizedRecords[category]?.map((record) => (
                    <TableCell
                      component="td"
                      scope="row"
                      sx={{ borderBottom: "none" }}
                    >
                      <SpendingRecord {...record} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddRecord />
    </>
  );
};

export default Home;
