import MenuAppBar from "./MenuAppBar";
import {
    Box,
    Typography,
    Container
} from "@mui/material/";

const AdminContent = () => {
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
                        User page
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        All users can see this
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminContent;
