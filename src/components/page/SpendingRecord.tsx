import {
  Badge,
  BadgeProps,
  Card,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import { SpendingCategory } from "../../types";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    left: -24,
    top: 6,
    right: "unset",
    padding: "1px 6px",
  },
}));

const categoryMap: Record<
  SpendingCategory,
  { badgeContent: string; color: any }
> = {
  card: { badgeContent: "카드", color: "success" },
  cash: { badgeContent: "현금", color: "warning" },
  welfare: { badgeContent: "복지", color: "info" },
};

interface Props {
  detail: string;
  price: number;
  category: SpendingCategory;
}

const SpendingRecord: React.FC<Props> = ({ detail, price, category }) => {
  return (
    <StyledBadge
      badgeContent={categoryMap[category].badgeContent}
      color={categoryMap[category].color}
    >
      <Card sx={{ cursor: "pointer", width: 100 }} onClick={() => alert("hi")}>
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Typography sx={{ fontSize: "14px" }}>{detail}</Typography>
          <Typography>₩{price.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </StyledBadge>
  );
};

export default SpendingRecord;
