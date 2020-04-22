import React, { Component } from 'react';
import { Tree,Icon,Modal,Input,Badge,message,Select,Form } from 'antd';
import  './App.less';
import DetailLable from './components/DetailLable';
import AddLable from './components/AddLable';

const { confirm } = Modal;
const { TreeNode } = Tree;
const { Option } = Select;
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
            {
              value: 'child-0-1-1-3',
              defaultValue: 'child-3-1',
              key: '0-1-1-3',
              parentKey: '0-1-1',
              isEditable: false,
              isOpera: true,
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
    modifyValue: '', //修改标签value
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
      if (!item.isOpera) {
        item.title = (
          <div className="isOpera">
            <span className='item-label  item-deep'>
              {' '}
              {item.value}
            </span>
          </div>
        );
      } else {
        item.title = (
          <div className='titleContainer'>
            <span className='item-label'>
              {' '}
              <Badge color={item.status ? '#87d068' : '#aaa'} />
              {item.value}
            </span>
            <span className='operationField'>
              {item.status && (
                <Icon className='icon' type="read" onClick={() => this.onDetail(item.key)} />
              )}
              <Icon className='icon' type="plus" onClick={() => this.onAdd(item)} />
              <Icon
                className='icon'
                type="edit"
                onClick={() => this.onEdit(item.key, item)}
              />

              {item.parentKey === '0' ? null : (
                <Icon
                  className='icon'
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
    },()=>this.onExpand(this.expandedKeys));
  };
  onAdd = e => {
    // 防止expandedKeys重复
    // Tip: Must have, expandedKeys should not be reduplicative
    if (this.state.expandedKeys.indexOf(e.key) === -1) {
      this.expandedKeys.push(e.key);
    }
    this.setState({
      isAddVisible: true,
      node: e,
      expandedKeys: this.expandedKeys,
    });
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
        this.deleteNode(key, this.data);
        this.setState({
          data: this.data,
        });
      },
    });
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
  };
  editNode = (key, data, value) =>
    data.map(item => {
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
    this.changeNode(key, this.state.modifyValue, this.data);
    this.setState({
      data: this.data,
      editVisiable: false,
    });
  };

  //修改标签名称
  onModifyChange = (e, editItem) => {
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
    // console.log('拖拽',info,)
    // console.log('info.dropPosition',info.dropPosition,'dropkey',dropKey,'dragkey',dragKey,'dropPosition',dropPosition,'infodropGap',info.dropPosition)

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
      // console.log('拖到内部',dropKey)
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
      dragObj.parentKey = dropKey  
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.dropToGap && info.dropPosition == -1 && dropKey == '0-1' && dropPosition == -1) ||
      (!info.dropToGap && info.dropPosition == 0 && dropKey == '0-1' && dropPosition == 0)
      // (info.dropToGap && info.dropPosition == -1  && dropPosition == -1) ||
      // (!info.dropToGap && info.dropPosition == 0  && dropPosition == 0)
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
      dragObj.parentKey  = info.node.props.children?info.node.props.dataRef.parentKey : info.node.props.parentKey
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
    this.setState({
      data: data,
    });
  };

  onDragEnter = info => {
    // console.log('拖拽enter', info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  render() {
    const {
      isAddVisible,
      editVisiable,
      editItem,
      isDetailVisible,
      id,
      modifyValue,
    } = this.state;
    return (
        <div className='treeList'>
          <Tree
            className='draggable-tree'
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
            <div className='modifyModal'>
              <div className='modifyform'>
                <span className='labeltext'>
                  <span className='required'>*</span>标签名称：
                </span>
                <Input
                  className='inputField'
                  defaultValue={editItem.value}
                  value={modifyValue}
                  onChange={e => this.onModifyChange(e, editItem)}
                />
              </div>
              <div className='modifyform'>
                <span className='labeltext'> 关联实例：</span>
                <Select placeholder="请选择标签实例" style={{ width: 240 }}>
                  <Option value="1">标签名称1</Option>
                  <Option value="2">标签名称2</Option>
                </Select>
              </div>
            </div>
          </Modal>
        </div>
    );
  }
}

export default TreeList;
