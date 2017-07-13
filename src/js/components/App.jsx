import React from 'react';
import { connect } from 'react-redux';
import { fetchData, create } from '../actions/userActions.js';
import { store } from '../stores/userStore.js';
import PopUp from './PopUp.jsx';
import Form from './Form.jsx';
import Mask from './Mask.jsx';

const mapStateToProps = (state) => {
  return {
    users: state.users.data
  }
}

@connect(mapStateToProps)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.childrens = {};
    this.state = {
      currentSlide: "primero"
    }
  }//end constructor

  componentDidMount() {
   // this.requestData();
   this.initializeMask.bind(this)()
  }//end componentDidMount

  async requestData() {
    this.props.dispatch({type: "LOADER", modals: this.childrens});
    try {
      let response = await fetchData(`/user/showAll`, this.childrens);
      this.props.dispatch(response);
    } catch (e) {
      this.props.dispatch(e);
    }

  }//end requestData

  async requestCreate(data = {}) {
    let mask = this.childrens.mask;
    //mask.fitElements();
    /*
    this.props.dispatch({type: "LOADER", modals: this.childrens});
    try {
      let response = await create(`/user/create`, data, this.childrens);
      this.props.dispatch(response);
    } catch (e) {
      this.props.dispatch(e);
    }
    */
  }//end requestCreate

  renderUserList() {
    return this.props.users.map((element, index) => {
      return (
        <li key={ index }>{ element.name }</li>
      )
    })
  }//end renderUserList

  closePopUp(popup) {
    popup.modal.closePopUp();
  }//end closePopUp

  confirm(popup) {
    popup.modal.closePopUp();
  }//end confirm

  addChildren(name, child) {
   this.childrens[name] = child;
  }//end addChildren

  openConfirmPopUp() {
    this.childrens.confirm.modal.openPopUp();
  }//end openPopUp

  async initializeMask() {
    const mask = this.childrens.mask;
    //mask.initialize();
  }//end initializeMask

  resetMask() {
    this.childrens.mask.reset();
  }//end resetMask

  render() {

    return (
      <div>
        <h1>USERS</h1>

        <section>

         <section>
          <ol>
            { this.renderUserList.bind(this)() }
          </ol>
          <button onClick={ this.openConfirmPopUp.bind(this) }>Click me</button>
        </section>

          <PopUp
            lift={ this.addChildren.bind(this, "confirm") }
            id="createUser"
            animation={ "rebound" }
            full={ false }
            type="custom"
            data={<h1>TEST</h1>}
           />

          <Mask
              lift={ this.addChildren.bind(this, "mask") }
              animation={ "appear" }
              delay={ 100 }
              forwardEnd={ false }
              forwardStart={ false }
              noArrows={ false }
              transitionTime={ 400 }
              navigationControls={ true }
              data={
              [
                <div className="current uno" id="primero">
                  <img src="http://xpatnation.com/wp-content/uploads/2015/05/corso-barman.jpg"/>
                </div>,
                <div id="segundo">
                  <img src="https://www.expertlychosen.com/images/1057.jpg?width=1000&height=500&mode=crop"/>
                </div>,
                <div id="tercero">
                  <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F28295271%2F107843312599%2F1%2Foriginal.jpg?w=1000&rect=0%2C0%2C960%2C480&s=ccd37cb6fef06c223543e0dbb3df5f5f"/>
                </div>
                ]
            }
          />


       {
          /*
          <PopUp
            lift={ this.addChildren.bind(this, "loader") }
            id="loadSpin"
            animation={ "rebound" }
            fullOnce={ true }
            type="load"
          />
          */
        }

        </section>
      </div>
      )
  }//end render
}
