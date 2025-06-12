"use client";

import LoadingSpin from "@/src/components/loadingSpin";
import { IFilters, IFormValue, TPaymentMethod } from "@/src/types";
import { useTransactionsParams } from "@/src/queries";
import {
  DatePicker,
  InputNumber,
  Select,
  Input,
  Button,
  Form,
  Row,
  Col,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import ExportPDFButton from "./_components/exportButton/inedex";
import { buildUrlParamsFromForm } from "@/src/utils/buildUrlParamsFromForm";

const { RangePicker } = DatePicker;
const { Option } = Select;

const statusOptions = ["all", "completed", "pending", "failed"];
const paymentMethods = ["all", "credit_card", "paypal", "bank_transfer"];

const TransactionFilter = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const searchQuery = new URLSearchParams(searchParams.toString());
  const { refetch, isLoading, data } = useTransactionsParams();

  const filters: IFilters = {
    timestamp_gte: searchQuery.get("timestamp_gte") || "",
    timestamp_lte: searchQuery.get("timestamp_lte") || "",
    id: searchQuery.get("id") || "",
    amount_gte: searchQuery.get("amount_gte") || "",
    amount_lte: searchQuery.get("amount_lte") || "",
    status: searchQuery.get("status") || "",
    "payment_method.type":
      (searchParams.get("payment_method.type") as TPaymentMethod) || "",
    "merchant.name": searchParams.get("merchant.name") || "",
  };

  const updateUrlAndRefetch = (urlParams: URLSearchParams) => {
    const newUrl = urlParams.toString()
      ? `?${urlParams.toString()}`
      : window.location.pathname;
    history.pushState(null, "", newUrl);
    refetch();
  };

  const onFinish = (values: Partial<IFormValue>) => {
    const urlParams = buildUrlParamsFromForm(values);
    updateUrlAndRefetch(urlParams);
  };

  const handleReset = () => {
    form.resetFields();
    history.pushState(null, "", window.location.pathname);
    refetch();
  };

  if (isLoading) return <LoadingSpin />;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        timestamp:
          filters.timestamp_gte && filters.timestamp_lte
            ? [dayjs(filters.timestamp_gte), dayjs(filters.timestamp_lte)]
            : undefined,
        id: filters.id || undefined,
        amount_gte: filters.amount_gte || undefined,
        amount_lte: filters.amount_lte || undefined,
        status: filters.status || "all",
        merchant: filters["merchant.name"] || undefined,
        "payment_method.type": filters["payment_method.type"] || "all",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <Form.Item name="timestamp" label="Date Range">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Amount Range">
            <Space.Compact block>
              <Form.Item name="amount_gte" noStyle>
                <InputNumber
                  placeholder="Min"
                  style={{ width: "50%" }}
                  min={0}
                />
              </Form.Item>
              <Form.Item name="amount_lte" noStyle>
                <InputNumber
                  placeholder="Max"
                  style={{ width: "50%" }}
                  min={0}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select status">
              {statusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Form.Item name="merchant.name" label="Merchant">
            <Input placeholder="Merchant name" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Form.Item name="payment_method.type" label="Payment Method">
            <Select placeholder="Select method">
              {paymentMethods.map((method) => (
                <Option key={method} value={method}>
                  {method === "all" ? "All Methods" : method.replace("_", " ")}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={24}
          md={12}
          lg={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Space wrap>
              <Button type="primary" htmlType="submit">
                Apply Filters
              </Button>
              <Button onClick={handleReset}>Reset</Button>
              <ExportPDFButton data={data || []} />
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionFilter;
