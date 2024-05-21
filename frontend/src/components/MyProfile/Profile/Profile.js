import React, { useState, useEffect } from 'react';
import { Avatar,  Card, CardContent, Divider, Typography,ListItem,ListItemIcon, ListItemText,List } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { BarChart, QuestionAnswer, Forum } from '@mui/icons-material';
export default function ProfileHeader() {
    const [points, setPoints] = useState(0);

    const Points = async () => {
        const response = await fetch("http://localhost:5000/api/answer/points", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });

        const json = await response.json();
        setPoints(json["points"]);
    };

    useEffect(() => {
        Points();
    }, []);

    return (
      <Card style={{ height: '200px', width: '750px', background: 'pink', marginTop:'45px'}}>
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ height: '90px', width: '90px' }} />
        <div style={{ marginLeft: '20px' }}>
          <Typography variant="h5">{localStorage.getItem("username")}</Typography>
          <Typography variant="body2">User since <strong>{localStorage.getItem("since")}</strong></Typography>
          <Typography variant="body2">Points: {points}</Typography>
        </div>
      </CardContent>
      <Divider />
      <List style={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem component={NavLink} to="/analysis">
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Analysis" />
        </ListItem>
    
        <ListItem component={NavLink} to="/myquestions">
          <ListItemIcon>
            <QuestionAnswer />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
    
        <ListItem component={NavLink} to="/myanswers">
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="Answers" />
        </ListItem>
      </List>
    </Card>
    
    );
}
