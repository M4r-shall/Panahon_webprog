import React from 'react';
import { Typography, Box, Paper, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart'; // ADDED: For trend tracking
import { Gauge } from '@mui/x-charts/Gauge'; // ADDED: For status monitoring

export default function ReportPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Camp Half-Blood Reports
      </Typography>
      
      <Stack spacing={4} sx={{ mt: 3 }}>
        {/* Existing Bar Chart: Monster Encounters */}
        <Paper sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
            Monster Encounters by Season
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Spring', 'Summer', 'Fall', 'Winter'] }]}
            series={[
              { data: [15, 45, 20, 10], label: 'Minotaurs', color: '#ea580c' },
              { data: [5, 30, 10, 5], label: 'Hellhounds', color: '#334155' },
              { data: [2, 10, 5, 2], label: 'Harpies', color: '#eab308' },
            ]}
            height={350}
          />
        </Paper>

        {/* Existing Pie Chart: Weapon Preferences */}
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#000', alignSelf: 'flex-start' }}>
            Armory: Weapon Preferences
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 45, label: 'Celestial Bronze Swords', color: '#f59e0b' },
                  { id: 1, value: 25, label: 'Bows & Arrows', color: '#8b5cf6' },
                  { id: 2, value: 15, label: 'Spears', color: '#ef4444' },
                  { id: 3, value: 15, label: 'Daggers', color: '#10b981' },
                ],
                innerRadius: 30,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            height={250}
            width={600}
          />
        </Paper>

        {/* ADDED: Line Chart for Capture the Flag Win Trends */}
        <Paper sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
            Capture the Flag: Monthly Win Trends
          </Typography>
          <LineChart
            xAxis={[{ scaleType: 'point', data: ['May', 'Jun', 'Jul', 'Aug', 'Sep'] }]}
            series={[
              { data: [2, 5, 3, 8, 4], label: 'Blue Team (Strategy)', color: '#0284c7' },
              { data: [4, 3, 5, 2, 7], label: 'Red Team (Might)', color: '#b91c1c' },
            ]}
            height={300}
          />
        </Paper>

        {/* ADDED: Gauge for Oracle Prophecy Fulfillment */}
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#000', alignSelf: 'flex-start' }}>
            Oracle Status: Prophecy Fulfillment Rate
          </Typography>
          <Gauge 
            width={200} 
            height={200} 
            value={78} 
            valueMax={100} 
            text={`${78}%`} 
            sx={{
              [`& .MuiGauge-valueArc`]: { fill: '#7e22ce' }, // Mystical Purple
            }}
          />
          <Typography sx={{ mt: 2, color: '#666', fontStyle: 'italic' }}>
            "The Great Prophecy continues to unfold."
          </Typography>
        </Paper>

      </Stack>
    </Box>
  );
}