import React from 'react';
import { Typography, Box, Paper, Grid, Stack } from '@mui/material'; // ADDED: Grid and Stack for the new section
import { DataGrid } from '@mui/x-data-grid';

// ADDED: Expanded lore-specific columns
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'parent', headerName: 'Godly Parent', width: 150 }, // NEW
  { field: 'weapon', headerName: 'Primary Weapon', width: 180 }, // NEW
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// ADDED: Expanded Camp Half-Blood Roster with Parent and Weapon data
const rows = [
  { id: 1, lastName: 'Jackson', firstName: 'Percy', age: 16, parent: 'Poseidon', weapon: 'Riptide (Sword)' },
  { id: 2, lastName: 'Chase', firstName: 'Annabeth', age: 16, parent: 'Athena', weapon: 'Celestial Bronze Knife' },
  { id: 3, lastName: 'Underwood', firstName: 'Grover', age: 32, parent: 'Pan', weapon: 'Reed Pipes' },
  { id: 4, lastName: 'di Angelo', firstName: 'Nico', age: 14, parent: 'Hades', weapon: 'Stygian Iron Sword' },
  { id: 5, lastName: 'Castellan', firstName: 'Luke', age: 19, parent: 'Hermes', weapon: 'Backbiter' },
  { id: 6, lastName: 'Grace', firstName: 'Thalia', age: 15, parent: 'Zeus', weapon: 'Aegis & Spear' },
  { id: 7, lastName: 'Valdez', firstName: 'Leo', age: 15, parent: 'Hephaestus', weapon: 'Magic Tool Belt' },
  { id: 8, lastName: 'La Rue', firstName: 'Clarisse', age: 17, parent: 'Ares', weapon: 'Maimer (Electric Spear)' },
];

// ADDED: Data for the Daily Duty Roster
const dailyDuties = [
  { id: 1, task: "Border Patrol", assigned: "Clarisse & Ares Cabin", time: "06:00 - 12:00" },
  { id: 2, task: "Strawberry Fields", assigned: "Katie & Demeter Cabin", time: "08:00 - 14:00" },
  { id: 3, task: "Kitchen/KP Duty", assigned: "Stoll Brothers & Hermes Cabin", time: "11:00 - 19:00" },
  { id: 4, task: "Canoe Lake Guard", assigned: "Percy Jackson", time: "13:00 - 17:00" },
];

export default function UsersPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Demigod Directory
      </Typography>
      
      {/* Main DataGrid Section */}
      <Paper sx={{ height: 450, width: '100%', mt: 2, backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      <Typography variant="caption" sx={{ mt: 3, display: 'block', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
        *All campers must report to their assigned stations or face extra cleaning duty in the harpies' nests.
      </Typography>
    </Box>
  );
}