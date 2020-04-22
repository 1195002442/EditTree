import React, { Component } from 'react';
import {
  Tree,
  Icon,
  Modal,
  Input,
  Badge,
  message,
  Select,
  Form,
  Row,
  Col,
  Button,
  Divider,
  Tag,
} from 'antd';
import styles from './App.less';
import DetailLable from './components/DetailLable';
import AddLable from './components/AddLable';
import classNames from 'classnames';

const { confirm } = Modal;
const { TreeNode } = Tree;
const { Option } = Select;
const { CheckableTag } = Tag;
const FormItem = Form.Item;
@Form.create()
class TreeList extends Component {
  data = [
    {
      value: 'Root',
      defaultValue: 'Root',
      key: '0-1',
      parentKey: '0',
      isEditable: false, //是否可修改
      isOpera: false, //是否可操作
      status: false, //关联状态
      children: [
        {
          value: 'child-1',
          defaultValue: 'child-1',
          key: '0-1-1',
          parentKey: '0-1',
          isEditable: false,
          isOpera: false,
          status: '关联标签1',
          children: [
            {
              value: 'child-0-1-1-1',
              defaultValue: 'child-1',
              key: '0-1-1-1',
              parentKey: '0-1-1',
              isEditable: false,
              isOpera: true,
              status: '关联标签2',
              children: [
                {
                  value: '111',
                  defaultValue: 'child-1111',
                  key: '0-111',
                  parentKey: '0-1-1-1',
                  isEditable: false,
                  isOpera: true,
                  status: '关联标签3',
                },
                {
                  value: '112',
                  defaultValue: 'child-112',
                  key: '0-112',
                  parentKey: '0-1-1-1',
                  isEditable: false,
                  isOpera: false,
                  status: false,
                },
              ],
            },
            {
              value: 'child-0-1-1-2',
              defaultValue: 'child-2-1',
              key: '0-1-1-2',
              parentKey: '0-1-1',
              isEditable: false,
              isOpera: false,
              status: false,
            },
          ],
        },
        {
          value: 'child-0-1-2',
          defaultValue: 'child-0-1-2',
          key: '0-1-2',
          parentKey: '0-1',
          isEditable: false,
          isOpera: true,
          status: false,
        },
      ],
    },
  ];
  expandedKeys = [];

  state = {
    expandedKeys: [],
    data: this.data,
    editItem: {
      value: '',
      defaultValue: '',
      key: '',
      parentKey: '',
      isAddVisible: false, //新增modla
      isEditable: false, //编辑mdoal
      isDelete: false, //删除modal
      isDetailVisible: false, //详情modal
      isOver: false,
    },
    tagList: [
      { key: 1, value: '应用系统1' },
      { key: 2, value: '应用系统2' },
      { key: 3, value: '应用系统3' },
    ],
    isChangeSys: false, //切换系统model
    modifyValue: '', //修改标签value
    systemValue: '', //默认选中的系统
  };

