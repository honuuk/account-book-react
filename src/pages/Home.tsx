import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

import "./home.css";
import { Box, Tab, Tabs } from "@mui/material";

interface Props {}

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
          <Tab label="수입" />
        </Tabs>
      </Box>
    </>
  );
};

export default Home;
