import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import  './index.less';

export default class EditableItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: false,
    };
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  check = () => {
    this.setState({ editable: false });
    const { value } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className='editableItem'>
        {editable ? (
          <div className='wrapper'>
            <Input value={value} onChange={this.handleChange} onPressEnter={this.check} />
            <Icon type="check" className='icon' onClick={this.check} />
          </div>
        ) : (
          <div className='wrapper'>
            <span>{value || ' '}</span>
            <Icon type="edit" className='icon' onClick={this.edit} />
          </div>
        )}
      </div>
    );
  }
}
