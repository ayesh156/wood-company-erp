import { useState } from 'react';
import {
  Box, Paper, Typography, Chip, Tabs, Tab, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, IconButton, Button, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
} from '@mui/material';
import {
  Search, Plus, TreePine, Wrench, AlertTriangle,
  TrendingDown, TrendingUp, Package, Droplets,
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

  const filteredWood = wood.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.type.toLowerCase().includes(search.toLowerCase()) ||
      w.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHardware = hardware.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.category.toLowerCase().includes(search.toLowerCase()) ||
      h.supplier.toLowerCase().includes(search.toLowerCase())
  );

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
          <TextField
            placeholder="Search inventory..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 220 },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#fff',
                fontSize: '0.85rem',
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#A09486" />
                  </InputAdornment>
                ),
              }
            }}
          />
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
          <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: '16px', bgcolor: '#fff' } } }}>
            <DialogTitle sx={{ bgcolor: '#4B2C20', color: '#fff', fontWeight: 700, fontSize: '1.1rem', pb: 1.2, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              Add Stock
            </DialogTitle>
            <DialogContent sx={{ pt: 2, pb: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant={form.type === 'wood' ? 'contained' : 'outlined'}
                  onClick={() => setForm(f => ({ ...f, type: 'wood' }))}
                  sx={{
                    background: form.type === 'wood' ? 'linear-gradient(135deg, #4B2C20, #6B4332)' : '#fff',
                    color: form.type === 'wood' ? '#fff' : '#4B2C20',
                    borderColor: '#4B2C20',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2,
                  }}
                >
                  Timber
                </Button>
                <Button
                  variant={form.type === 'hardware' ? 'contained' : 'outlined'}
                  onClick={() => setForm(f => ({ ...f, type: 'hardware' }))}
                  sx={{
                    background: form.type === 'hardware' ? 'linear-gradient(135deg, #C8943E, #E5B86A)' : '#fff',
                    color: form.type === 'hardware' ? '#fff' : '#C8943E',
                    borderColor: '#C8943E',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2,
                  }}
                >
                  Hardware
                </Button>
              </Box>
              <TextField
                label={form.type === 'wood' ? 'Wood Name' : 'Item Name'}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ style: { color: '#7A6E66' } }}
              />
              <TextField
                label={form.type === 'wood' ? 'Board Feet' : 'Quantity'}
                value={form.qty}
                onChange={e => setForm(f => ({ ...f, qty: e.target.value.replace(/\D/, '') }))}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ style: { color: '#7A6E66' } }}
              />
              <TextField
                label="Supplier"
                value={form.supplier}
                onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ style: { color: '#7A6E66' } }}
              />
              {form.type === 'hardware' && (
                <TextField
                  label="Unit (e.g. pcs, gal)"
                  value={form.unit}
                  onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ style: { color: '#7A6E66' } }}
                />
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
              <Button onClick={() => setAddOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600 }}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  background: form.type === 'wood'
                    ? 'linear-gradient(135deg, #4B2C20, #6B4332)'
                    : 'linear-gradient(135deg, #C8943E, #E5B86A)',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '8px',
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': {
                    background: form.type === 'wood'
                      ? 'linear-gradient(135deg, #3A1F15, #5A3628)'
                      : 'linear-gradient(135deg, #A87A2F, #C8943E)',
                  },
                }}
                disabled={!form.name || !form.qty || !form.supplier || (form.type === 'hardware' && !form.unit)}
              >
                Add
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
        <Box sx={{ px: { xs: 1, md: 2 }, pt: 1, borderBottom: '1px solid #F0EBE4' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              '& .MuiTab-root': { fontSize: '0.85rem', minHeight: 48 },
              '& .Mui-selected': { color: '#4B2C20 !important', fontWeight: 600 },
              '& .MuiTabs-indicator': { backgroundColor: '#C8943E', height: 3, borderRadius: '3px 3px 0 0' },
            }}
          >
            <Tab
              icon={<TreePine size={16} />}
              iconPosition="start"
              label={`Timber Stock (${woodInventory.length})`}
            />
            <Tab
              icon={<Wrench size={16} />}
              iconPosition="start"
              label={`Hardware & Supplies (${hardwareInventory.length})`}
            />
          </Tabs>
        </Box>

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
                {filteredWood.map((row) => {
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
                {filteredHardware.map((row) => {
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
      </Paper>
    </Box>
  );
}
