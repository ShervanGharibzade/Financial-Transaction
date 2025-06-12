import { Button, Result } from "antd";
import Link from "next/link";

const ErrorPage = ({ error }: { error: Error | null }) => {
  if (!error) return null;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="error"
        title="Something went wrong"
        subTitle={
          error.message ||
          "An unexpected error occurred. Please try again later."
        }
        extra={[
          <Link href="/" key="home" passHref>
            <Button type="primary">Back Home</Button>
          </Link>,
          <Button key="reload" onClick={() => window.location.reload()}>
            Retry
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorPage;
