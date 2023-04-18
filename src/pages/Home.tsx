import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

import "./home.css";

interface Props {}

const Home: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
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
    </>
  );
};

export default Home;
