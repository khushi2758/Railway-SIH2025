import React from "react";
import { Card as MUICard, CardContent, Typography, Stack } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  title: string;
  percentage: string | number;
}

export const Card = ({ title, percentage }: Props) => {
  // Try to extract number if percentage is a string
  const numericValue =
    typeof percentage === "string"
      ? parseFloat(percentage.replace(/[^0-9.]/g, "")) || 0
      : percentage;

  const showProgress = !isNaN(numericValue) && numericValue > 0 && numericValue <= 100;

  return (
    <MUICard sx={{ minWidth: 200, bgcolor: "grey.900", color: "white" }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>

        {/* Progress Bar only if it's a valid number */}
        {showProgress && (
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={numericValue} />
          </Stack>
        )}

        {/* Percentage Display */}
        <Typography variant="h6" mt={2}>
          {percentage}
        </Typography>
      </CardContent>
    </MUICard>
  );
};
