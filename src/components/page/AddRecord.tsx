import { useState } from "react";
import { Dialog, SpeedDialIcon } from "@mui/material";

import { SpendingCategory } from "../../types";
import "./AddRecord.css";

interface Props {}

const AddRecord: React.FC<Props> = () => {
  const [category, setCategory] = useState<SpendingCategory>("card");
  const [opened, setOpened] = useState<boolean>(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);
  const onChangeCategory = (e: any) => setCategory(e.target.value);
  return (
    <>
      <button className="add_record_button" onClick={open}>
        <SpeedDialIcon />
      </button>
      <Dialog
        sx={{
          padding: "20px 100px",
        }}
        onClose={close}
        open={opened}
      >
        {/* <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          장보기
        </DialogTitle> */}
        <div className="inputBox">
          <text>지출내역 : </text>
          <input type="text" placeholder="지출한 내역을 입력해주세요."></input>
        </div>
        <div className="inputBox">
          <text>지출 카테고리 : </text>
          <input
            type="radio"
            id="card"
            name="category"
            value="card"
            onChange={onChangeCategory}
            checked={category === "card"}
          ></input>
          <label htmlFor="card">카드</label>
          <input
            type="radio"
            id="cash"
            name="category"
            value="cash"
            onChange={onChangeCategory}
            checked={category === "cash"}
          ></input>
          <label htmlFor="cash">현금</label>
          <input
            type="radio"
            id="welfare"
            name="category"
            value="welfare"
            onChange={onChangeCategory}
            checked={category === "welfare"}
          ></input>
          <label htmlFor="welfare">복지</label>
        </div>
        <div className="inputBox">
          <text>금액 : </text>
          <input type="number" placeholder="금액을 입력해주세요."></input>
          <text>원</text>
        </div>
        <div className="inputBox">
          <text>메모 : </text>
          <input type="text" placeholder="메모를 입력해주세요."></input>
        </div>
        <button className="inputBotton">추가</button>
      </Dialog>
    </>
  );
};

export default AddRecord;
