import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Stack, TextField, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const blankForm = { slug: '', title: '', category: '', image: '', paragraphs: '', isActive: 'true' };

const fieldSx = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: '#480415' },
        '&:hover fieldset': { borderColor: '#730c1e' },
        '&.Mui-focused fieldset': { borderColor: '#ea580c' },
    },
    '& .MuiInputLabel-root': { color: '#a3a3a3' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c' },
};

const selectSx = {
    minWidth: 160,
    ...fieldSx,
    '& .MuiSvgIcon-root': { color: 'white' },
};

export default function DashArticleListPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(blankForm);
    const [submitError, setSubmitError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const loadArticles = async () => {
        try {
            const { data } = await fetchArticles();
            const mapped = data.articles.map((a) => ({ ...a, id: a._id }));
            setArticles(mapped);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadArticles(); }, []);

    const handleOpenModal = () => {
        setFormData(blankForm);
        setEditingId(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (article) => {
        setFormData({
            slug: article.slug || '',
            title: article.title || '',
            category: article.category || '',
            image: article.image || '',
            paragraphs: article.paragraphs?.join('\n') || '',
            isActive: article.isActive ? 'true' : 'false',
        });
        setEditingId(article.id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingId(null);
        setSubmitError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const normalized = name === 'slug'
            ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            : value;
        setFormData((prev) => ({ ...prev, [name]: normalized }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const payload = {
            ...formData,
            isActive: formData.isActive === 'true',
            paragraphs: formData.paragraphs.split('\n').filter((p) => p.trim() !== ''),
            image: formData.image.trim(),
        };
        try {
            if (editingId) {
                await updateArticle(editingId, payload);
            } else {
                await createArticle(payload);
            }
            await loadArticles();
            handleCloseModal();
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Failed to save. Check your connection and try again.');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await updateArticle(id, { isActive: !currentStatus });
            setArticles((prev) =>
                prev.map((a) => (a.id === id ? { ...a, isActive: !currentStatus } : a))
            );
        } catch (error) {
            console.error('Error toggling article status:', error);
        }
    };

    const filtered = articles.filter((a) => {
        const term = searchTerm.toLowerCase();
        const matchSearch = a.title?.toLowerCase().includes(term) || a.slug?.toLowerCase().includes(term);
        const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? a.isActive : !a.isActive);
        return matchSearch && matchStatus;
    });

    const columns = [
        { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 120 },
        { field: 'title', headerName: 'Title', flex: 1.5, minWidth: 160 },
        { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
        {
            field: 'paragraphs', headerName: 'Paragraphs', width: 110,
            valueGetter: (params, row) => row.paragraphs?.length ?? 0,
        },
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
                        {params.row.isActive ? 'Disable' : 'Enable'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', m: 0 }}>
                    Articles
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ea580c', whiteSpace: 'nowrap' }} onClick={handleOpenModal}>
                    Add Article
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, bgcolor: '#0f0103', border: '1px solid #480415', borderRadius: 1, px: 1.5, py: 0.5, '&:focus-within': { borderColor: '#ea580c' } }}>
                        <SearchIcon sx={{ color: '#a3a3a3', mr: 1, fontSize: 20 }} />
                        <InputBase
                            placeholder="Search Articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flex: 1, color: 'white', fontSize: 14 }}
                        />
                    </Box>
                    <TextField select label="Status Filter" size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={selectSx}>
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                </Stack>
            </Paper>

            <Paper sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={filtered}
                    columns={columns}
                    loading={loading}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[10, 20]}
                    disableRowSelectionOnClick
                />
            </Paper>

            <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Slug" name="slug" value={formData.slug}
                                onChange={handleChange} fullWidth required
                                placeholder="e.g. ares-god"
                                helperText={`Article URL: /articles/${formData.slug || 'your-slug'}`}
                                sx={{ ...fieldSx, '& .MuiFormHelperText-root': { color: '#666' } }}
                            />
                            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth required sx={fieldSx} />
                            <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth required sx={fieldSx} />
                            <TextField
                                label="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                fullWidth
                                placeholder="https://example.com/image.jpg"
                                sx={fieldSx}
                            />
                            <TextField
                                label="Paragraphs (one per line)"
                                name="paragraphs" value={formData.paragraphs}
                                onChange={handleChange} fullWidth multiline rows={5} sx={fieldSx}
                            />
                            <TextField select label="Status" name="isActive" value={formData.isActive} onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.value }))} fullWidth sx={selectSx}>
                                <MenuItem value="true">Active</MenuItem>
                                <MenuItem value="false">Inactive</MenuItem>
                            </TextField>
                        </Stack>
                        {submitError && (
                            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#3b0012', border: '1px solid #730c1e', borderRadius: 1 }}>
                                <Typography sx={{ color: '#f87171', fontSize: 13 }}>{submitError}</Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: '#ea580c' }}>
                            {editingId ? 'Save Changes' : 'Add'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}
