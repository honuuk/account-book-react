import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
  opened: boolean;
}

const Comp: React.FC<Props> = ({ opened, close }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      category: "card",
      price: undefined,
      description: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <Dialog
      sx={{
        padding: "20px 100px",
      }}
      onClose={close}
      open={opened}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputBox">
          <text>지출내역 : </text>
          <input
            type="text"
            placeholder="지출한 내역을 입력해주세요."
            {...register("title", { required: true })}
          />
        </div>
        <div className="inputBox">
          <text>지출 카테고리 : </text>
          <input
            type="radio"
            id="card"
            value="card"
            {...register("category")}
          />
          <label htmlFor="card">카드</label>
          <input
            type="radio"
            id="cash"
            value="cash"
            {...register("category")}
          />
          <label htmlFor="cash">현금</label>
          <input
            type="radio"
            id="welfare"
            value="welfare"
            {...register("category")}
          />
          <label htmlFor="welfare">복지</label>
        </div>
        <div className="inputBox">
          <text>금액 : </text>
          <input
            type="number"
            placeholder="금액을 입력해주세요."
            {...register("price")}
          />
          <text>원</text>
        </div>
        <div className="inputBox">
          <text>메모 : </text>
          <input
            type="text"
            placeholder="메모를 입력해주세요."
            {...register("description")}
          />
        </div>
        <button className="inputBotton" type="submit">
          추가
        </button>
      </form>
    </Dialog>
  );
};

export default Comp;
