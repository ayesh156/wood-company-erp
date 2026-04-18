import { useState } from 'react';
import {
  Box, Paper, Typography, Chip, Tabs, Tab, LinearProgress, IconButton,
  TextField, InputAdornment, Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Snackbar, Alert, Fab, MenuItem,
} from '@mui/material';
import {
  Search, Filter, ChevronRight, Clock, CheckCircle2, AlertCircle, Truck, Plus,
} from 'lucide-react';

// ── Production Stages ──────────────────────────────────────
const STAGES = [
  'Timber Selection',
  'Cutting',
  'Assembly',
  'Polishing',
  'Quality Control',
  'Ready for Delivery',
];

const stageColors = {
  'Timber Selection': { bg: '#FFF8E1', text: '#F57F17', bar: '#F9A825' },
  Cutting: { bg: '#FFF3E0', text: '#E65100', bar: '#EF6C00' },
  Assembly: { bg: '#FBE9E7', text: '#BF360C', bar: '#D84315' },
  Polishing: { bg: '#F3E5F5', text: '#6A1B9A', bar: '#8E24AA' },
  'Quality Control': { bg: '#E3F2FD', text: '#1565C0', bar: '#1976D2' },
  'Ready for Delivery': { bg: '#E8F5E9', text: '#2E7D32', bar: '#43A047' },
};

// ── Mock Production Items ──────────────────────────────────
const productionItems = [
  {
    id: 'PRD-001',
    name: 'Luxury Teak Dining Set (12-Seater)',
    customer: 'Cinnamon Grand Hotel',
    wood: 'Teak',
    stage: 'Polishing',
    stageIndex: 3,
    progress: 65,
    dueDate: '2026-04-28',
    assignee: 'Kamal Perera',
    avatar: 'KP',
    priority: 'high',
  },
  {
    id: 'PRD-002',
    name: 'Mahogany Executive Desk Collection',
    customer: 'Shangri-La Colombo',
    wood: 'Mahogany',
    stage: 'Quality Control',
    stageIndex: 4,
    progress: 85,
    dueDate: '2026-04-22',
    assignee: 'Nimal Fernando',
    avatar: 'NF',
    priority: 'high',
  },
  {
    id: 'PRD-003',
    name: 'Calamander Bedroom Suite',
    customer: 'Jetwing Hotels',
    wood: 'Calamander',
    stage: 'Ready for Delivery',
    stageIndex: 5,
    progress: 100,
    dueDate: '2026-04-18',
    assignee: 'Sunil Jayawardena',
    avatar: 'SJ',
    priority: 'medium',
  },
  {
    id: 'PRD-004',
    name: 'Teak Outdoor Lounge Set',
    customer: 'Hilton Colombo',
    wood: 'Teak',
    stage: 'Assembly',
    stageIndex: 2,
    progress: 42,
    dueDate: '2026-05-05',
    assignee: 'Ruwan Bandara',
    avatar: 'RB',
    priority: 'medium',
  },
  {
    id: 'PRD-005',
    name: 'Custom Teak Bar Counter',
    customer: 'Aman Resort',
    wood: 'Teak',
    stage: 'Polishing',
    stageIndex: 3,
    progress: 58,
    dueDate: '2026-05-10',
    assignee: 'Kamal Perera',
    avatar: 'KP',
    priority: 'low',
  },
  {
    id: 'PRD-006',
    name: 'Mahogany Conference Table (20-Seater)',
    customer: 'John Keells Holdings',
    wood: 'Mahogany',
    stage: 'Cutting',
    stageIndex: 1,
    progress: 22,
    dueDate: '2026-05-20',
    assignee: 'Priya de Silva',
    avatar: 'PS',
    priority: 'high',
  },
  {
    id: 'PRD-007',
    name: 'Teak Wardrobe Set (Master Bedroom)',
    customer: 'Waters Edge',
    wood: 'Teak',
    stage: 'Timber Selection',
    stageIndex: 0,
    progress: 8,
    dueDate: '2026-06-01',
    assignee: 'Nimal Fernando',
    avatar: 'NF',
    priority: 'low',
  },
  {
    id: 'PRD-008',
    name: 'Nedun Wood Bookshelf Collection',
    customer: 'Colombo Public Library',
    wood: 'Nedun',
    stage: 'Assembly',
    stageIndex: 2,
    progress: 50,
    dueDate: '2026-05-15',
    assignee: 'Sunil Jayawardena',
    avatar: 'SJ',
    priority: 'medium',
  },
];

