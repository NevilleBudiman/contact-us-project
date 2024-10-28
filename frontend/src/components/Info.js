import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid2";
import Button from '@mui/material/Button';
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  button: {
    background: '#0D7C66',
    color: 'white',
    height: '2em',
    width: '7em',
    borderRadius: '10px'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Info = (props) => {
  const { classes } = useStyles();

  const { openModal, closeModal, title, statusMsg, submitStatus } = props;

  const [load, setLoad] = useState(false);

  return (
    <div>
      <Dialog
        open={openModal && load}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
      >
        <Grid container style={{padding: '4% 5% 7% 5%', textAlign: 'center', width: '18.5em'}}>
          <Grid size={{ xs: 12, sm: 12 }}>
            {submitStatus === 'Y' && <img src="/assets/success.png" alt="" onLoad={() => setLoad(true)} />}
            {submitStatus === 'N' && <img src="/assets/failed.png" alt="" onLoad={() => setLoad(true)} />}
            <div>
              <p style={{fontSize: '40pt', color: '#536493', fontWeight: '500', margin: 0}}>{title}</p>
              <p>{statusMsg}</p>
            </div>
            <Button variant="outlined" className={classes.button} onClick={closeModal}>OK</Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default Info;
