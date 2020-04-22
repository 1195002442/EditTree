import React from 'react';
// import { routerRedux } from 'dva/router';
import { Card, Form, Table, Badge, Button, Divider } from 'antd';
import style from './index.less';

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
  getlabelDetail = () => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'tagManagementModal/getDet',
    //   payload: {
    //     id: this.state.id,
    //   },
    // });
  };
 
  cancel = () => {
    this.props.cancel();
  };
  render() {
    const {
      tagManagementModal: { listDet },
      loading,
    } = this.props;
    const labelList = listDet || [];
    console.log('labkle', labelList);
    return (
      <Card bordered={false} className={style.detailModal} loading={loading}>
        <div className={style['table-con']}>
          <table className={style.tabledel} border="1">
            <tr>
              <th>标签名称</th>
              <td colSpan={'4'}>
                <span type="danger">{labelList.name || '标签名称'}</span>
              </td>
              <th>覆盖量</th>
              <td>
                <span type="danger">{labelList.coverCount || '覆盖量'}</span>
              </td>
            </tr>
            <tr>
              <th>标签实例名称</th>
              <td colSpan={"4"}>
                <span>{labelList.name || '标签实例名称'}</span>
              </td>
              <th>标签实例编号</th>
              <td>
                <span>{labelList.code || '标签实例编号'}</span>
              </td>
            </tr>
            <tr>
              <th>生成规则描述</th>
              <td colSpan={'7'}>
                <span type="danger">{labelList.ruleDescription || '生成规则描述'}</span>
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
