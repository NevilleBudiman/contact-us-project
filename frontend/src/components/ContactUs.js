import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import { makeStyles } from "tss-react/mui";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../redux/actions/contactUsAction";
import Info from "./Info";

const useStyles = makeStyles()(() => ({
  container: {
    background: 'url("/assets/Background.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "0 1em 0 1em",
  },
  title: {
    fontSize: "28pt",
    fontWeight: "700",
    color: "#DFF2EB",
    margin: "1.5em 0 0.2em 0",
    textAlign: "center",
  },
  description: {
    fontSize: "12.5pt",
    fontWeight: "400",
    color: "white",
    margin: "auto",
    textAlign: "center",
  },
  card: {
    padding: "8% 10% 8% 10%",
    marginBottom: "2em",
    borderRadius: "10px",
    boxShadow: "none",
    background: "#F9FFFD",
  },
  formTitle: {
    fontSize: "20pt",
    fontWeight: "600",
    margin: "0",
  },
  iconCard: {
    borderRadius: "50%",
    width: "fit-content",
    height: "fit-content",
    padding: "0.9em 0.95em 0.6em 1em",
    marginRight: "1em",
    background: "#DFF2EB",
    boxShadow: "none",
  },
  infoCat: {
    margin: "0 0 0.2em 0",
    fontSize: "15pt",
    color: "#536493",
    fontWeight: "500",
  },
  infoDesc: {
    margin: 0,
    fontSize: "12.5pt",
    color: "white",
    width: window.innerWidth > 1000 ? "70%" : "100%",
  },
}));

const ContactUs = () => {
  const { classes } = useStyles();

  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const submitStatus = useSelector(
    (state) => state.contactUsReducer.submitStatus
  );

  const statusMsg = useSelector(
    (state) => state.contactUsReducer.statusMsg
  );

  useEffect(() => {
    setDisabledBtn(false);

    if (token === "" || token == null) {
      setDisabledBtn(true);
    }
  }, [token]);

  useEffect(() => {
    setDisabledBtn(true);
    setOpenModal(true);
  }, [submitStatus]);

  const submitForm = (val) => {
    val.token = token;

    dispatch(saveForm(val));
  };

  const infoArr = [
    {
      name: "Phone",
      desc: "+6281234455997",
      icon: <PhoneIcon />,
    },
    {
      name: "Email",
      desc: "company.name@gmail.com",
      icon: <EmailIcon />,
    },
    {
      name: "Addresses",
      desc: "99 South StreetRoad, New City No 9, Indonesia",
      icon: <LocationOnIcon />,
    },
  ];

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid size={{ xs: 12, sm: 12 }}>
          <p className={classes.title}>Get in Touch with Us</p>
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }}  offset={{ sm: 3.5, xs: 0 }}>
          <p className={classes.description}>
            We are here to help! Whether you have questions, feedback, or need
            assistance, please feel free to reach out. Your inquiries are
            important to us, and we strive to respond promptly.
          </p>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "3em" }}>
        <Grid
          size={{ xs: 12, sm: 3.5 }}
          offset={{ sm: 2.5, xs: 0 }}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          {infoArr.map((info, index) => (
            <Grid container key={index} style={{ marginBottom: "3em" }}>
              <Grid>
                <Card className={classes.iconCard}>{info.icon}</Card>
              </Grid>
              <Grid size={{ xs: "grow", sm: "grow" }}>
                <p className={classes.infoCat}>{info.name}</p>
                <p className={classes.infoDesc}>{info.desc}</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid size={{ xs: 12, sm: 3.5 }}>
          <Card className={classes.card}>
            <p className={classes.formTitle}>Contact Us</p>
            <Form
              submitForm={submitForm}
              setToken={setToken}
              disabledBtn={disabledBtn}
            ></Form>
          </Card>
        </Grid>
      </Grid>
      <Info openModal={openModal} closeModal={() => setOpenModal(false)} statusMsg={statusMsg} title={submitStatus === 'Y' ? 'Thank You': 'Sorry'} submitStatus={submitStatus}></Info>
    </div>
  );
};

export default ContactUs;
