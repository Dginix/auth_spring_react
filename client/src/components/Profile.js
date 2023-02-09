import MenuAppBar from "./MenuAppBar";
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardHeader
} from "@mui/material/";
import AuthService from "../services/AuthService";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <Box>
            <MenuAppBar />
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Profile page
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Information about user
                    </Typography>
                </Container>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Username" />
                                <CardContent>
                                    {currentUser.username}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Email" />
                                <CardContent>
                                    {currentUser.email}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Roles" />
                                <CardContent>
                                    {currentUser.authorities.map((e) => (
                                        <Typography key={e.authority}>
                                            {e.authority}
                                        </Typography>
                                        ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Profile;
