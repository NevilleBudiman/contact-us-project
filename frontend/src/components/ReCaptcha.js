import React, { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

const ReCaptcha = (props) => {
  const { setToken } = props;

  const recaptchaRef = useRef(null);

  const submitStatus = useSelector(state => state.contactUsReducer.submitStatus);

  useEffect(() => {
    recaptchaRef.current.reset();
  }, [submitStatus])

  const onChanged = (val) => {
    setToken(val);
  };

  return (
    <div style={{ marginTop: "1em" }}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_SITE_KEY}
        onChange={onChanged}
      />
    </div>
  );
};

export default ReCaptcha;
