export const saveForm = (formData) => {
  return (dispatch) => {
    dispatch(saveFormStarted());

    fetch(`${process.env.REACT_APP_API_URL}/backend/save-form`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(saveFormSucceed(res));
      })
      .catch((err) => dispatch(saveFormFailed(err.message)));
  };
};


const saveFormSucceed = (items) => ({
  type: 'SAVE_FORM_SUCCEED',
  items,
});

const saveFormStarted = () => ({
  type: 'SAVE_FORM_STARTED',
});

const saveFormFailed = (items) => ({
  type: 'SAVE_FORM_FAILED',
  items,
});
