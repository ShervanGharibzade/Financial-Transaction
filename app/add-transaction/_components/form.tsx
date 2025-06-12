"use client";

import { postTransaction } from "@/src/api";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import Link from "next/link";
import { TransactionInput } from "@/src/types";

const { Option } = Select;

const currencyOptions = ["USD", "EUR", "IRR"];
const statusOptions = ["completed", "pending", "failed"];
const paymentTypes = ["credit_card", "paypal", "bank_transfer"];
const brands = ["visa", "mastercard", "amex"];

const FormTransaction = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const mutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: () => {
      success();
      form.resetFields();
    },
    onError: () => {
      error();
    },
  });

  const onFinish = (values: TransactionInput) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 20 }}
      initialValues={{
        currency: "USD",
        "payment_method.brand": "visa",
        "payment_method.type": "credit_card",
        status: "completed",
      }}
    >
      <Link href={"/"}>
        <Button style={{ marginBottom: 20 }} type="primary">
          Back to dashboard
        </Button>
      </Link>
      <Row gutter={16}>
        {contextHolder}
        <Col span={12}>
          <Form.Item
            name="id"
            label="Transaction ID"
            rules={[{ required: true, message: "Please enter ID" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true }]}
          >
            <Select>
              {currencyOptions.map((cur) => (
                <Option key={cur} value={cur}>
                  {cur}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              {statusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="timestamp"
            label="Timestamp"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={["merchant", "name"]}
            label="Merchant Name"
            rules={[{ required: true, message: "Merchant ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["merchant", "id"]}
            label="Merchant ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={["payment_method", "type"]}
            label="Payment Type"
            rules={[{ required: true, message: "Payment is required" }]}
          >
            <Select>
              {paymentTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={["payment_method", "brand"]}
            label="Card Brand"
            rules={[{ required: true, message: "Card Brand is required" }]}
          >
            <Select>
              {brands.map((b) => (
                <Option key={b} value={b}>
                  {b}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={["payment_method", "last4"]}
            label="Last 4 Digits"
            rules={[{ required: true, message: "Last 4 Digits is required" }]}
          >
            <Input maxLength={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={["sender", "name"]}
            label="Sender Name"
            rules={[{ required: true, message: "Sender name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["sender", "account_id"]}
            label="Sender Account ID"
            rules={[{ required: true, message: "Sender ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={["receiver", "name"]}
            label="Receiver Name"
            rules={[{ required: true, message: "Receiver name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["receiver", "account_id"]}
            label="Receiver Account ID"
            rules={[{ required: true, message: "Receiver ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={["fees", "processing_fee"]}
            label="Processing Fee"
            rules={[{ required: true, message: "Processing Fee  is required" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["fees", "currency"]}
            label="Fee Currency"
            rules={[{ required: true, message: "Fee Currency is required" }]}
          >
            <Select>
              {currencyOptions.map((cur) => (
                <Option key={cur} value={cur}>
                  {cur}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={["metadata", "order_id"]}
            label="Order ID"
            rules={[{ required: true, message: "Order ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["metadata", "customer_id"]}
            label="Customer ID"
            rules={[{ required: true, message: "Customer ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 16 }}
            disabled={mutation.isPending}
          >
            Submit Transaction
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormTransaction;
