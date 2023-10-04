import { useState } from "react";
import { SpeedDialIcon } from "@mui/material";

import { addRecord } from "../../../service/record";
import { RecordData } from "../../../types";

import Dialog from "../Dialog";
import "./AddRecord.css";

interface Props {
  month: string;
}

const AddRecord: React.FC<Props> = ({ month }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  const onSubmit = async (record: RecordData) => {
    await addRecord({ ...record, month });
    close();
  };

  return (
    <>
      <button className="add_record_button" onClick={open}>
        <SpeedDialIcon />
      </button>
      <Dialog month={month} opened={opened} close={close} onSubmit={onSubmit} />
    </>
  );
};

export default AddRecord;
