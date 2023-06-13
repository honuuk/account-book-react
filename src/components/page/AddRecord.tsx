import { useState } from "react";
import { SpeedDialIcon } from "@mui/material";

import Dialog from "./Dialog";
import "./AddRecord.css";

interface Props {}

const AddRecord: React.FC<Props> = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);
  return (
    <>
      <button className="add_record_button" onClick={open}>
        <SpeedDialIcon />
      </button>
      <Dialog opened={opened} close={close} />
    </>
  );
};

export default AddRecord;
