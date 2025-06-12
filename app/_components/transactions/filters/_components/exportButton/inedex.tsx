import { Button } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Transaction {
  id: string | number;
  amount: number | string;
  status: string;
  timestamp: string | Date;
  merchant?: {
    name: string;
  };
  payment_method?: {
    type: string;
  };
}

interface ExportPDFButtonProps {
  data: Transaction[];
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ data }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID",
      "Amount",
      "Status",
      "Merchant",
      "Date",
      "Payment Method",
    ];

    const tableRows = data.map((item) => [
      item.id,
      item.amount,
      item.status,
      item.merchant?.name ?? "N/A",
      new Date(item.timestamp).toLocaleDateString(),
      item.payment_method?.type ?? "N/A",
    ]);

    doc.text("Transaction Report", 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("transactions.pdf");
  };

  return (
    <Button onClick={handleExport} disabled={!data || data.length === 0}>
      Export to PDF
    </Button>
  );
};

export default ExportPDFButton;
