import React from 'react';
import '../../scss/components/Button.scss';


export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      type: this.props.type,
      style: this.props.style,
      disabled: this.props.disabled || false
    };
  }//end constructor

  componentDidMount() {
    if(this.props.lift) this.props.lift(this);
  }//end componentDidMount

  templateLoader() {
    return (
      <div className="container-loader"></div>
    )
  }//end templateLoader

  templateCancel() {
    return (
      <div>
        <span>{this.state.data}</span>
        <i className="material-icons">&#xE888;</i>
      </div>
    )
  }//end templateCancel

  templateConfirm() {
    return (
      <div>
        <span>{this.state.data}</span>
        <i className="material-icons">&#xE86C;</i>
      </div>
    )
  }//end templateConfirm

  templateLoadMore() {
    return (
      <div>
        <span>{this.state.data || "load more"}</span>
        <i className="material-icons">&#xE8B6;</i>
      </div>
    )
  }//end templateLoadMore


  btn(icon = "") {
    return (
      <div className={icon ? "": "noButton"}>
        {icon}
        <span>{this.state.data}</span>
      </div>
    )
  }//end btnAdd

  templateSearch() {
    return (
      <div className="show-inline">
        <i className="material-icons">&#xE8B6;</i>
      </div>
    )
  }//end templateSearch

  templateSend() {
    return (
      <div className="show-inline">
        <i className="material-icons">&#xE163;</i>
      </div>
    )
  }//end templateSend

  templateReset() {
    return (
      <div className="show-inline">
        <span>{this.state.data}</span>
        <i className="material-icons">&#xE042;</i>
      </div>
    )
  }

  render() {
    let style = this.state.style;
    let button;
    if(style === "btn-load") button = this.templateLoader();
    if(style === "btn-loadmore") button = this.templateLoadMore();
    if(style === "btn-cancel") button = this.templateCancel();
    if(style === "btn-confirm") button = this.templateConfirm();
    if(style === "btn-search") button = this.templateSearch();
    if(style === "btn-send") button = this.templateSend();
    if(style === "btn-reset") button = this.templateReset();

    if(!button) button = this.btn(this.props.icon);//default

    return (
      <div className="show-inline wrap-btn">
        <button className={ `btn ${style}` } disabled={ this.state.disabled } type={ this.state.type } onClick={ this.props.onClick }>
          { button }
        </button>
      </div>
    )
  }
};
