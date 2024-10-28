import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import ReCaptcha from "./ReCaptcha";
import { useSelector } from "react-redux";

const useStyles = makeStyles()(() => ({
  field: {
    width: "100%",
    marginTop: "0.5em"
  },
  submitBtn: {
    background: '#4A628A',
    marginTop: '1em',
    borderRadius: '10px'
  },
  errorText: {
    margin: 0,
    color: 'red'
  }
}));

const Form = (props) => {
  const { submitForm, setToken, disabledBtn } = props;

  const [invalidEmail, setInvalidEmail] = useState(false);  

  const isSubmit = useSelector(state => state.contactUsReducer.isSubmit);
  const submitStatus = useSelector(state => state.contactUsReducer.submitStatus);

  const { classes } = useStyles();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "email") {
        if (value.email !== "" && !value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
          setInvalidEmail(true);
        } else {
          setInvalidEmail(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch])

  useEffect(() => {
    if (submitStatus === 'Y') {
      reset();
    }
  }, [reset, submitStatus])
  
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextField
          className={classes.field}
          label="Name"
          variant="standard"
          {...register("name", { required: true })}
        />
        {errors.name && <p className={classes.errorText}>Name required</p>}
        <TextField
          className={classes.field}
          label="Email"
          variant="standard"
          {...register("email", { required: true })}
        />
        {errors.email && <p className={classes.errorText}>Email required</p>}
        {invalidEmail && <p className={classes.errorText}>Invalid email</p>}
        <TextField
          className={classes.field}
          label="Subject"
          variant="standard"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className={classes.errorText}>Subject required</p>
        )}
        <TextField
          className={classes.field}
          label="Message"
          minRows={3}
          maxRows={3}
          variant="standard"
          multiline
          key={submitStatus !== 'Y' ? 'empty' : 'filled'}
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className={classes.errorText}>Message required</p>
        )}
        <ReCaptcha setToken={setToken}></ReCaptcha>
        <LoadingButton
          type="submit"
          loading={isSubmit}
          disabled={disabledBtn || invalidEmail}
          variant="contained"
          className={classes.submitBtn}
        >
          <span>Submit</span>
        </LoadingButton>
      </form>
    </div>
  );
};

export default Form;
