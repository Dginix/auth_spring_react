import MenuAppBar from "./MenuAppBar";
import {
    Box,
    Typography,
    Container
} from "@mui/material/";
import AuthService from "../services/AuthService";

const Home = () => {
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
                        Home page
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Hello, {currentUser.username}!
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
