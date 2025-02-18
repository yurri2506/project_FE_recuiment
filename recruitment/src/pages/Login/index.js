import * as company from "../../services/companyService";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { rules } from "../../contants";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const data = await company.login(values.email, values.password);
    if (data.length > 0) {
      const time = 1;
      setCookie("id", data[0].id, time);
      setCookie("companyName", data[0].companyName, time);
      setCookie("email", data[0].email, time);
      setCookie("token", data[0].token, time);
      dispatch(checkAuthen(true));
      navigate("/");
    } else {
      messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <>
      {contextHolder}

      <Row justify="center">
        <Col span={12}>
          <Card title="Đăng nhập">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;