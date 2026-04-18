import { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Chip, Tabs, Tab, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, IconButton, Button, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
  Select, MenuItem, FormControl, InputLabel, Pagination, Collapse
} from '@mui/material';
import {
  Search, Plus, TreePine, Wrench, AlertTriangle,
  TrendingDown, TrendingUp, Package, Droplets, SlidersHorizontal, ArrowUpDown, Trash2
} from 'lucide-react';

// ── Wood Inventory ─────────────────────────────────────────
const woodInventory = [
  { id: 'W-001', name: 'Teak (Grade A)', type: 'Teak', boardFeet: 2450, minStock: 1500, unitCost: 'LKR 1,200', location: 'Warehouse A - Bay 1', lastRestocked: '2026-04-10', supplier: 'Moratuwa Timber Co.', trend: 'up' },
  { id: 'W-002', name: 'Teak (Grade B)', type: 'Teak', boardFeet: 1820, minStock: 1000, unitCost: 'LKR 850', location: 'Warehouse A - Bay 2', lastRestocked: '2026-04-08', supplier: 'Moratuwa Timber Co.', trend: 'down' },
  { id: 'W-003', name: 'Mahogany (Premium)', type: 'Mahogany', boardFeet: 1650, minStock: 1200, unitCost: 'LKR 1,800', location: 'Warehouse A - Bay 3', lastRestocked: '2026-04-05', supplier: 'Galle Wood Exports', trend: 'up' },
  { id: 'W-004', name: 'Mahogany (Standard)', type: 'Mahogany', boardFeet: 980, minStock: 800, unitCost: 'LKR 1,100', location: 'Warehouse B - Bay 1', lastRestocked: '2026-03-28', supplier: 'Galle Wood Exports', trend: 'down' },
  { id: 'W-005', name: 'Calamander (Exotic)', type: 'Calamander', boardFeet: 120, minStock: 200, unitCost: 'LKR 4,500', location: 'Warehouse B - Bay 2', lastRestocked: '2026-03-15', supplier: 'Ceylon Heritage Woods', trend: 'down' },
  { id: 'W-006', name: 'Nedun (Lanka Special)', type: 'Nedun', boardFeet: 750, minStock: 500, unitCost: 'LKR 950', location: 'Warehouse B - Bay 3', lastRestocked: '2026-04-12', supplier: 'Kandy Forestry Ltd.', trend: 'up' },
];

const hardwareInventory = [
  { id: 'H-001', name: 'Brass Hinges 3"', category: 'Hinges', qty: 45, minStock: 100, unit: 'pcs', unitCost: 'LKR 180', supplier: 'Lanka Hardware', status: 'critical' },
  { id: 'H-002', name: 'Brass Hinges 4"', category: 'Hinges', qty: 220, minStock: 100, unit: 'pcs', unitCost: 'LKR 250', supplier: 'Lanka Hardware', status: 'ok' },
  { id: 'H-003', name: 'SS Wood Screws (#8 x 1.5")', category: 'Screws', qty: 5200, minStock: 2000, unit: 'pcs', unitCost: 'LKR 3.50', supplier: 'Bolt Masters', status: 'ok' },
  { id: 'H-004', name: 'SS Wood Screws (#10 x 2")', category: 'Screws', qty: 3800, minStock: 2000, unit: 'pcs', unitCost: 'LKR 5.00', supplier: 'Bolt Masters', status: 'ok' },
  { id: 'H-005', name: 'Brass Drawer Pulls', category: 'Handles', qty: 86, minStock: 50, unit: 'pcs', unitCost: 'LKR 450', supplier: 'Lanka Hardware', status: 'ok' },
  { id: 'H-006', name: 'Marine Lacquer (Gloss)', category: 'Finish', qty: 8, minStock: 15, unit: 'gal', unitCost: 'LKR 3,200', supplier: 'Asian Paints Lanka', status: 'low' },
  { id: 'H-007', name: 'Satin Finish Lacquer', category: 'Finish', qty: 18, minStock: 10, unit: 'gal', unitCost: 'LKR 2,800', supplier: 'Asian Paints Lanka', status: 'ok' },
  { id: 'H-008', name: 'Wood Glue (PVA Premium)', category: 'Adhesive', qty: 24, minStock: 10, unit: 'liters', unitCost: 'LKR 850', supplier: 'Henkel Lanka', status: 'ok' },
  { id: 'H-009', name: 'Sandpaper 120 Grit', category: 'Abrasives', qty: 150, minStock: 200, unit: 'sheets', unitCost: 'LKR 45', supplier: '3M Lanka', status: 'low' },
  { id: 'H-010', name: 'Sandpaper 220 Grit (Fine)', category: 'Abrasives', qty: 320, minStock: 200, unit: 'sheets', unitCost: 'LKR 55', supplier: '3M Lanka', status: 'ok' },
];

