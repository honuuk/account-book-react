const styles = {
  tabBox: { borderBottom: 1, borderColor: "divider", marginTop: "16px" },
  tableContainer: {
    marginTop: "32px",
    minHeight: 500,
    maxWidth: 1200,
    overflowX: "auto",
  },
  table: { minWidth: 930 },
  tableHeadRow: { display: "flex" },
  tableHeadCell: { width: 100, textAlign: "center" },
  tableBody: { display: "flex" },
  tableBodyRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    display: "flex",
    flexDirection: "column",
  },
  tableBodyCell: { borderBottom: "none" },
};

export default styles;
