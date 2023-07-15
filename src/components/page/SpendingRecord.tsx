import {
  Badge,
  BadgeProps,
  Card,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import { SpendingType } from "../../types";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    left: -24,
    top: 6,
    right: "unset",
    padding: "1px 6px",
  },
}));

const typeMap: Record<SpendingType, { badgeContent: string; color: any }> = {
  card: { badgeContent: "카드", color: "success" },
  cash: { badgeContent: "현금", color: "warning" },
  welfare: { badgeContent: "복지", color: "info" },
};

interface Props {
  title: string;
  price: number;
  type: SpendingType;
}

const SpendingRecord: React.FC<Props> = ({ title, price, type }) => {
  return (
    <StyledBadge
      badgeContent={typeMap[type].badgeContent}
      color={typeMap[type].color}
    >
      <Card sx={{ cursor: "pointer", width: 100 }}>
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Typography sx={{ fontSize: "14px" }}>{title}</Typography>
          <Typography>₩{price.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </StyledBadge>
  );
};

export default SpendingRecord;
