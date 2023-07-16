import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";

import { RecordData } from "../../../types";

import "./Dialog.css";

const DefaultValues: RecordData = {
  title: "",
  type: "card",
  category: "living",
  price: 0,
  description: "",
};

interface Props {
  close: () => void;
  opened: boolean;
  initialValues?: RecordData;
}

const Comp: React.FC<Props> = ({ opened, close, initialValues }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues || DefaultValues,
  });

  const onSubmit = (data: any) => {
    console.log(data);
    return close();
  };

  const handleClose = () => {
    reset(DefaultValues);
    close();
  };

  return (
    <Dialog
      sx={{
        padding: "20px 100px",
      }}
      open={opened}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputBox">
          <span>지출내역 : </span>
          <input
            type="text"
            placeholder="지출한 내역을 입력해주세요."
            {...register("title", { required: true })}
          />
        </div>
        <div className="inputBox">
          <span>지출 카테고리 : </span>
          <select {...register("category")}>
            <option value="living">생활비</option>
            <option value="eat out">외식비</option>
            <option value="family">가족비</option>
            <option value="friend">친구비</option>
            <option value="transport">교통비</option>
            <option value="health">건강비</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div className="inputBox">
          <span>지출 타입 : </span>
          <input type="radio" id="card" value="card" {...register("type")} />
          <label htmlFor="card">카드</label>
          <input type="radio" id="cash" value="cash" {...register("type")} />
          <label htmlFor="cash">현금</label>
          <input
            type="radio"
            id="welfare"
            value="welfare"
            {...register("type")}
          />
          <label htmlFor="welfare">복지</label>
        </div>
        <div className="inputBox">
          <span>금액 : </span>
          <input
            type="number"
            placeholder="금액을 입력해주세요."
            {...register("price")}
          />
          <span>원</span>
        </div>
        <div className="inputBox">
          <span>메모 : </span>
          <input
            type="text"
            placeholder="메모를 입력해주세요."
            {...register("description")}
          />
        </div>
        <button className="saveButton" type="submit">
          {initialValues ? "저장" : "추가"}
        </button>
        <button className="cancelButton" onClick={handleClose}>
          닫기
        </button>
      </form>
    </Dialog>
  );
};

export default Comp;
