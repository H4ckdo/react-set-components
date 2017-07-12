import $ from 'jquery';
import { mapActions } from '../utils';

const responseCases = {
  success: [
    {
      type: "PAINT_DATA",
      status: [200]
    },
    {
      type: "CREATED_DATA",
      status: [201]
    }
  ],
  fails: [
    {
      type: "ERROR_UI",
      status: [400]
    },
    {
      type: "NOT_FOUND",
      status: [404]
    }
  ],
  otherWise: {
    type: "UNEXPECTED_RESPONSE"
  }
}

export const fetchData = (url = "", modals) => {
  return (
    new Promise((resolve, reject)=> {
      const request = $.ajax({
        method: "GET",
        url
      })
      request.always(mapActions.bind({modals, request, resolve, reject, responseCases }));
    })
  )
}//end fetchData

export const create = (url = "", data = {}, modals) => {
  return (
    new Promise((resolve, reject)=> {
      const request = $.ajax({
        method: "POST",
        data,
        url
      })
      request.always(mapActions.bind({modals, request, resolve, reject, responseCases}));
    })
  )
}//end create