const statusProps = {
  critical: { label: 'Critical', color: '#D32F2F', bg: '#FFEBEE' },
  low: { label: 'Low Stock', color: '#ED6C02', bg: '#FFF3E0' },
  ok: { label: 'In Stock', color: '#2E7D32', bg: '#E8F5E9' },
};

// ── Wood Type Summary Cards ────────────────────────────────
function WoodSummaryCards() {
  const types = ['Teak', 'Mahogany', 'Calamander', 'Nedun'];
  const gradients = {
    Teak: 'linear-gradient(135deg, #4B2C20, #6B4332)',
    Mahogany: 'linear-gradient(135deg, #6D3A2A, #8B5742)',
    Calamander: 'linear-gradient(135deg, #8B6914, #C8943E)',
    Nedun: 'linear-gradient(135deg, #4A6741, #6B8E5A)',
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2 }, mb: 3.5 }}>
      {types.map((type) => {
        const items = woodInventory.filter((w) => w.type === type);
        const totalBF = items.reduce((s, i) => s + i.boardFeet, 0);
        const totalMin = items.reduce((s, i) => s + i.minStock, 0);
        const pct = Math.min(100, (totalBF / totalMin) * 100);

        return (
          <Paper
            key={type}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              background: gradients[type],
              border: 'none',
              color: '#fff',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TreePine size={18} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{type}</Typography>
              </Box>
              {pct < 80 && <AlertTriangle size={16} color="#FFD54F" />}
            </Box>
            <Typography sx={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>
              {totalBF.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', mb: 1.5 }}>
              board-feet total
            </Typography>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                height: 5,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#fff',
                  borderRadius: 3,
                },
              }}
            />
            <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)', mt: 0.8 }}>
              {Math.round(pct)}% of minimum stock level
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function Inventory() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [wood, setWood] = useState(woodInventory);
  const [hardware, setHardware] = useState(hardwareInventory);
  const [form, setForm] = useState({
    type: 'wood',
    name: '',
    qty: '',
    supplier: '',
    unit: '',
  });

  // Advanced Filtering & Pagination
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const processedData = useMemo(() => {
    let source = tab === 0 ? wood : hardware;
    let result = source;

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        item => item.name.toLowerCase().includes(q) || 
                item.supplier.toLowerCase().includes(q) || 
                (item.type && item.type.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q))
      );
    }

    // Status Filter
    if (statusFilter !== 'all') {
      result = result.filter(item => {
        if (tab === 0) { // Wood status is based on pct
          const pct = (item.boardFeet / item.minStock) * 100;
          if (statusFilter === 'critical') return pct < 65;
          if (statusFilter === 'low') return pct >= 65 && pct < 80;
          return pct >= 80;
        } else { // Hardware status
          return item.status === statusFilter;
        }
      });
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'stock-low': 
          if (tab === 0) return a.boardFeet - b.boardFeet;
          return a.qty - b.qty;
        case 'stock-high': 
          if (tab === 0) return b.boardFeet - a.boardFeet;
          return b.qty - a.qty;
        default: return 0;
      }
    });

    return result;
  }, [wood, hardware, tab, search, statusFilter, sortBy]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentItems = processedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const resetFilters = () => {
    setStatusFilter('all');
    setSortBy('name');
    setSearch('');
    setPage(1);
  };

  const handleAdd = () => {
    if (form.type === 'wood') {
      setWood([
        ...wood,
        {
          id: `W-${(wood.length + 1).toString().padStart(3, '0')}`,
          name: form.name,
          type: form.name.split(' ')[0] || 'Teak',
          boardFeet: Number(form.qty),
          minStock: 100,
          unitCost: 'LKR 0',
          location: 'Warehouse A',
          lastRestocked: new Date().toISOString().slice(0, 10),
          supplier: form.supplier,
          trend: 'up',
        },
      ]);
    } else {
      setHardware([
        ...hardware,
        {
          id: `H-${(hardware.length + 1).toString().padStart(3, '0')}`,
          name: form.name,
          category: form.unit,
          qty: Number(form.qty),
          minStock: 10,
          unit: form.unit,
          unitCost: 'LKR 0',
          supplier: form.supplier,
          status: 'ok',
        },
      ]);
    }
    setAddOpen(false);
    setSnack(true);
    setForm({ type: 'wood', name: '', qty: '', supplier: '', unit: '' });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2D2420', mb: 0.5, fontSize: { xs: '1.4rem', sm: '1.6rem', md: '2.125rem' } }}>
            Inventory Management
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: '#5C524A' }}>
            Track timber stock (board-feet), hardware, and finishing supplies
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
              color: '#FFFFFF',
              '&:hover': { background: 'linear-gradient(135deg, #3A1F15, #5A3628)' },
              borderRadius: '10px',
              fontSize: '0.82rem',
              px: 2.5,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(75,44,32,0.2)',
              '& .MuiButton-startIcon': { color: '#FFFFFF' },
            }}
            onClick={() => setAddOpen(true)}
          >
            Add Stock
          </Button>
          {/* Add Stock Modal */}
          <Dialog 
            open={addOpen} 
            onClose={() => setAddOpen(false)} 
            maxWidth="xs" 
            fullWidth 
            slotProps={{ 
              paper: { 
                sx: { 
                  borderRadius: '24px', 
                  bgcolor: '#fff',
                  boxShadow: '0 24px 48px rgba(75, 44, 32, 0.15)',
                  overflow: 'hidden'
                } 
              } 
            }}
          >
            <DialogTitle sx={{ 
              background: 'linear-gradient(135deg, #4B2C20 0%, #3A1F15 100%)', 
              color: '#fff', 
              fontWeight: 700, 
              fontSize: '1.2rem', 
              px: 3,
              py: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}>
              <Box sx={{ p: 1, borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex' }}>
                <Plus size={18} color="#C8943E" />
              </Box>
              Add New Stock
            </DialogTitle>
            <DialogContent sx={{ pt: '24px !important', px: 3, pb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3, p: 0.5, borderRadius: '12px', bgcolor: '#F8F6F3' }}>
                <Button
                  fullWidth
                  variant={form.type === 'wood' ? 'contained' : 'text'}
                  onClick={() => setForm(f => ({ ...f, type: 'wood' }))}
                  sx={{
                    background: form.type === 'wood' ? '#fff' : 'transparent',
                    color: form.type === 'wood' ? '#4B2C20' : '#7A6E66',
                    fontWeight: form.type === 'wood' ? 700 : 500,
                    borderRadius: '10px',
                    py: 1,
                    boxShadow: form.type === 'wood' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    '&:hover': { background: form.type === 'wood' ? '#fff' : 'rgba(0,0,0,0.02)' }
                  }}
                >
                  Timber
                </Button>
                <Button
                  fullWidth
                  variant={form.type === 'hardware' ? 'contained' : 'text'}
                  onClick={() => setForm(f => ({ ...f, type: 'hardware' }))}
                  sx={{
                    background: form.type === 'hardware' ? '#fff' : 'transparent',
                    color: form.type === 'hardware' ? '#C8943E' : '#7A6E66',
                    fontWeight: form.type === 'hardware' ? 700 : 500,
                    borderRadius: '10px',
                    py: 1,
                    boxShadow: form.type === 'hardware' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    '&:hover': { background: form.type === 'hardware' ? '#fff' : 'rgba(0,0,0,0.02)' }
                  }}
                >
                  Hardware
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label={form.type === 'wood' ? 'Wood Name' : 'Item Name'}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  fullWidth
                  variant="outlined"
                  slotProps={{
                    inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                    input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
                  }}
                />
                <TextField
                  label={form.type === 'wood' ? 'Board Feet' : 'Quantity'}
                  value={form.qty}
                  onChange={e => setForm(f => ({ ...f, qty: e.target.value.replace(/\D/, '') }))}
                  fullWidth
                  slotProps={{
                    inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                    input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
                  }}
                />
                <TextField
                  label="Supplier"
                  value={form.supplier}
                  onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}
                  fullWidth
                  slotProps={{
                    inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                    input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
                  }}
                />
                {form.type === 'hardware' && (
                  <TextField
                    label="Unit (e.g. pcs, gal)"
                    value={form.unit}
                    onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                    fullWidth
                    slotProps={{
                      inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                      input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
                    }}
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'space-between' }}>
              <Button onClick={() => setAddOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600, px: 2, borderRadius: '10px' }}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  background: form.type === 'wood'
                    ? 'linear-gradient(135deg, #4B2C20, #6B4332)'
                    : 'linear-gradient(135deg, #C8943E, #E5B86A)',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  py: 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  },
                }}
                disabled={!form.name || !form.qty || !form.supplier || (form.type === 'hardware' && !form.unit)}
              >
                Add to Stock
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={snack} autoHideDuration={2500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, borderRadius: '8px' }}>
              Stock added successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>

      {/* Wood Summary */}
      <WoodSummaryCards />

      {/* Tabs */}
      <Paper sx={{ borderRadius: '16px', overflow: 'hidden', mb: 3 }}>
        <Box sx={{ px: { xs: 1, md: 2 }, pt: 1, borderBottom: '1px solid #F0EBE4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => { setTab(v); setPage(1); }}
            sx={{
              '& .MuiTab-root': { fontSize: '0.85rem', minHeight: 48 },
              '& .Mui-selected': { color: '#4B2C20 !important', fontWeight: 600 },
              '& .MuiTabs-indicator': { backgroundColor: '#C8943E', height: 3, borderRadius: '3px 3px 0 0' },
            }}
          >
            <Tab icon={<TreePine size={16} />} iconPosition="start" label={`Timber Stock (${wood.length})`} />
            <Tab icon={<Wrench size={16} />} iconPosition="start" label={`Hardware & Supplies (${hardware.length})`} />
          </Tabs>
          
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', pb: 1, px: { xs: 1, md: 0 } }}>
            <TextField
              placeholder="Search items..." size="small" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              sx={{ width: 220, '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: '#F8F6F3', fontSize: '0.85rem', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: '#E8E0D8' }, '&.Mui-focused fieldset': { borderColor: '#C8943E' } } }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search size={16} color="#A09486" /></InputAdornment> } }}
            />
            <Button variant="outlined" onClick={() => setShowFilters(!showFilters)}
              sx={{ borderRadius: '10px', minWidth: 40, width: 40, height: 40, p: 0, borderColor: showFilters ? '#C8943E' : '#E8E0D8', color: showFilters ? '#C8943E' : '#5C524A', bgcolor: showFilters ? 'rgba(200,148,62,0.05)' : 'transparent', '&:hover': { borderColor: '#C8943E' } }}
            ><SlidersHorizontal size={18} /></Button>
          </Box>
        </Box>
        
        <Collapse in={showFilters}>
          <Box sx={{ p: 2, bgcolor: '#FDFBF9', borderBottom: '1px solid #F0EBE4', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ fontSize: '0.82rem' }}>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By" sx={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="stock-low">Lowest Stock First</MenuItem>
                <MenuItem value="stock-high">Highest Stock First</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ fontSize: '0.82rem' }}>Status Level</InputLabel>
              <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} label="Status Level" sx={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="ok">Healthy Stock</MenuItem>
                <MenuItem value="low">Low Stock</MenuItem>
                <MenuItem value="critical">Critical Stock</MenuItem>
              </Select>
            </FormControl>

            {(sortBy !== 'name' || statusFilter !== 'all') && (
              <Button size="small" startIcon={<Trash2 size={14} />} onClick={resetFilters} sx={{ color: '#D32F2F', fontSize: '0.75rem', fontWeight: 600, ml: 'auto' }}>
                Clear Filters
              </Button>
            )}
          </Box>
        </Collapse>

        {/* Wood Tab */}
        {tab === 0 && (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Wood Grade</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Stock (Board-Feet)</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Min. Required</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Status</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Unit Cost</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Location</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Supplier</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((row) => {
                  const pct = (row.boardFeet / row.minStock) * 100;
                  const isLow = pct < 80;
                  const isCritical = pct < 65;
                  const st = isCritical ? statusProps.critical : isLow ? statusProps.low : statusProps.ok;

                  return (
                    <TableRow key={row.id} sx={{ '&:hover': { bgcolor: '#FDFBF9' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: '#FDF8F0' }}>
                            <TreePine size={16} color="#4B2C20" />
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                              {row.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66' }}>
                              {row.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#2D2420' }}>
                            {row.boardFeet.toLocaleString()}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(100, pct)}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              mt: 0.5,
                              width: 100,
                              backgroundColor: '#F0EBE4',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: isCritical ? '#D32F2F' : isLow ? '#ED6C02' : '#43A047',
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66' }}>
                          {row.minStock.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={st.label}
                          size="small"
                          sx={{ fontWeight: 600, fontSize: '0.72rem', bgcolor: st.bg, color: st.color, height: 24 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#2D2420' }}>
                          {row.unitCost}
                        </Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#7A6E66' }}>per BF</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.82rem', color: '#7A6E66' }}>{row.location}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.82rem', color: '#7A6E66' }}>{row.supplier}</Typography>
                      </TableCell>
                      <TableCell>
                        {row.trend === 'up' ? (
                          <TrendingUp size={16} color="#2E7D32" />
                        ) : (
                          <TrendingDown size={16} color="#D32F2F" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Hardware Tab */}
        {tab === 1 && (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Item</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Category</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Qty In Stock</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Min. Required</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Status</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Unit Cost</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Supplier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((row) => {
                  const st = statusProps[row.status];
                  const categoryIcons = {
                    Hinges: Wrench,
                    Screws: Wrench,
                    Handles: Wrench,
                    Finish: Droplets,
                    Adhesive: Droplets,
                    Abrasives: Package,
                  };
                  const Icon = categoryIcons[row.category] || Package;

                  return (
                    <TableRow key={row.id} sx={{ '&:hover': { bgcolor: '#FDFBF9' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: '#FDF8F0' }}>
                            <Icon size={16} color="#4B2C20" />
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                              {row.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66' }}>{row.id}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.category}
                          size="small"
                          sx={{ fontSize: '0.73rem', height: 24, bgcolor: '#FDF8F0', color: '#4B2C20', fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#2D2420' }}>
                          {row.qty.toLocaleString()} {row.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66' }}>
                          {row.minStock.toLocaleString()} {row.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={st.label} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem', bgcolor: st.bg, color: st.color, height: 24 }} />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#2D2420' }}>
                          {row.unitCost}
                        </Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#7A6E66' }}>per {row.unit === 'pcs' ? 'piece' : row.unit}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.82rem', color: '#7A6E66' }}>{row.supplier}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Footer with Pagination */}
        {processedData.length > 0 ? (
          <Box sx={{ p: 2, borderTop: '2px solid #F0EBE4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, bgcolor: '#FDFBF9' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66', fontWeight: 500 }}>
                Showing {Math.min(((page-1)*itemsPerPage)+1, processedData.length)}-{Math.min(page*itemsPerPage, processedData.length)} of {processedData.length} items
              </Typography>
              <FormControl size="small">
                <Select value={itemsPerPage} onChange={(e) => { setItemsPerPage(e.target.value); setPage(1); }}
                  sx={{ borderRadius: '8px', fontSize: '0.8rem', height: 32, bgcolor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E8E0D8' } }}>
                  <MenuItem value={5}>5 per page</MenuItem>
                  <MenuItem value={10}>10 per page</MenuItem>
                  <MenuItem value={20}>20 per page</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {totalPages > 1 && (
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} shape="rounded"
                sx={{ '& .MuiPaginationItem-root': { fontWeight: 600, color: '#5C524A', '&.Mui-selected': { bgcolor: '#4B2C20', color: '#fff', '&:hover': { bgcolor: '#3A1F15' } } } }} />
            )}
          </Box>
        ) : (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography sx={{ color: '#7A6E66', mb: 2 }}>No inventory items match your search or filters.</Typography>
            <Button variant="outlined" onClick={resetFilters} sx={{ borderRadius: '8px', borderColor: '#C8943E', color: '#C8943E' }}>Clear Filters</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
