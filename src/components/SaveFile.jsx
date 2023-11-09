import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../Mapview/preloadImages';
import ReplayIcon from '@mui/icons-material/Replay';
import PublishIcon from '@mui/icons-material/Publish';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingIcon from '@mui/icons-material/Pending';

import PositionValue from './PositionValue';
import RemoveDialog from './RemoveDialog';
import makeStyles from '@mui/styles/makeStyles';
import { devicesActions } from '../store';
import { Alarm } from '@mui/icons-material';
import SelectField from '../common/components/SelectField';

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: 'auto',
    width: '500px',
    height: '180px',
  },
  media: {
    height: theme.dimensions.popupImageHeight,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  mediaButton: {
    color: theme.palette.colors.white,
    mixBlendMode: 'difference',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 1, 0, 2),
  },
  content: {
    paddingTop: '15px',
    paddingBottom: theme.spacing(1),
  },
  negative: {
    color: theme.palette.colors.negative,
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
  table: {
    '& .MuiTableCell-sizeSmall': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  cell: {
    borderBottom: 'none',
  },
  actions: {
    justifyContent: 'center',
  },
  root: {
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 6,
    left: '50%',
    top: '40%',
    transform: 'translateX(-50%)',
  },
}));

export const SaveFile = ({ SetOpenSave, OpenSave }) => {
  const classes = useStyles();
  const mission = useSelector((state) => state.mission);

  const [fileType, setFileType] = useState('yaml');
  const [fileName, setFileName] = useState(mission.name);

  const SaveMission = () => {
    let auxmission, fileData;
    let archivetype = 'text/plain';
    if (fileType == 'yaml') {
      auxmission = { version: '3' }; //JSON.parse(JSON.stringify(mission));
      auxmission['name'] = mission.name;
      auxmission['route'] = mission.route;
      fileData = YAML.stringify(auxmission);
    }
    if (fileType == 'kml') {
      archivetype = 'application/xml';
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += '<kml>\n';
      xmlString += '<Document>\n';
      mission.route.map((elem, elem_n, list) => {
        xmlString += `<Style id="sn_ylw-pushpin1${elem_n}">\n`;
        xmlString += '<LineStyle>\n';
        xmlString += `<color>ff${colors[elem_n].substr(-6)}</color>\n`;
        xmlString += '<width>3</width>\n';
        xmlString += '</LineStyle>\n';
        xmlString += '</Style>\n';
      });

      mission.route.map((elem, elem_n) => {
        xmlString += '<Placemark>\n';
        xmlString += `<name>${elem.uav}-${elem.name}</name>\n`;
        xmlString += `<styleUrl>#sn_ylw-pushpin1${elem_n}</styleUrl>\n`;
        xmlString += '<open>1</open>\n';
        xmlString += '<LineString>\n';
        let auxcoord = '';
        elem.wp.map((mywp) => {
          auxcoord = auxcoord + mywp.pos[1] + ',' + mywp.pos[0] + ',' + mywp.pos[2] + ' ';
        });
        xmlString += '<tessellate>1</tessellate>\n';
        xmlString += '<altitudeMode>relativeToGround</altitudeMode>\n';
        xmlString += '<coordinates>\n';
        xmlString += auxcoord + '\n';
        xmlString += '</coordinates>\n';
        xmlString += '</LineString>\n';
        xmlString += '</Placemark>\n';
      });

      xmlString += '</Document>\n';
      xmlString += '</kml>';
      fileData = xmlString;
    }
    if (fileType == 'plan') {
      archivetype = 'application/json';
      auxmission = { fileType: 'Plan' }; //JSON.parse(JSON.stringify(mission));
      auxmission['geoFence'] = {
        circles: [],
        polygons: [],
        version: 2,
      };
      auxmission['groundStation'] = 'QGroundControl';
      auxmission['mission'] = {};
      auxmission['mission']['cruiseSpeed'] = mission.route[0].attributes.idle_vel;
      auxmission['mission']['firmwareType'] = 12;
      auxmission['mission']['globalPlanAltitudeMode'] = 0;
      auxmission['mission']['hoverSpeed'] = 5;
      auxmission['mission']['items'] = [];
      mission.route.map((elem, elem_n, elem_list) => {
        elem.wp.map((mywp, mywp_n, mywp_list) => {
          let aux = {
            AMSLAltAboveTerrain: null,
            Altitude: mywp.pos[2],
            AltitudeMode: 1,
            autoContinue: true,
            command: 16,
            doJumpId: 1,
            frame: 3,
            params: [0, 0, 0, null, mywp.pos[0], mywp.pos[1], mywp.pos[2]],
            type: 'SimpleItem',
          };
          if (mywp_n == 0) {
            aux['command'] = 84;
            auxmission['mission']['plannedHomePosition'] = [mywp.pos[0], mywp.pos[1], mywp.pos[2]];
          }
          mywp_n + 1 == mywp_list.length ? (aux['command'] = 84) : null;
          auxmission['mission']['items'].push(aux);
        });
      });
      auxmission['mission']['vehicleType'] = 20;
      auxmission['mission']['version'] = 2;
      auxmission['rallyPoints'] = {
        points: [],
        version: 2,
      };
      auxmission['version'] = 1;
      fileData = JSON.stringify(auxmission);
    }
    if (fileType == 'waypoint') {
      let xmlString = 'QGC WPL 110\n';
      mission.route.map((elem) => {
        elem.wp.map((mywp, mywp_n, mywp_list) => {
          if (mywp_n == 0) {
            xmlString += `${mywp_n}\t1\t0\t16\t0\t0\t0\t0\t${mywp.pos[0]}\t${mywp.pos[1]}\t${mywp.pos[2]}\t1\n`;
          } else {
            xmlString += `${mywp_n}\t0\t0\t16\t0\t0\t0\t0\t${mywp.pos[0]}\t${mywp.pos[1]}\t${mywp.pos[2]}\t1\n`;
          }
        });
      });
      fileData = xmlString;
    }

    const blob = new Blob([fileData], { type: archivetype });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = mission.name + '.' + fileType;
    link.href = url;
    link.click();
  };

  const CloseSaveMission = () => {
    SetOpenSave(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Card elevation={3} className={classes.card}>
          <div className={classes.header}>
            <Typography variant='body2' color='textSecondary'>
              Save Mission
            </Typography>
            <IconButton size='small' onClick={CloseSaveMission} onTouchStart={CloseSaveMission}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </div>

          <CardContent className={classes.content}>
            <TextField
              required
              label='Name Mission'
              variant='standard'
              value={fileName ? fileName : ' '}
              onChange={(event) => setFileName(event.target.value)}
              style={{ width: '300px', marginRight: '5px' }}
            />

            <FormControl>
              <InputLabel>Type file mission</InputLabel>
              <Select
                label={'Type file mission'}
                value={fileType ? fileType : 'yaml'}
                onChange={(e) => setFileType(e.target.value)}
                sx={{ width: '120px' }}
              >
                {['yaml', 'kml', 'waypoint', 'plan'].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <CardActions classes={{ root: classes.actions }} disableSpacing>
            <Button onClick={SaveMission}>Save Mission</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};
