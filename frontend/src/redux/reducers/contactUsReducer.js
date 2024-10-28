import { produce } from "immer";

const initialState = {
  isSubmit: false,
  submitStatus: undefined,
  statusMsg: ''
};

const contactUsReducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      case `SAVE_FORM_STARTED`: {
        draft.isSubmit = true;
        draft.submitStatus = undefined;

        break;
      }
      case `SAVE_FORM_SUCCEED`: {
        console.log(action.items);
        draft.isSubmit = false;

        if (action.items.success) {
          draft.submitStatus = 'Y';
          draft.statusMsg = 'We have received your submission and will be in touch with you soon';
        } else {
          draft.submitStatus = 'N';
          draft.statusMsg = action.items.message;
        }

        break;
      }
      case `SAVE_FORM_FAILED`: {
        console.log(action.items);
        break;
      }
      default:
        break;
    }
  });

export default contactUsReducer;
