import React from "react";
import ReactDOM from "react-dom";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiCard: {
            root: {
                "&.MuiEngagementCard--01": {
                    transition: "0.3s",
                    maxWidth: 300,
                    margin: "auto",
                    justifyContent:"center",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    },
                    "& .MuiCardMedia-root": {
                        paddingTop: "56.25%"
                    },
                    "& .MuiCardContent-root": {
                        textAlign: "center",
                        padding: muiBaseTheme.spacing.unit * 3
                    },
                    "& .MuiDivider-root": {
                        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
                    },
                    "& .MuiTypography--heading": {
                        fontWeight: "bold"
                    },
                    "& .MuiTypography--subheading": {
                        lineHeight: 1.8
                    },
                    "& .MuiAvatar-root": {
                        display: "inline-block",
                        border: "2px solid white",
                        "&:not(:first-of-type)": {
                            marginLeft: -muiBaseTheme.spacing.unit
                        }
                    }
                }
            }
        }
    }
};


export default function About() {
    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <div className="About">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography 
                         className={"MuiTypography--heading"}
                         variant={"h1"}
                         fontWeight="bold"
                         component="h1"
                         align="center"
                         style={{color:"#a9a9a9", margin:"2%"}}
                         >
                            Our Story
                        </Typography>
                        
                    </Grid>
                    <Grid item 
                        style={{justifyContent:"center", width:"70%", margin:'auto'}}>
                        <Divider light />
                        <Typography
                        className={"MuiTypography--subheading"}
                        variant={"subtitle"}
                        component="subtitle"
                        align="center"
                        style={{color:"#a9a9a9"}}
                        >
                            I'm baby air plant tacos freegan, shaman tousled roof party craft beer typewriter. Bespoke semiotics messenger bag raw denim enamel pin. Woke blue bottle subway tile pok pok wolf palo santo actually put a bird on it poutine keytar. 
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container style={{marginTop: "3%", justifyContent:"center"}}>
                    <Grid item xs >
                        <Card className={"MuiEngagementCard--01"}>
                            <CardMedia
                                className={"MuiCardMedia-root"}
                                image={
                                    "https://res.cloudinary.com/dbd23cfw2/image/upload/v1605902503/project%203/CaitPic_u6r2z5.jpg"
                                }
                                style={{height:150}}
                            />
                            <CardContent className={"MuiCardContent-root"}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    Caitlin Bouroncle
                                </Typography>
                                <Typography
                                    className={"MuiTypography--subheading"}
                                    variant={"caption"}
                                >
                                    We are going to learn different kinds of species in nature that
                                    live together to form amazing environment.
                                 </Typography>
                                <Divider className={"MuiDivider-root"} light />
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://github.com/caitlinbou">
                                    Github
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://caitlinbou.github.io/caitlinbouroncle/">
                                    Portfolio
                             </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs >
                        <Card className={"MuiEngagementCard--01"}>
                            <CardMedia
                                className={"MuiCardMedia-root"}
                                image={
                                    "https://res.cloudinary.com/dbd23cfw2/image/upload/v1605846987/project%203/janelleheadshot_aiqplk.jpg"
                                }
                                style={{ height: 150 }}
                            />
                            <CardContent className={"MuiCardContent-root"}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    Janelle Deane
              </Typography>
                                <Typography
                                    className={"MuiTypography--subheading"}
                                    variant={"caption"}
                                >
                                    We are going to learn different kinds of species in nature that
                                    live together to form amazing environment.
              </Typography>
                                <Divider className={"MuiDivider-root"} light />
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://github.com/janelle-deane">
                                    Github
              </Button>
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://janelle-deane.herokuapp.com/">
                                    Portfolio
              </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs >
                        <Card className={"MuiEngagementCard--01"}>
                            <CardMedia
                                className={"MuiCardMedia-root"}
                                image={
                                    "https://res.cloudinary.com/dbd23cfw2/image/upload/v1605846985/project%203/Ann_Headshot_paslhl.jpg"
                                }
                                style={{height:150}}
                            />
                            <CardContent className={"MuiCardContent-root"}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    Ann Guinee
                                </Typography>
                                <Typography
                                    className={"MuiTypography--subheading"}
                                    variant={"caption"}
                                >
                                    We are going to learn different kinds of species in nature that
                                    live together to form amazing environment.
                                </Typography>
                                <Divider className={"MuiDivider-root"} light />
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://github.com/GnuArtemis">
                                    Github
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://ann-guinee-website.herokuapp.com/">
                                    Portfolio
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs >
                        <Card className={"MuiEngagementCard--01"}>
                            <CardMedia
                                className={"MuiCardMedia-root"}
                                image={
                                    "https://res.cloudinary.com/dbd23cfw2/image/upload/v1605846985/project%203/Ann_Headshot_paslhl.jpg"
                                }
                                style={{height:150}}
                            />
                            <CardContent className={"MuiCardContent-root"}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    Maria Waslick
                                </Typography>
                                <Typography
                                    className={"MuiTypography--subheading"}
                                    variant={"caption"}
                                >
                                    We are going to learn different kinds of species in nature that
                                    live together to form amazing environment.
                                </Typography>
                                <Divider className={"MuiDivider-root"} light />
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://github.com/GnuArtemis">
                                    Github
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://ann-guinee-website.herokuapp.com/">
                                    Portfolio
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs >
                        <Card className={"MuiEngagementCard--01"}>
                            <CardMedia
                                className={"MuiCardMedia-root"}
                                image={
                                    "https://res.cloudinary.com/dbd23cfw2/image/upload/v1605846985/project%203/Ann_Headshot_paslhl.jpg"
                                }
                                style={{height:150}}
                            />
                            <CardContent className={"MuiCardContent-root"}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    Matt Weber
                                </Typography>
                                <Typography
                                    className={"MuiTypography--subheading"}
                                    variant={"caption"}
                                >
                                    We are going to learn different kinds of species in nature that
                                    live together to form amazing environment.
                                </Typography>
                                <Divider className={"MuiDivider-root"} light />
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://github.com/GnuArtemis">
                                    Github
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small" color="inherit"
                                    href="https://ann-guinee-website.herokuapp.com/">
                                    Portfolio
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
}