  componentDidMount() {
    // Tip: Must have, or the parent node will not expand automatically when you first add a child node
    // this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys, this.data);
    this.expandedKeys = expandedKeys;
    this.setState({ expandedKeys: expandedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.isEditable) {
        // item.title = (
        //     <div>
        //         <input
        //             className={styles.inputField}
        //             value={item.value}
        //             onChange={(e) => this.onChange(e, item.key)} />
        //         <Icon type='close' style={{ marginLeft: 10 }} onClick={() => this.onClose(item.key, item.defaultValue)} />
        //         <Icon type='check' style={{ marginLeft: 10 }} onClick={() => this.onSave(item.key)} />
        //     </div>
        // );
      } else if (!item.isOpera) {
        item.title = (
          <div className={styles.isOpera}>
            <span className={classNames(styles['item-label'], styles['item-deep'])}>
              {' '}
              {item.value}
            </span>
          </div>
        );
      } else {
        item.title = (
          <div className={styles.titleContainer}>
            <span className={styles['item-label']}>
              {' '}
              <Badge color={item.status ? '#87d068' : '#aaa'} />
              {item.value}
            </span>
            <span className={styles.operationField}>
              {item.status && (
                <Icon className={styles.icon} type="read" onClick={() => this.onDetail(item.key)} />
              )}
              <Icon className={styles.icon} type="plus" onClick={() => this.onAdd(item)} />
              <Icon
                className={styles.icon}
                type="edit"
                onClick={() => this.onEdit(item.key, item)}
              />

              {item.parentKey === '0' ? null : (
                <Icon
                  className={styles.icon}
                  type="minus"
                  onClick={() => this.onDelete(item.key)}
                />
              )}
            </span>
          </div>
        );
      }

      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode {...item} />;
    });
  /**
   * 查看详情
   */
  onDetail = e => {
    console.log('详情', e);
    this.setState({
      isDetailVisible: true,
      id: e.key,
    });
  };
  detailCancel = () => {
    this.setState({
      isDetailVisible: false,
    });
  };
  /**
   * 新增
   */
  addCancel = () => {
    this.setState({
      isAddVisible: false,
    });
  };
  addOk = e => {
    // console.log('新增', e);
    let { node, addValue } = this.state;
    this.addNode(node, this.data, e);
    this.setState({
      expandedKeys: this.expandedKeys,
      data: this.data,
      isAddVisible: false,
    });
  };
  onAdd = e => {
    // console.log('add');
    // 防止expandedKeys重复
    // Tip: Must have, expandedKeys should not be reduplicative
    if (this.state.expandedKeys.indexOf(e) === -1) {
      this.expandedKeys.push(e);
    }
    this.setState({
      isAddVisible: true,
      node: e,
      expandedKeys: this.expandedKeys,
    });
    // this.addNode(e, this.data);
    // this.setState({
    //   expandedKeys: this.expandedKeys,
    //   data: this.data
    // });
  };
  addNode = (node, data, formValue) =>
    data.map(item => {
      if ((formValue.generateType == 0 || formValue.generateType == 1) && node.parentKey == 0) {
        message.error('根标签不可新增父级和同级标签');
        return;
      }
      if (formValue.generateType == 1 && item.key === node.parentKey) {
        //新建同级
        console.log('新建同级', node);
        // if (item.children) {
          (item.children ||[]).push({
            value: formValue.labelName,
            defaultValue: 'default',
            key: node.key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
            parentKey: item.key,
            isEditable: false,
            isOpera: true,
            status:formValue.linkLabel
          });
        return;
      } else if (formValue.generateType == 2 && item.key == node.key) {
        //新建子级
        if (item.children) {
          item.children.push({
            value: formValue.labelName,
            defaultValue: 'default',
            key: node.key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
            parentKey: node.key,
            isEditable: false,
            isOpera: true,
            status:formValue.linkLabel
          });
        } else {
          item.children = [];
          item.children.push({
            value: formValue.labelName,
            defaultValue: 'default',
            key: node.key + Math.random(100),
            parentKey: node.key,
            isEditable: false,
            isOpera: true,
            status:formValue.linkLabel
          });
        }
        return;
      }
      if (item.children) {
        this.addNode(node, item.children, formValue);
      }
    });

