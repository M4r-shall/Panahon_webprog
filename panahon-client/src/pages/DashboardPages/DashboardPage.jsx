import React from 'react';
import { Typography, Card, CardContent, Box, Paper } from '@mui/material';
import { BarChart, PieChart, Gauge, LineChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 120 },
  { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 120 },
  { field: 'parent', headerName: 'Godly Parent', flex: 1, minWidth: 140 },
  { field: 'weapon', headerName: 'Primary Weapon', flex: 1.5, minWidth: 160 },
  { field: 'age', headerName: 'Age', type: 'number', width: 80 },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    flex: 1.5,
    minWidth: 180,
    valueGetter: (params, row) => {
      const dataRow = row || params.row;
      return dataRow ? `${dataRow.firstName || ''} ${dataRow.lastName || ''}` : '';
    },
  },
];

const rows = [
  { id: 1, lastName: 'Jackson',   firstName: 'Percy',    age: 16, quests: 7, parent: 'Poseidon', weapon: 'Riptide (Sword)' },
  { id: 2, lastName: 'Chase',     firstName: 'Annabeth', age: 16, quests: 8, parent: 'Athena',   weapon: 'Celestial Bronze Knife' },
  { id: 3, lastName: 'Underwood', firstName: 'Grover',   age: 32, quests: 4, parent: 'Pan',      weapon: 'Reed Pipes' },
  { id: 4, lastName: 'di Angelo', firstName: 'Nico',     age: 14, quests: 5, parent: 'Hades',    weapon: 'Stygian Iron Sword' },
  { id: 5, lastName: 'Castellan', firstName: 'Luke',     age: 19, quests: 3, parent: 'Hermes',   weapon: 'Backbiter' },
];

const trainingData = [
  { week: 'W1', percy: 10, annabeth: 15, nico: 20 },
  { week: 'W2', percy: 25, annabeth: 22, nico: 18 },
  { week: 'W3', percy: 40, annabeth: 35, nico: 45 },
  { week: 'W4', percy: 55, annabeth: 60, nico: 50 },
];

const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const monthlyActive   = [12, 15, 11, 18, 14, 20];
const monthlyInactive = [3, 2, 4, 1, 3, 2];

const cabins = ['Zeus', 'Poseidon', 'Athena', 'Hades', 'Hermes', 'Ares'];
const cabinCounts = [4, 3, 6, 2, 8, 5];

const statCards = [
  { label: 'Total Demigods',    value: rows.length },
  { label: 'Average Age',       value: 18 },
  { label: 'Active Prophecies', value: 1,       color: '#ef4444' },
  { label: 'Drachmas',          value: '1,250', color: '#eab308' },
];

const GAP = 3; // spacing between panels (theme units)

export default function DashboardPage() {
  return (
    <Box sx={{ width: '100%', pb: 4 }}>

      <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
        Tactical Hub Overview
      </Typography>

      {/* ── Stat Cards ───────────────────────────────────────── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: GAP, mb: GAP }}>
        {statCards.map((stat, i) => (
          <Card key={i} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {stat.label}
              </Typography>
              <Typography variant="h3" sx={{ color: stat.color ?? 'text.primary', fontWeight: 'bold', mt: 1 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ── Row 1: Quests bar (full width) ───────────────────── */}
      <Paper sx={{ p: 3, mb: GAP, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Successful Quests per Camper</Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: rows.map(r => r.firstName) }]}
          series={[{ data: rows.map(r => r.quests), label: 'Completed Quests', color: '#730c1e' }]}
          height={280}
        />
      </Paper>

      {/* ── Row 2: Training Progress (2/3) + Camper Origins (1/3) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: GAP, mb: GAP }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Training Progress</Typography>
          <LineChart
            xAxis={[{ scaleType: 'point', data: trainingData.map(d => d.week) }]}
            series={[
              { data: trainingData.map(d => d.percy),    label: 'Percy',    color: '#0ea5e9' },
              { data: trainingData.map(d => d.annabeth), label: 'Annabeth', color: '#a855f7' },
              { data: trainingData.map(d => d.nico),     label: 'Nico',     color: '#ef4444' },
            ]}
            height={280}
          />
        </Paper>

        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Camper Origins</Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 5, label: 'Greek',  color: '#ea580c' },
                  { id: 1, value: 1, label: 'Roman',  color: '#8b5cf6' },
                  { id: 2, value: 1, label: 'Satyr',  color: '#22c55e' },
                ],
              }]}
              width={360}
              height={260}
            />
          </Box>
        </Paper>
      </Box>

      {/* ── Row 3: Monthly Activity (2/3) + Cabin Capacity (1/3) */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: GAP, mb: GAP }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Monthly Camper Activity</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: monthlyLabels }]}
            series={[
              { data: monthlyActive,   label: 'Active',   color: '#16a34a' },
              { data: monthlyInactive, label: 'Inactive', color: '#ef4444' },
            ]}
            height={280}
          />
        </Paper>

        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Cabin Capacity</Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gauge
              width={220}
              height={220}
              value={85}
              text="85%"
              sx={{ [`& .MuiGauge-valueArc`]: { fill: '#ea580c' } }}
            />
          </Box>
        </Paper>
      </Box>

      {/* ── Row 4: Cabin Breakdown (full width) ──────────────── */}
      <Paper sx={{ p: 3, mb: GAP, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>Cabin Breakdown</Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: cabins }]}
          series={[{ data: cabinCounts, label: 'Campers', color: '#0284c7' }]}
          height={260}
        />
      </Paper>

      {/* ── Demigod Directory ─────────────────────────────────── */}
      <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 'bold' }}>
        Demigod Directory
      </Typography>
      <Paper sx={{ height: 400, width: '100%', mb: GAP, display: 'flex' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ width: '100%' }}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      {/* ── Tactical Map ──────────────────────────────────────── */}
      <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 'bold' }}>
        Camp HQ Tactical Map
      </Typography>
      <Paper sx={{ height: 500, width: '100%', overflow: 'hidden', p: 0, borderRadius: 2 }}>
        <MapContainer center={[14.605780, 120.989720]} zoom={18} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />
          <Marker position={[14.605780, 120.989720]}>
            <Popup>
              <b>Camp Half-Blood HQ</b><br />
              National University Manila<br />
              M.F. Jhocson St, Sampaloc, Manila
            </Popup>
          </Marker>
        </MapContainer>
      </Paper>

    </Box>
  );
}