const priorityMap = {
  high: { label: 'High', color: '#D32F2F', bg: '#FFEBEE' },
  medium: { label: 'Medium', color: '#ED6C02', bg: '#FFF3E0' },
  low: { label: 'Low', color: '#2E7D32', bg: '#E8F5E9' },
};

// ── Stage Pipeline Visual ──────────────────────────────────
function StagePipeline({ activeIndex }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
      {STAGES.map((stage, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <Box key={stage} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.2,
                py: 0.4,
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: active || done ? 600 : 400,
                backgroundColor: active
                  ? stageColors[stage].bg
                  : done
                  ? '#F0EBE4'
                  : 'transparent',
                color: active
                  ? stageColors[stage].text
                  : done
                  ? '#7A6E66'
                  : '#C4B8AC',
                border: `1px solid ${active ? stageColors[stage].text + '30' : 'transparent'}`,
                whiteSpace: 'nowrap',
              }}
            >
              {done && <CheckCircle2 size={12} />}
              {active && <Clock size={12} />}
              {stage}
            </Box>
            {i < STAGES.length - 1 && (
              <ChevronRight size={14} color="#C4B8AC" />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// ── Production Card ────────────────────────────────────────
function ProductionCard({ item }) {
  const sc = stageColors[item.stage];
  const pr = priorityMap[item.priority];
  const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: '16px', '&:hover': { boxShadow: '0 4px 20px rgba(75,44,32,0.08)' }, transition: 'box-shadow 0.2s' }}>
      {/* Top Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', sm: '0.95rem' }, color: '#2D2420' }}>
              {item.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.78rem', color: '#5C524A' }}>
              {item.customer}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#7A6E66' }}>
              {item.id}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Chip label={pr.label} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem', height: 24, bgcolor: pr.bg, color: pr.color }} />
          <Chip label={item.wood} size="small" sx={{ fontWeight: 500, fontSize: '0.7rem', height: 24, bgcolor: '#FDF8F0', color: '#4B2C20' }} />
        </Box>
      </Box>

      {/* Stage Pipeline - hide on small screens, show compact stage chip instead */}
      <Box sx={{ mb: 2, overflowX: 'auto', pb: 0.5, display: { xs: 'none', sm: 'block' } }}>
        <StagePipeline activeIndex={item.stageIndex} />
      </Box>

      {/* Progress bar */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
          <Chip
            label={item.stage}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.73rem',
              height: 24,
              bgcolor: sc.bg,
              color: sc.text,
            }}
          />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#2D2420' }}>
            {item.progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={item.progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#F0EBE4',
            '& .MuiLinearProgress-bar': {
              backgroundColor: sc.bar,
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Bottom info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#4B2C20', color: '#fff' }}>
            {item.avatar}
          </Avatar>
          <Typography sx={{ fontSize: '0.78rem', color: '#7A6E66' }}>
            {item.assignee}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {daysLeft <= 5 && daysLeft > 0 && <AlertCircle size={14} color="#ED6C02" />}
          {daysLeft <= 0 && <AlertCircle size={14} color="#D32F2F" />}
          {item.progress === 100 && <Truck size={14} color="#2E7D32" />}
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: daysLeft <= 0 ? '#D32F2F' : daysLeft <= 5 ? '#ED6C02' : '#7A6E66',
            }}
          >
            {item.progress === 100
              ? 'Ready to ship'
              : daysLeft <= 0
              ? 'Overdue'
              : `${daysLeft} days left`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

// ── Stage Summary Cards ────────────────────────────────────
function StageSummary({ items }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 1.5, mb: 3 }}>
      {STAGES.map((stage) => {
        const count = items.filter((i) => i.stage === stage).length;
        const sc = stageColors[stage];
        return (
          <Paper
            key={stage}
            sx={{
              p: { xs: 1.5, md: 2 },
              borderRadius: '12px',
              textAlign: 'center',
              border: `1px solid ${sc.text}15`,
              bgcolor: sc.bg,
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 700, color: sc.text, lineHeight: 1 }}>
              {count}
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.6rem', md: '0.68rem' }, fontWeight: 600, color: sc.text, mt: 0.5, opacity: 0.8 }}>
              {stage}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}


// ── Main Component ─────────────────────────────────────────
export default function Production() {
  const [filterTab, setFilterTab] = useState(0);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [items, setItems] = useState(productionItems);
  const [form, setForm] = useState({
    name: '',
    customer: '',
    wood: 'Teak',
    stage: STAGES[0],
    dueDate: '',
    assignee: '',
    priority: 'medium',
  });

  const tabLabels = ['All Items', ...STAGES];

  const filtered = items.filter((item) => {
    const matchesTab = filterTab === 0 || item.stage === STAGES[filterTab - 1];
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAdd = () => {
    setItems([
      ...items,
      {
        id: `PRD-${(items.length + 1).toString().padStart(3, '0')}`,
        name: form.name,
        customer: form.customer,
        wood: form.wood,
        stage: form.stage,
        stageIndex: STAGES.indexOf(form.stage),
        progress: form.stage === 'Ready for Delivery' ? 100 : 0,
        dueDate: form.dueDate,
        assignee: form.assignee,
        avatar: form.assignee.split(' ').map(w => w[0]).join('').toUpperCase() || 'NA',
        priority: form.priority,
      },
    ]);
    setAddOpen(false);
    setSnack(true);
    setForm({ name: '', customer: '', wood: 'Teak', stage: STAGES[0], dueDate: '', assignee: '', priority: 'medium' });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2D2420', mb: 0.5, fontSize: { xs: '1.4rem', sm: '1.6rem', md: '2.125rem' } }}>
            Production Workflow
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: '#5C524A' }}>
            Track furniture items through each manufacturing stage
          </Typography>
        </Box>
        <TextField
          placeholder="Search orders..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 280 },
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
      </Box>

      {/* Stage Summary */}
      <StageSummary items={items} />

      {/* Tabs */}
      <Paper sx={{ borderRadius: '12px', mb: 3, px: 1 }}>
        <Tabs
          value={filterTab}
          onChange={(_, v) => setFilterTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.72rem', sm: '0.82rem' },
              minHeight: 48,
              px: { xs: 1, sm: 2 },
            },
            '& .Mui-selected': {
              color: '#4B2C20 !important',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#C8943E',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {tabLabels.map((label, i) => (
            <Tab
              key={label}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  {label}
                  <Box
                    sx={{
                      px: 0.8,
                      py: 0.1,
                      borderRadius: '5px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor: filterTab === i ? '#4B2C20' : '#F0EBE4',
                      color: filterTab === i ? '#fff' : '#7A6E66',
                      lineHeight: 1.5,
                    }}
                  >
                    {i === 0
                      ? items.length
                      : items.filter((p) => p.stage === STAGES[i - 1]).length}
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Production Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 2,
        }}
      >
        {filtered.map((item) => (
          <ProductionCard key={item.id} item={item} />
        ))}
      </Box>

      {filtered.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px' }}>
          <Filter size={40} color="#C4B8AC" />
          <Typography sx={{ mt: 2, color: '#7A6E66', fontWeight: 500 }}>
            No production items match your filters
          </Typography>
        </Paper>
      )}

      {/* Add Production Item Floating Button */}
      <Fab
        aria-label="add"
        onClick={() => setAddOpen(true)}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 36 },
          right: { xs: 24, md: 36 },
          background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(75,44,32,0.25)',
          zIndex: 1201,
          '&:hover': { background: 'linear-gradient(135deg, #3A1F15, #5A3628)' },
        }}
      >
        <Plus size={24} />
      </Fab>

      {/* Add Production Modal */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: '16px', bgcolor: '#fff', m: { xs: 1.5, sm: 2 } } } }}>
        <DialogTitle sx={{ bgcolor: '#4B2C20', color: '#fff', fontWeight: 700, fontSize: '1.1rem', pb: 1.2, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
          Add Production Item
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important', pb: 1.5 }}>
          <TextField
            label="Product Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Customer"
            value={form.customer}
            onChange={e => setForm(f => ({ ...f, customer: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Wood Type"
            value={form.wood}
            onChange={e => setForm(f => ({ ...f, wood: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          >
            {['Teak', 'Mahogany', 'Calamander', 'Nedun'].map((w) => (
              <MenuItem key={w} value={w}>{w}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Stage"
            value={form.stage}
            onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          >
            {STAGES.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Assignee"
            value={form.assignee}
            onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Priority"
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          >
            {['high', 'medium', 'low'].map((p) => (
              <MenuItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
          <Button onClick={() => setAddOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600 }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{
              background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '8px',
              px: 3,
              boxShadow: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #3A1F15, #5A3628)',
              },
            }}
            disabled={!form.name || !form.customer || !form.dueDate || !form.assignee}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack} autoHideDuration={2500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, borderRadius: '8px' }}>
          Production item added!
        </Alert>
      </Snackbar>
    </Box>
  );
}
