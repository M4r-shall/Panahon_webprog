import React from 'react';
import { Typography, Card, CardContent, Stack, Box, Paper, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart'; // ADDED: Import for the new training chart

// Expanded Camp Half-Blood Roster with "Quests" data
const rows = [
  { id: 1, lastName: 'Jackson', firstName: 'Percy', age: 16, quests: 7 },
  { id: 2, lastName: 'Chase', firstName: 'Annabeth', age: 16, quests: 8 },
  { id: 3, lastName: 'Underwood', firstName: 'Grover', age: 32, quests: 4 },
  { id: 4, lastName: 'di Angelo', firstName: 'Nico', age: 14, quests: 5 },
  { id: 5, lastName: 'Castellan', firstName: 'Luke', age: 19, quests: 3 },
  { id: 6, lastName: 'Grace', firstName: 'Thalia', age: 15, quests: 2 },
  { id: 7, lastName: 'Valdez', firstName: 'Leo', age: 15, quests: 4 },
];

// ADDED: New Data for Training Progress
const trainingData = [
  { week: 'W1', percy: 10, annabeth: 15, nico: 20 },
  { week: 'W2', percy: 25, annabeth: 22, nico: 18 },
  { week: 'W3', percy: 40, annabeth: 35, nico: 45 },
  { week: 'W4', percy: 55, annabeth: 60, nico: 50 },
];

// ADDED: New Data for Active Quests
const activeQuests = [
  { id: 1, mission: "Locate Pan", leader: "Grover", danger: "High" },
  { id: 2, mission: "Secure Golden Fleece", leader: "Clarisse", danger: "Extreme" },
  { id: 3, mission: "Infiltrate Labyrinth", leader: "Annabeth", danger: "Very High" },
];

export default function DashboardPage() {
  const totalUsers = rows.length;
  const averageAge = Math.round(
    rows.reduce((sum, row) => sum + (row.age || 0), 0) / rows.length
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Camp Half-Blood Command Center
      </Typography>

      {/* Top Summary Cards with !important text fixes */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 2, mb: 4 }}>
        <Card sx={{ minWidth: 200, backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#666' }}>Total Campers</Typography>
            <Typography 
              variant="h3" 
              sx={{ color: 'black !important', fontWeight: 'bold !important', fontSize: '3rem !important' }}
            >
              {totalUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#666' }}>Average Age</Typography>
            <Typography 
              variant="h3" 
              sx={{ color: 'black !important', fontWeight: 'bold !important', fontSize: '3rem !important' }}
            >
              {averageAge}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#666' }}>Active Prophecies</Typography>
            <Typography 
              variant="h3" 
              sx={{ color: '#b91c1c !important', fontWeight: 'bold !important', fontSize: '3rem !important' }}
            >
              1
            </Typography>
          </CardContent>
        </Card>

        {/* ADDED: New Treasury Balance Card */}
        <Card sx={{ minWidth: 200, backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#666' }}>Treasury Balance</Typography>
            <Typography 
              variant="h3" 
              sx={{ color: '#eab308 !important', fontWeight: 'bold !important', fontSize: '3rem !important' }}
            >
              1,250 <span style={{ fontSize: '1rem' }}>Drachmas</span>
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Analytics Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%', backgroundColor: 'white' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
              Successful Quests per Camper
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: rows.map(r => r.firstName) }]}
              series={[
                { 
                  data: rows.map(r => r.quests), 
                  label: 'Completed Quests', 
                  color: '#0284c7' 
                }
              ]}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={4}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
                Cabin Capacity
              </Typography>
              <Gauge 
                width={200} 
                height={200} 
                value={85} 
                valueMax={100} 
                text="85%" 
                sx={{
                  [`& .MuiGauge-valueArc`]: { fill: '#ea580c' }, 
                }}
              />
            </Paper>

            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
                Camper Origins
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 5, label: 'Greek', color: '#ea580c' },
                      { id: 1, value: 1, label: 'Roman', color: '#7e22ce' },
                      { id: 2, value: 1, label: 'Satyr', color: '#16a34a' },
                    ],
                  },
                ]}
                width={350}
                height={150}
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* ADDED: New Section for Training Trends & Quest Logs */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        
        {/* Training Progress Line Chart */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
              Monthly Power/Training Progress
            </Typography>
            <LineChart
              xAxis={[{ scaleType: 'point', data: trainingData.map(d => d.week) }]}
              series={[
                { data: trainingData.map(d => d.percy), label: 'Percy', color: '#0284c7' },
                { data: trainingData.map(d => d.annabeth), label: 'Annabeth', color: '#7e22ce' },
                { data: trainingData.map(d => d.nico), label: 'Nico', color: '#1e1b4b' },
              ]}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Quest Status Board */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, backgroundColor: 'white', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
              Active Quest Board
            </Typography>
            <Stack spacing={2}>
              {activeQuests.map((quest) => (
                <Box 
                  key={quest.id} 
                  sx={{ 
                    p: 2, 
                    borderLeft: '5px solid #ea580c', 
                    backgroundColor: '#fff7ed',
                    borderRadius: '4px'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                    {quest.mission}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Leader: {quest.leader} | Danger Level: {quest.danger}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Typography variant="caption" sx={{ mt: 2, display: 'block', color: '#b91c1c', fontStyle: 'italic' }}>
              *Report all monster sightings to Chiron immediately.
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}