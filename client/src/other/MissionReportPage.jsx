import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEffectAsync } from '../reactHelper';

import {
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const MissionReportPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [missions, setMissions] = useState(null);

  useEffectAsync(async () => {
    const response = await fetch('/api/missions');
    if (response.ok) {
      const myMissions = await response.json();
      setMissions(myMissions);
    } else {
      throw Error(await response.text());
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Missions</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Container maxWidth="sm">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>initTime</TableCell>
                  <TableCell>endTime</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {missions &&
                  missions.map((mission) => (
                    <TableRow key={mission.id}>
                      <TableCell>{mission.id}</TableCell>
                      <TableCell>{mission.initTime}</TableCell>
                      <TableCell>{mission.endTime}</TableCell>
                      <TableCell>{mission.status}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/reports/mission/${mission.id}`)}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default MissionReportPage;
