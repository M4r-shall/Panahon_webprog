import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem, Paper, Stack, Switch, TextField, Typography, InputBase } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '', lastName: '', age: '', gender: '', contactNumber: '',
    email: '', type: 'editor', username: '', password: '', address: '', isActive: true,
};

const selectSx = {
    minWidth: 140,
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: '#480415' },
        '&:hover fieldset': { borderColor: '#730c1e' },
        '&.Mui-focused fieldset': { borderColor: '#ea580c' },
    },
    '& .MuiInputLabel-root': { color: '#a3a3a3' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c' },
    '& .MuiSvgIcon-root': { color: 'white' },
};

export default function UsersPage() {
    const navigate = useNavigate();
    const userType = localStorage.getItem('type');

    // Enhancement 1: editors cannot access UsersPage
    useEffect(() => {
        if (userType === 'editor') {
            navigate('/dashboard');
        }
    }, [userType, navigate]);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(blankForm);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const loadUsers = async () => {
        try {
            const { data } = await fetchUsers();
            const mapped = data.users.map((u) => ({ ...u, id: u._id }));
            setUsers(mapped);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleOpenModal = () => {
        setFormData(blankForm);
        setEditingId(null);
        setErrors({});
        setModalOpen(true);
    };

    const handleOpenEdit = (user) => {
        setFormData({ ...user, password: '' });
        setEditingId(user.id);
        setErrors({});
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!editingId && formData.password.length < 8) newErrors.password = 'Must be at least 8 characters.';
        if (!/^\d{11}$/.test(formData.contactNumber)) newErrors.contactNumber = 'Must be exactly 11 digits.';
        if (!/^\d+$/.test(formData.age)) newErrors.age = 'Must be a number only.';
        if (/\s/.test(formData.username)) newErrors.username = 'Username must not contain spaces.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (editingId !== null) {
                const payload = { ...formData };
                if (!payload.password) delete payload.password;
                await updateUser(editingId, payload);
            } else {
                await createUser(formData);
            }
            await loadUsers();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await updateUser(id, { isActive: !currentStatus });
            await loadUsers();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        const matchSearch =
            user.firstName?.toLowerCase().includes(term) ||
            user.lastName?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.username?.toLowerCase().includes(term);
        const matchRole = filterRole === 'all' || user.type === filterRole;
        const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? user.isActive : !user.isActive);
        return matchSearch && matchRole && matchStatus;
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 80, valueGetter: (params, row) => row._id || row.id },
        {
            field: 'fullName', headerName: 'Full Name', flex: 1.5, minWidth: 150,
            valueGetter: (params, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
        { field: 'type', headerName: 'Role', width: 90 },
        {
            field: 'isActive', headerName: 'Status', width: 110,
            renderCell: (params) => (
                <Chip label={params.value ? 'Active' : 'Inactive'} color={params.value ? 'success' : 'default'} size="small" />
            ),
        },
        {
            field: 'actions', headerName: 'Actions', width: 200, sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
                    <Button
                        variant="outlined" size="small"
                        onClick={() => handleOpenEdit(params.row)}
                        sx={{ minWidth: 60, fontSize: '0.72rem', borderColor: '#0284c7', color: '#0284c7', '&:hover': { bgcolor: '#0284c720', borderColor: '#0284c7' } }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined" size="small"
                        color={params.row.isActive ? 'error' : 'success'}
                        onClick={() => handleToggleStatus(params.row.id, params.row.isActive)}
                        sx={{ minWidth: 90, fontSize: '0.72rem' }}
                    >
                        {params.row.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, width: '100%', mb: 3, gap: 2 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', m: 0 }}>
                    Demigod Directory
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ea580c', whiteSpace: 'nowrap' }} onClick={handleOpenModal}>
                    Recruit Camper
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, bgcolor: '#0f0103', border: '1px solid #480415', borderRadius: 1, px: 1.5, py: 0.5, '&:focus-within': { borderColor: '#ea580c' } }}>
                        <SearchIcon sx={{ color: '#a3a3a3', mr: 1, fontSize: 20 }} />
                        <InputBase
                            placeholder="Search by Name, Email, or Username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flex: 1, color: 'white', fontSize: 14 }}
                        />
                    </Box>
                    <TextField select label="Role" size="small" value={filterRole} onChange={(e) => setFilterRole(e.target.value)} sx={selectSx}>
                        <MenuItem value="all">All Roles</MenuItem>
                        {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </TextField>
                    <TextField select label="Status" size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={selectSx}>
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                </Stack>
            </Paper>

            <Paper sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    loading={loading}
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Paper>

            <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{editingId !== null ? 'Edit Demigod' : 'Register New Demigod'}</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required />
                                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth required error={!!errors.age} helperText={errors.age} />
                                <TextField select label="Gender" name="gender" value={formData.gender} onChange={handleChange} fullWidth required>
                                    {genders.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} fullWidth required error={!!errors.contactNumber} helperText={errors.contactNumber} />
                                <TextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField select label="Role" name="type" value={formData.type} onChange={handleChange} fullWidth required>
                                    {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                                </TextField>
                                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth required error={!!errors.username} helperText={errors.username} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label={editingId ? 'New Password (leave blank to keep)' : 'Password'}
                                    name="password" type={showPassword ? 'text' : 'password'}
                                    value={formData.password} onChange={handleChange}
                                    fullWidth required={!editingId}
                                    error={!!errors.password} helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth multiline rows={2} required />
                            <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Active" />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: '#ea580c' }}>
                            {editingId !== null ? 'Save Changes' : 'Add Demigod'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}
