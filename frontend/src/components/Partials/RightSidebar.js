import React from "react";
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Comment, Edit } from '@mui/icons-material';
import blackLogo from "../../Assets/blacklogo.svg";
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import createTheme and ThemeProvider from @mui/material/styles

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A6173', // Change primary color
    },
    secondary: {
      main: '#f50057', // Change secondary color
    },
    mode: 'light', // Change it to dark if needed
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '65px', /* Height of your navbar */
    right: '3px',
    width: '300px', /* Adjust the width as needed */
    paddingLeft:'10px',
    height: 'calc(100vh - 65px)', /* Height of the viewport minus height of the navbar */
    overflowY: 'auto',
    color: 'gray',
    borderLeft: '5px solid #ccc',
    paddingTop: '15px',
    paddingBottom: '10px'
  },
}));

const RightSidebar = () => {
  const classes = useStyles();
  const tags = [
    "c", "css", "express", "firebase", "html", "java", "javascript",
    "mern", "mongodb", "mysql", "next.js", "node.js", "php", "python", "reactjs"
  ];

  return (
    <ThemeProvider theme={theme}>
      <aside className={classes.root}>
        <div>
          <Typography variant="h6" gutterBottom style={{ padding: '5px' , margin:' 0%' , boxShadow: '3px 3px 10px rgb(0 0 0 / 5%), -3px -3px 10px rgb(0 0 0 / 5%)',background:'#f50057',  color:'azure',  border: '2px solid ', borderRadius: '2px'}}>
            The Overflow Blog
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Edit style={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Observability is key to the future of software (and your DevOps career)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Edit style={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Podcast 374: How valuable is your screen name?" />
            </ListItem>
          </List>
          <Typography variant="h6" gutterBottom  style={{ padding: '5px' , margin:' 0%' , boxShadow: '3px 3px 10px rgb(0 0 0 / 5%), -3px -3px 10px rgb(0 0 0 / 5%)',background:'#f50057',  color:'azure',  border: '2px solid ', borderRadius: '2px'}}>
            Featured on Meta
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Comment style={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText primary="Review queue workflows - Final release...." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Comment style={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText primary="Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={blackLogo} alt="pen" width="18" />
              </ListItemIcon>
              <ListItemText primary="Outdated Answers: accepted answer is now unpinned on Stack Overflow" />
            </ListItem>
          </List>
          <Typography variant="h6" gutterBottom style={{ padding: '5px' , margin:' 0%' , boxShadow: '3px 3px 10px rgb(0 0 0 / 5%), -3px -3px 10px rgb(0 0 0 / 5%)',background:'#f50057',  color:'azure',  border: '2px solid ', borderRadius: '2px'}}>
            Hot Meta Posts
          </Typography>
          <List>
            <ListItem>
              <Typography variant="subtitle1">38</Typography>
              <ListItemText primary="Why was this spam flag declined, yet the question marked as spam?" />
            </ListItem>
            <ListItem>
              <Typography variant="subtitle1">20</Typography>
              <ListItemText primary="What is the best course of action when a user has high enough rep to..." />
            </ListItem>
            <ListItem>
              <Typography variant="subtitle1">14</Typography>
              <ListItemText primary="Is a link to the 'How to ask' help page a useful comment?" />
            </ListItem>
          </List>
        </div>

        <div className="widget-tags">
          <h4 style={{display:"flex", background:'#f50057',  boxShadow: '3px 3px 10px rgb(0 0 0 / 5%), -3px -3px 10px rgb(0 0 0 / 5%)', color:'azure',  border: '2px solid ', borderRadius: '2px'}}>Watched tags</h4>
          <div className="widget-tags-div">
            {tags.map((tag) => (
              <Link key={tag} style={{ textDecoration: 'none' }} to={'/Tags'}>
                <p>{tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </ThemeProvider>
  );
};

export default RightSidebar;
