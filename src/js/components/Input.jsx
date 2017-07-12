import React from 'react';
import '../../scss/components/Input.scss';


export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      warning: false,
      msgStyle: "valid",
      valid: false,
      title: this.props.title,
      whantBtnSubmit: this.props.whantBtnSubmit,
      type: this.props.type,
      defaultMessage: this.props.defaultMessage
    };
  }

  componentDidMount() {
    if(this.props.lift) this.props.lift(this);
  }//end componentDidMount

  bindValue(self) {
    return function (e) {
      let canditate = e.target.value;
      if(canditate.length === 0) return self.showWarning();
      let isValid = self.validate(canditate);
      if(isValid) {
        self.hideMsg();
        self.setState({value: canditate, valid: true, defaultMessage: self.props.defaultMessage});
      } else {
        self.showError();
      }
    }
  }//end bindValue

  validate(canditate = "") {
    let min = this.props.validateMin;
    let max = this.props.validateMax
    if(min && !max) {
      //in case with just minimum
      return this.props.pattern(canditate) && canditate.length >= min;
    } else if(!min && max){
      //in case with just maximum
      return this.props.pattern(canditate) && canditate.length <= max;
    } else if(min && max) {
      //in case of both
      return this.props.pattern(canditate) && canditate.length >= min && canditate.length <= max;
    } else {
      //in case no min no max
      return this.props.pattern(canditate);
    }
  }//end validate

  hideMsg() {
    this.setState({error: false, warning: false, msgStyle: 'valid'});
  }//end hideMsg

  showError() {
    this.setState({defaultMessage: '', error: true, warning: false, msgStyle: 'invalid', valid: false});
  }//end showError

  showWarning() {
    this.setState({defaultMessage: '',error: false, warning: true, msgStyle: 'empty', valid: false});
  }//end showWarning

  inputText({msgWarning, msgError, defaultMessage = ""}) {
    let hideDefault = defaultMessage.length ? "show" : "hide";
    return (
      <div className="field">
        <input type={this.state.type} name={ this.props.name } id={ this.props.id } autoComplete={ this.props.autoComplete } className={"field-input "+(this.state.msgStyle )} title={ this.props.title } placeholder={ this.props.placeholder } onChange={ this.bindValue(this) } />
        <small className={ `input-msg default ${hideDefault}` }>{ defaultMessage }</small>
        <small className={ `input-msg error ${msgError}` }>Invalid field</small>
        <small className={ `input-msg warning ${msgWarning}` }>Empty field</small>
      </div>
    )
  }//end inputText

  render() {
    let isDate = this.props.type === "date";
    let msgError = !this.state.error ? "hide" : "";
    let msgWarning = !this.state.warning ? "hide" : "";
    let pushMsg = this.state.icon === false ? "":"push-msg";
    let defaultMessage = this.state.defaultMessage;
    return (
      <div className="show-inline wrap-input">
        {
          this.inputText({msgWarning, msgError, pushMsg, defaultMessage})
        }
      </div>
    )
  }//end render
}
