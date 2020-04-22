import React from 'react';
import { Card, Form,Button, Divider } from 'antd';

/**
 * 标签树的标签详情modal
 */

@Form.create()
class DeatilLabel extends React.Component {
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
    this.getlabelDetail();
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
      this.getlabelDetail();
    }
  }
/**
 * 获取详情接口
 */
  getlabelDetail = () => {};
 
  cancel = () => {
    this.props.cancel();
  };
  render() {
    return (
      <Card bordered={false} className='detailModal'>
        <div className='table-con'>
          <table className='tabledel' border="1">
            <tr>
              <th>标签名称</th>
              <td colSpan={'4'}>
                <span type="danger">{'标签名称'}</span>
              </td>
              <th>覆盖量</th>
              <td>
                <span type="danger">{'覆盖量'}</span>
              </td>
            </tr>
            <tr>
              <th>标签实例名称</th>
              <td colSpan={"4"}>
                <span>{'标签实例名称'}</span>
              </td>
              <th>标签实例编号</th>
              <td>
                <span>{'标签实例编号'}</span>
              </td>
            </tr>
            <tr>
              <th>生成规则描述</th>
              <td colSpan={'7'}>
                <span type="danger">{'生成规则描述'}</span>
              </td>
            </tr>
            <tr>
              <th>父标签</th>
              <td colSpan={'6'}>
                <span type="danger">{'高等教育学历'}</span>
              </td>
            </tr>
            <tr>
              <th>子标签</th>
              <td colSpan={'6'}>
                <span type="danger">{('海外本科学历', '海外本科学历')}</span>
              </td>
            </tr>
          </table>
        </div>
        <Divider />
        <Button onClick={this.cancel} style={{ marginRight: 10, float: 'right' }}>
          取消
        </Button>
      </Card>
    );
  }
}

export default DeatilLabel;
