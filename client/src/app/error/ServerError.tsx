import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const ServerError = () => {
const {state} = useLocation();
  return (
    <Paper>
        {state.error ? (
            <>
                <Typography gutterBottom variant="h3" color="secondary">
                    {state.error.title}
                </Typography>
                <Divider />
                <Typography variant="body1" sx = {{p:4}}>
                    {state.error.detail}</Typography>
            </>
        ) : (
            <Typography variant="h5" sx={{p:4}}>
                Server Error
            </Typography>
        )}
        </Paper>
  )
}