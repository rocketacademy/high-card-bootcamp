import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledButton = styled(Button)({
    backgroundColor: "#2E3338",
    margin: "1rem 0",
    "&:hover": {
        backgroundColor: "#202124",
    },
});

export default function BasicButton({ onClickHandler, title }) {
    return (
        <StyledButton
            onClick={onClickHandler}
            variant="contained"
            disableRipple
        >
            {title}
        </StyledButton>
    );
}