  /**
   * 删除
   */
  onDelete = key => {
    console.log('delete');
    const { dispatch } = this.props;
    confirm({
      title: '确认删除此标签吗?',
      icon: <Icon type="exclamation-circle" />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        // dispatch({
        //   type: 'tagManagementModal/getEmploy',
        //   payload: {
        //     id: record.labelId,
        //   },
        //   callback: res => {

        //   },
        // });
        this.deleteNode(key, this.data);
        this.setState({
          data: this.data,
        });
      },
    });
    // this.deleteNode(key, this.data);
  };
  deleteCancel = key => {
    this.setState({
      isDelete: false,
    });
  };
  deleteOk = key => {
    this.deleteNode(key, this.data);
    this.setState({
      isDelete: false,
    });
  };
  deleteNode = (key, data) =>
    data.map((item, index) => {
      if (item.key === key) {
        data.splice(index, 1);
        message.success('删除成功');
        return;
      } else {
        if (item.children) {
          this.deleteNode(key, item.children);
        }
      }
    });

  /**
   * 编辑
   */
  onEdit = (key, item) => {
    console.log('edit');
    this.setState({
      editVisiable: true,
      key,
      editItem: item,
      modifyValue: item.value,
    });
    // this.editNode(key, this.data);
    // this.setState({
    //   data: this.data
    // });
  };
  editNode = (key, data, value) =>
    data.map(item => {
      console.log('编辑', value, item);
      if (item.key === key) {
        item.isEditable = true;
      } else {
        item.isEditable = false;
      }
      //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
      item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
      if (item.children) {
        this.editNode(key, item.children, value);
      }
    });
  editOk = () => {
    let { key, editValue } = this.state;
    this.setState({
      editVisiable: false,
    });
    this.editNode(key, this.data, editValue);
    this.setState({
      data: this.data,
    });
  };
  editCancel = () => {
    this.setState({
      editVisiable: false,
    });
  };
  /**
   * 保存编辑
   */
  onSave = key => {
    console.log('save');
    // this.saveNode(key, this.data);
    this.changeNode(key, this.state.modifyValue, this.data);
    this.setState({
      data: this.data,
      editVisiable: false,
    });
  };

  //修改标签名称
  onModifyChange = (e, editItem) => {
    // this.changeNode(editItem.key, e.target.value, this.data);
    this.setState({
      data: this.data,
      modifyValue: e.target.value,
    });
  };

  changeNode = (key, value, data) =>
    data.map(item => {
      if (item.key === key) {
        item.value = value;
      }
      if (item.children) {
        this.changeNode(key, value, item.children);
      }
    });
  /**
   * 取消编辑
   */
  onClose = (key, value) => {
    console.log('close', key, value);
    this.closeNode(key, value, this.data);
    this.setState({
      data: this.data,
      editVisiable: false,
    });
  };
  closeNode = (key, value, data) =>
    data.map(item => {
      item.isEditable = false;
      if (item.key === key) {
        console.log('close', key, value, item);
        item.value = value;
      }
      if (item.children) {
        this.closeNode(key, value, item.children);
      }
    });
  /**
   * 拖拽
   */
  onDrop = info => {
    const dropKey = info.node.props.eventKey; //拖拽的父级key
    const dragKey = info.dragNode.props.eventKey; //拖拽的当前对象key
    // const dragIsOpera = info.dragNode.props.isOpera    //拖拽的当前对象是否可操作
    const dragIsOpera = info.dragNode.props.children
      ? info.dragNode.props.dataRef.isOpera
      : info.dragNode.props.isOpera; //拖拽的目标对象是否可操作
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log('拖拽',info,)
    // console.log('info.dropPosition',info.dropPosition)

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.data];
    if (!dragIsOpera) {
      // console.log('不可编辑',dragIsOpera)
      return;
    }
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      //拖到内部
      // Drop on the content
      dragObj.parentKey = dropKey   //改变父级key
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      // console.log('进入2222',dropKey)
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.dropToGap && info.dropPosition == -1 && dropKey == '0-1' && dropPosition == -1) ||
      (!info.dropToGap && info.dropPosition == 0 && dropKey == '0-1' && dropPosition == 0)
    ) {
      //不允许拖到根节点外部
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // console.log('进入3333',dropKey)
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    // const { dispatch } =this.props
    // dispatch({
    //   type: 'tagManagementModal/getEmploy',
    //   payload: {
    //     id: record.labelId,
    //   },
    //   callback: res => {

    //   },
    // });
    this.setState({
      data: data,
    });
  };

  onDragEnter = info => {
    console.log('拖拽enter', info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  /**
   * 搜索条件
   */
  renderSearch() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="vertical" className={styles['search-form-con']}>
        <Row gutter={16}>
          <Col lg={8} md={8} sm={10}>
            <FormItem label="标签名称">
              {getFieldDecorator('labelName', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入标签实例名称" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={10}>
            <FormItem label="标签实例编号">
              {getFieldDecorator('labelCode', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入标签实例编号" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={2}>
            <Button type="primary" htmlType="submit" icon="search" style={{ marginTop: 28 }}>
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  /**
   * 通过条件查询
   */
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('表单', fieldsValue);
      //  dispatch({
      //     type: 'tagManagementModal/getEmploy',
      //     fieldsValue,
      //     callback: res => {

      //     },
      //   });
    });
  };
  /**
   * 切换系统
   */
  changeSystem = () => {
    this.setState({
      isChangeSys: true,
    });
  };
  changeSystemValue = e => {
    const { dispatch } = this.props;
    console.log('eeeee', e);
    this.setState({
      systemValue: e,
    });
    //  dispatch({
    //     type: 'tagManagementModal/getEmploy',
    //     payload:{
    // systemId:systemValue
    // },
    //     callback: res => {

    //     },
    //   });
  };
  systemCancel = () => {
    this.setState({
      isChangeSys: false,
    });
  };
  systemOk = () => {
    console.log('切换');
    this.setState({});
    this.systemCancel();
  };
  /**
   * 重置
   */
  resetClick = () => {
    // const {dispatch } =this.props
    //  dispatch({
    //     type: 'tagManagementModal/getEmploy',
    //     payload:{
    // systemId:systemValue
    // },
    //     callback: res => {
    //     },
    //   });
  };
  render() {
    const {
      isAddVisible,
      editVisiable,
      editItem,
      isDetailVisible,
      id,
      modifyValue,
      isChangeSys,
      tagList,
      systemValue,
    } = this.state;
    return (
        <div className={styles.treeList}>
          <div className={styles.renderser}>
            {this.renderSearch()}
            {/* <Divider/> */}
          </div>
          <div>
            <Button type="primary" className={styles.changeSys} onClick={this.changeSystem}>
              切换系统
            </Button>
            <Button type="ghost" onClick={this.resetClick}>
              重置
            </Button>
          </div>
          <Tree
            className={styles['draggable-tree']}
            defaultExpandAll={true}
            showLine
            // expandedKeys={this.state.expandedKeys}
            selectedKeys={[]}
            onExpand={this.onExpand}
            draggable
            blockNode
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
          >
            {this.renderTreeNodes(this.state.data)}
          </Tree>
          {/* 详情 */}
          <Modal
            title="标签详情"
            visible={isDetailVisible}
            destroyOnClose={true}
            onCancel={this.detailCancel}
            onOk={this.detailOk}
            footer={null}
            centered
          >
            <DetailLable cancel={this.detailCancel} id={id} />
          </Modal>
          {/* 新增 */}
          <Modal
            title="新增标签"
            visible={isAddVisible}
            destroyOnClose={true}
            onCancel={this.addCancel}
            onOk={this.addOk}
            footer={null}
            centered
            width="500px"
          >
            <AddLable Cancel={this.addCancel} addOk={this.addOk} />
          </Modal>
          {/* 编辑 */}
          <Modal
            title="修改标签"
            visible={editVisiable}
            destroyOnClose={true}
            onCancel={() => this.onClose(editItem.key, editItem.value)}
            onOk={() => this.onSave(editItem.key)}
            centered
            // width="800px"
          >
            <div className={styles.modifyModal}>
              <div className={styles.modifyform}>
                <span className={styles.labeltext}>
                  <span className={styles.required}>*</span>标签名称：
                </span>
                <Input
                  className={styles.inputField}
                  defaultValue={editItem.value}
                  value={modifyValue}
                  onChange={e => this.onModifyChange(e, editItem)}
                />
              </div>
              <div className={styles.modifyform}>
                <span className={styles.labeltext}> 关联实例：</span>
                <Select placeholder="请选择标签实例" style={{ width: 240 }}>
                  <Option value="1">标签名称1</Option>
                  <Option value="2">标签名称2</Option>
                </Select>
              </div>
            </div>
          </Modal>
          {/* 切换系统 */}
          <Modal
            title="切换系统"
            visible={isChangeSys}
            destroyOnClose={true}
            onCancel={this.systemCancel}
            onOk={this.systemOk}
            // footer={null}
            centered
            width="500px"
          >
            <div style={{ textAlign: 'center' }}>
              {tagList.map(item => {
                return (
                  <Tag
                    onClick={() => this.changeSystemValue(item.key)}
                    className={
                      systemValue == item.key
                        ? classNames(styles.activeTag, styles.tagItem)
                        : styles.tagItem
                    }
                  >
                    {item.value}
                  </Tag>
                );
              })}
            </div>
          </Modal>
        </div>
    );
  }
}

export default TreeList;
