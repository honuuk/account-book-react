import { useEffect, useMemo, useState } from "react";
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

import SpendingRecord from "../../components/page/SpendingRecord";
import AddRecord from "../../components/page/AddRecord";
import Dialog from "../../components/page/Dialog";
import { RecordData, SpendingCategory } from "../../types";

import styles from "./styles";
import "./home.css";
import { getRecords } from "../../service/record";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordData>();

  const categorizedRecords = useMemo(
    () =>
      data.reduce((acc, record) => {
        if (acc[record.category]) acc[record.category].push(record);
        else acc[record.category] = [record];
        return acc;
      }, {} as Record<SpendingCategory, RecordData[]>),
    [data]
  );

  const handleRecordClick = (record: RecordData) => () => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  useEffect(() => {
    getRecords().then((res) => console.log(res));
  }, []);

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
      <Box sx={styles.tabBox}>
        <Tabs value={tabIndex} onChange={() => ""}>
          <Tab label="지출" />
          <Tab label="수입" disabled />
        </Tabs>
      </Box>
      <Box>
        <TableContainer sx={styles.tableContainer} component={Paper}>
          <Table sx={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow sx={styles.tableHeadRow}>
                {categories.map((category) => (
                  <TableCell sx={styles.tableHeadCell}>
                    {categoryLabels[category]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>
              {categories.map((category) => (
                <TableRow sx={styles.tableBodyRow}>
                  {categorizedRecords[category]?.map((record) => (
                    <TableCell
                      component="td"
                      scope="row"
                      sx={styles.tableBodyCell}
                      onClick={handleRecordClick(record)}
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
      {isOpen && (
        <Dialog
          opened={isOpen}
          close={() => setIsOpen(false)}
          initialValues={selectedRecord}
        />
      )}
    </>
  );
};

export default Home;
