"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

// ...existing imports...

export default function StepperAlwaysVisible() {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      {steps.map((step, idx) => (
        <Paper
          key={step.label}
          sx={{
            p: 2,
            mb: 2,
            background: "rgba(17,24,39,0.7)",
            color: "#e0e7ef",
            borderLeft: "4px solid #22d3ee",
            boxShadow: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box
            sx={{
              minWidth: 36,
              minHeight: 36,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#22d3ee",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
              mt: 0.5,
            }}
          >
            {idx + 1}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "#22d3ee" }}>
              {step.label}
            </Typography>
            <Typography sx={{ mt: 1 }}>{step.description}</Typography>
            {idx === steps.length - 1 && (
              <Typography variant="caption" sx={{ color: "#fbbf24" }}>
                Last step
              </Typography>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}