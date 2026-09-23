import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  width: "100%",
  maxWidth: 320,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    width: "100%",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.common.white,
  margin: theme.spacing(0, 2),
  width: 200,
  height: 40,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export default function NewsHeader({
  onSearchChange,
  category,
  onCategoryChange,
}) {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          px: { xs: 2, sm: 4, md: 7.5 },
          py: { xs: 1.5, sm: 1 },
          gap: { xs: 1, sm: 0 },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          backgroundColor: "#1a237e",
        }}
      >
        <Typography variant="h6" component="h1" sx={{ whiteSpace: "nowrap" }}>
          NewsFeed App
        </Typography>

        <StyledSelect
          size="small"
          value={category}
          onChange={onCategoryChange}
          inputProps={{ "aria-label": "News category" }}
        >
          <StyledMenuItem value="general">General</StyledMenuItem>
          <StyledMenuItem value="business">Business</StyledMenuItem>
          <StyledMenuItem value="entertainment">Entertainment</StyledMenuItem>
          <StyledMenuItem value="health">Health</StyledMenuItem>
          <StyledMenuItem value="science">Science</StyledMenuItem>
          <StyledMenuItem value="sports">Sports</StyledMenuItem>
          <StyledMenuItem value="technology">Technology</StyledMenuItem>
        </StyledSelect>

        <Search>
          <SearchIconWrapper>
            <SearchIcon color="action" />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "Search news" }}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
