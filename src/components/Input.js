import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Icon } from 'react-fa';

import 'styles/components/Input.scss';

const inputConfig = {
  loadingIconName: 'circle-o-notch',
};

class Input extends Component {
  static propTypes = {
    // input
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,

    // state
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    loading: PropTypes.bool,

    // actions
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,

    // label
    label: PropTypes.node,

    // error
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),

    // icon
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    onIconClick: PropTypes.func,
    iconClassName: PropTypes.string,

    // html options
    options: PropTypes.arrayOf(PropTypes.string),

    // settings
    fullWidth: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.getIcon = this.getIcon.bind(this);

    this.id = props.id ? null : _.uniqueId('input');
  }

  getIcon() {
    if (typeof this.props.icon === 'string') {
      return (
        <Icon
          className={
            classnames('Input__Icon', this.props.iconClassName)
          }
          onClick={this.props.onIconClick}
          name={this.props.icon}
        />
      );
    }
    return (
      <div
        className={classnames('Input__Icon', this.props.iconClassName)}
        onClick={this.props.onIconClick}
      >
        {this.props.icon}
      </div>
    );
  }

  render() {
    const id = this.props.id || this.id;

    return (
      <div
        className={classnames(
          'Input',
          {
            'Input--error': this.props.error,
            'Input--loading': this.props.loading,
            'Input--withIcon': this.props.icon,
            'Input--iconRight': this.props.iconPosition === 'right',
            'Input--fullWidth': this.props.fullWidth,
          },
          this.props.className
        )}>
        {this.props.label ? <label className="Input__label" htmlFor={id}>{this.props.label}</label> : null}
        <input
          id={id}
          list={this.props.options ? `${id}list` : null}
          className="Input__input"
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          checked={this.props.checked}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyDown={this.props.onKeyDown}
        />

        {this.props.icon ? this.getIcon() : null}
        {this.props.loading ? <Icon className="Input__loadingIcon" name={inputConfig.loadingIconName} spin /> : null}

        {this.props.error
          ? <div className="Input__error">
            {Array.isArray(this.props.error)
              ? <ul>
                {this.props.error.map(error => <li key={error}>{error}</li>)}
              </ul>
              : this.props.error}
          </div>
          : <div className="Input__error" />}

        {this.props.options
          ? <datalist id={`${id}list`}>
            {this.props.options.map(option => <option key={option} value={option} />)}
          </datalist>
          : null}
      </div>
    );
  }
}

export default Input;
