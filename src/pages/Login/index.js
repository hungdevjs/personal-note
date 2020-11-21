import React from "react"
import { Form, Input, Button, Checkbox, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const { Text } = Typography

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values)
  };

  return <div className="login-container">
    <Form
      name="normal_login"
      style={{ width: "300px" }}
      initialValues={{
        email: "",
        password: ""
      }}
      onFinish={onFinish}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong type="danger" style={{ fontSize: "1.15em" }}>
          PERSONAL UTILS
      </Text>
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  </div>
}

export default Login