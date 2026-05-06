import React, { useRef } from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
  { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
  { field: 'parent', headerName: 'Godly Parent', flex: 1, minWidth: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    flex: 1.5,
    minWidth: 180,
    valueGetter: (params, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Jackson', firstName: 'Percy', age: 16, parent: 'Poseidon' },
  { id: 2, lastName: 'Chase', firstName: 'Annabeth', age: 16, parent: 'Athena' },
  { id: 3, lastName: 'Underwood', firstName: 'Grover', age: 32, parent: 'Pan' },
  { id: 4, lastName: 'di Angelo', firstName: 'Nico', age: 14, parent: 'Hades' },
  { id: 5, lastName: 'Castellan', firstName: 'Luke', age: 19, parent: 'Hermes' },
];

export default function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Camp Half-Blood Tactical Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: #fff; color: #1f2937; margin: 0; }
            .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #e5e7eb; }
            .report-header h1 { margin: 0 0 8px; font-size: 28px; }
            .report-header p { margin: 0; color: #6b7280; }
            .report-content .MuiCard-root { box-shadow: none !important; border: 1px solid #e5e7eb; break-inside: avoid; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell" style="padding: 28px;">
            <header class="report-header">
              <h1>War Room Summary</h1>
              <p>Analytics overview for camp activities, quests, and training.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, width: '100%', mb: 3, gap: 2 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', m: 0 }}>
          War Reports
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: '#ea580c', flexShrink: 0, whiteSpace: 'nowrap' }}
          onClick={handlePrint}
        >
          Export / Print Report
        </Button>
      </Box>

      <Stack ref={printRef} spacing={3}>

        {/* Full Width Bar Chart */}
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>Monthly Quest Output</Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Spring', 'Summer', 'Fall', 'Winter'] }]}
              series={[
                { data: [18, 24, 28, 27], label: 'Assigned', color: '#ea580c' },
                { data: [12, 19, 17, 23], label: 'Completed', color: '#0284c7' },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Pie Chart and Gauge side by side */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>Camp Activity Share</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 34, label: 'Sword Training', color: '#0284c7' },
                      { id: 1, value: 20, label: 'Archery', color: '#eab308' },
                      { id: 2, value: 8, label: 'Pegasus Riding', color: '#ea580c' },
                      { id: 3, value: 6, label: 'Prophecy Reading', color: '#7e22ce' },
                    ],
                  }]}
                  width={400}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>Quest Success Rate</Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge
                  width={180}
                  height={180}
                  value={78}
                  text="78%"
                  sx={{ [`& .MuiGauge-valueArc`]: { fill: '#16a34a' } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Data Grid Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Top Demigod Performance Directory
            </Typography>
            <Box sx={{ height: 400, width: '100%', mt: 2 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

      </Stack>
    </Box>
  );
}
