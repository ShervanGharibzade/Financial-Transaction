import { Empty, Button } from "antd";
import Link from "next/link";

export const IsEmpty = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Empty description={<span>No data available</span>}>
        <Link href="/" passHref>
          <Button type="primary">Go Back Home</Button>
        </Link>
      </Empty>
    </div>
  );
};
