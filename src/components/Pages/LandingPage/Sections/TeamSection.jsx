import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Link from 'gatsby-link'

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

;
class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    var image = "kendall"
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            {
              this.props.team.map((t) => {
                return (<GridItem xs={12} sm={12} md={4}>
                  <Card plain>
                    <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                      <img src={require("assets/img/faces/" + image + ".jpg")} alt="..." className={imageClasses} />
                    </GridItem>
                    <h4 className={classes.cardTitle}>
                      {t.name}
                      <br />
                      <small className={classes.smallTitle}>{t.job}</small>
                    </h4>
                    <CardBody>
                      <p className={classes.description}>
                        {t.desc}
                      </p>
                      <Link to="/ProfilePage/Gigi">Gigi's Profile Page</Link>
                    </CardBody>
                    <CardFooter className={classes.justifyCenter}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fab fa-instagram"} />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fab fa-facebook"} />
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>)
              })
            }
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
