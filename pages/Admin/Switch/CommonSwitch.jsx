import { styled } from "@mui/material/styles";
import palette from "styles/palette";
import { Switch } from "@mui/material";

const CommonSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      opacity: "1",
      "&:before, &:after": {
        content: "''",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
        color: "white",
      },
      "&:before": {
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>")`,
        left: 12,
      },
      "&:after": {
        right: 12,
      },
      backgroundColor: "gray",
    },
    "& .Mui-checked+.MuiSwitch-track": {
      backgroundColor: `${palette.purple300}!important`,
      opacity: "1!important",
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
      color: "white",
    },
  }));
  
export default CommonSwitch