import React, { Fragment } from 'react';
import { Card, Form, Table, Badge, Button, Divider, Select, Input } from 'antd';
import style from './index.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormItem = Form.Item;
const { Option } = Select;
/**
 * 标签树的标签详情modal
 */
@Form.create()
class AddlLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
  }

  /**
   * 初始化请求数据
   */
  componentDidMount() {
    // this.getlabelDetail();
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props;
    if (id !== state.id) {
      return { id: props.id };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // this.getlabelDetail();
    }
  }

  getlabelDetail = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tagManagementModal/getDet',
      payload: {
        id: this.state.id,
      },
    });
  };

  cancel = () => {
    this.props.Cancel();
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { page, limit } = this.state;
    let formValue = {};
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const newFieldValue = fieldsValue;
      formValue = newFieldValue;
      console.log('表单内容', fieldsValue);
    });
    this.props.addOk(formValue);
  };
  render() {
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Card bordered={false} className={style.detailModal} loading={loading}>
        <div className={style['table-con']}>
          <Form onSubmit={this.handleSearch} {...layout} className={style['search-form-con']}>
            <FormItem label="新建类型">
              {getFieldDecorator('generateType', {
                rules: [
                  {
                    required: true,
                    message: '标签实例必填',
                  },
                ],
              })(
                <Select placeholder="请选择标签类型">
                  {/* <Option value="0">父级标签</Option> */}
                  <Option value="1">同级标签</Option>
                  <Option value="2">子标签</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="标签实例名称">
              {getFieldDecorator('labelName', {
                rules: [
                  {
                    required: true,
                    message: '标签实例名称必填',
                  },
                ],
              })(<Input placeholder="请输入关联实例" />)}
            </FormItem>
            <FormItem label="关联实例">
              {getFieldDecorator('linkLabel', {
                rules: [
                  {
                    required: false,
                    message: '请选择关联实例',
                  },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="1">标签名称1</Option>
                  <Option value="2">标签名称2</Option>
                </Select>
              )}
            </FormItem>
            <Divider />
            <div style={{ overflow: 'hidden', textAlign: 'right' }}>
              <div>
                <Button style={{ marginRight: 20 }} onClick={this.cancel}>
                  {' '}
                  取消{' '}
                </Button>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    );
  }
}

export default AddlLabel;
