import React from 'react';
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

const useStyles = makeStyles()(() => ({
  container: {
    background: 'url("/assets/Background.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: '0 1em 0 1em'
  },
  title: {
    fontSize: '40pt',
    fontWeight: 700,
    textAlign: 'center',
    color: 'white'
  },
  card: {
    width: 'fit-content',
    margin: '15% auto 0 auto',
    padding: '4em 7em 4em 7em',
    boxShadow: 'none', 
    color: '#4A628A',
    textAlign: 'center',
    borderRadius: '10px',
    background: 'url("/assets/NotFound.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  backBtn: {
    background: '#608BC1',
    borderRadius: '10px'
  },
}));

const NotFound = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Grid container>
        <Grid size={12}>
          <Card className={classes.card}>
            <p className={classes.title}>Page Not Found</p>
            <Button variant="outlined" className={classes.backBtn}><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Back</Link></Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound