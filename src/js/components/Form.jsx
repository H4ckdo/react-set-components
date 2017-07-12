import React from 'react';
import $ from 'jquery';
import '../../scss/components/Form.scss';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { validWord } from '../utils';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.childrens = {};
    if(this.props.lift) this.props.lift(this);
  }//end constructor

  addChildren(name, child) {
   this.childrens[name] = child;
  }//end addChildren

  templateCreate() {
    return (
      <div>
        <div className="columns large-12">
          <div className="row">
            <i className="material-icons field-icon">&#xE851;</i>
            <span className="field-title">Name</span>
            <Input lift={ this.addChildren.bind(this, "name") } defaultMessage="Field required" name="name" id="name-input" title="Name" placeholder="Complete this field" type="text" pattern={ validWord }/>
          </div>
        </div>

        <div className="row wrap-popup-options">
          <div className="columns large-6">
            <Button type="reset" data="Reset" style="btn-reset"/>
          </div>

          <div className="columns large-6">
            <Button type="submit" data="Submit" style="btn-confirm"/>
          </div>
        </div>{/*end wrap-popup-options*/}
      </div>
    )
  }//end templateCreate

  mapChildrens(childrens = {}) {
    let result = {};
    Object.keys(childrens).map(child => {
      let { state, props } = this.childrens[child];
      result[props.name] = state.value;
    })
    return result;
  }//end mapChildrens

  allValid(e) {
    e.preventDefault();
    let validForm = Object.keys(this.childrens).every(child => this.childrens[child].state.valid);
    if(validForm) {
      document.getElementById(this.props.id).reset();
      Object.keys(this.childrens).forEach(child => this.childrens[child].setState({valid: false}));
      return this.props.onSubmit(this.mapChildrens(this.childrens));
    }
  }//end allValid

  render() {
    let result;
    let type = this.props.type;
    if(type === "create") result = this.templateCreate.bind(this)();

    return (
      <form className="wrap-form" id={ this.props.id } onSubmit={ this.allValid.bind(this) } >
        { result }
      </form>
    )
  }//end render
}
