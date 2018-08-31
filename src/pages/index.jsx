import React from 'react';
import withRoot from '../withRoot';
import Link from 'gatsby-link';
import Button from 'components/CustomButtons/Button';
import Grid from '@material-ui/core/Grid';

class Index extends React.Component {
  render() {
    return (
      <div
        style={{
          maxWidth: '1000px',
          margin: '10rem auto',
          textAlign: 'center'
        }}
      >
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Button color="success" round><Link to='/LandingPage/'>Landing Page</Link></Button>
          </Grid>
          <Grid item xs={4}>
            <Button color="warning" round><Link to='/ProfilePage/'>Profile Page</Link></Button>
          </Grid>
          <Grid item xs={4}>
            <Button color="rose" round><Link to='/blog/'>Blog</Link></Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(Index);