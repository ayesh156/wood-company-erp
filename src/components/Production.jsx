import { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Chip, Tabs, Tab, LinearProgress, IconButton,
  TextField, InputAdornment, Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Snackbar, Alert, Fab, MenuItem, Select, FormControl,
  Pagination, Tooltip, Collapse, InputLabel
} from '@mui/material';
import {
  Search, Filter, ChevronRight, Clock, CheckCircle2, AlertCircle, Truck, Plus, 
  ArrowUpDown, SlidersHorizontal, Package, Trash2
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

  // Advanced Filtering & Pagination State
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [woodFilter, setWoodFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, progress-high, progress-low
  
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const tabLabels = ['All Items', ...STAGES];

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

  // Filter and Sort Logic
  const processedItems = useMemo(() => {
    let result = items;

    // 1. Tab Filter (Stage)
    if (filterTab !== 0) {
      result = result.filter(item => item.stage === STAGES[filterTab - 1]);
    }

    // 2. Search Filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        item => item.name.toLowerCase().includes(q) || 
                item.customer.toLowerCase().includes(q) || 
                item.id.toLowerCase().includes(q)
      );
    }

    // 3. Priority Filter
    if (priorityFilter !== 'all') {
      result = result.filter(item => item.priority === priorityFilter);
    }

    // 4. Wood Filter
    if (woodFilter !== 'all') {
      result = result.filter(item => item.wood.toLowerCase() === woodFilter.toLowerCase());
    }

    // 5. Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'oldest': return new Date(a.dueDate) - new Date(b.dueDate);
        case 'newest': return new Date(b.dueDate) - new Date(a.dueDate);
        case 'progress-high': return b.progress - a.progress;
        case 'progress-low': return a.progress - b.progress;
        default: return 0;
      }
    });

    return result;
  }, [items, filterTab, search, priorityFilter, woodFilter, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(processedItems.length / itemsPerPage);
  const currentItems = processedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const resetFilters = () => {
    setPriorityFilter('all');
    setWoodFilter('all');
    setSortBy('newest');
    setSearch('');
    setPage(1);
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
            New Production Item
          </Button>
        </Box>
      </Box>

      {/* Advanced Toolbar & Filters */}
      <Paper sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden', border: '1px solid #F0EBE4', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff' }}>
          <TextField
            placeholder="Search production orders..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#F8F6F3',
                fontSize: '0.85rem',
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: '#E8E0D8' },
                '&.Mui-focused fieldset': { borderColor: '#C8943E' },
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
          
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<SlidersHorizontal size={16} />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                borderRadius: '10px',
                borderColor: showFilters ? '#C8943E' : '#E8E0D8',
                color: showFilters ? '#C8943E' : '#5C524A',
                bgcolor: showFilters ? 'rgba(200, 148, 62, 0.05)' : 'transparent',
                fontSize: '0.82rem',
                fontWeight: 600,
                px: 2,
                '&:hover': { borderColor: '#C8943E', bgcolor: 'rgba(200, 148, 62, 0.05)' }
              }}
            >
              Filters
            </Button>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  const labels = {
                    'newest': 'Sort: Due Soonest',
                    'oldest': 'Sort: Due Latest',
                    'progress-high': 'Sort: Highest Progress',
                    'progress-low': 'Sort: Lowest Progress'
                  };
                  return <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ArrowUpDown size={14} /> {labels[selected]}</Box>;
                }}
                sx={{
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: '#4B2C20',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E8E0D8' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#C8943E' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#C8943E' },
                }}
              >
                <MenuItem value="newest">Due Soonest</MenuItem>
                <MenuItem value="oldest">Due Latest</MenuItem>
                <MenuItem value="progress-high">Highest Progress</MenuItem>
                <MenuItem value="progress-low">Lowest Progress</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Collapse in={showFilters}>
          <Box sx={{ p: 2, pt: 0, bgcolor: '#fff', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '0.82rem' }}>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
                label="Priority"
                sx={{ borderRadius: '8px', fontSize: '0.82rem' }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '0.82rem' }}>Wood Type</InputLabel>
              <Select
                value={woodFilter}
                onChange={(e) => { setWoodFilter(e.target.value); setPage(1); }}
                label="Wood Type"
                sx={{ borderRadius: '8px', fontSize: '0.82rem' }}
              >
                <MenuItem value="all">All Woods</MenuItem>
                <MenuItem value="teak">Teak</MenuItem>
                <MenuItem value="mahogany">Mahogany</MenuItem>
                <MenuItem value="calamander">Calamander</MenuItem>
                <MenuItem value="nedun">Nedun</MenuItem>
              </Select>
            </FormControl>

            {(priorityFilter !== 'all' || woodFilter !== 'all') && (
              <Button 
                size="small" 
                startIcon={<Trash2 size={14} />} 
                onClick={resetFilters}
                sx={{ color: '#D32F2F', fontSize: '0.75rem', fontWeight: 600, ml: 'auto' }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Collapse>
      </Paper>

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
        {currentItems.map((item, index) => (
          <Box key={item.id} sx={{ animation: `fadeSlideIn 0.4s ease-out ${index * 0.05}s both` }}>
            <ProductionCard item={item} />
          </Box>
        ))}
      </Box>

      {processedItems.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: '16px', border: '1px dashed #E8E0D8', bgcolor: '#FDFBF9' }}>
          <Box sx={{ mx: 'auto', width: 64, height: 64, borderRadius: '50%', bgcolor: '#F0EBE4', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Filter size={32} color="#A09486" />
          </Box>
          <Typography sx={{ color: '#4B2C20', fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
            No matching items found
          </Typography>
          <Typography sx={{ color: '#7A6E66', fontSize: '0.85rem', mb: 3 }}>
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
          <Button variant="outlined" onClick={resetFilters} sx={{ borderRadius: '8px', borderColor: '#C8943E', color: '#C8943E' }}>
            Clear Filters
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2, p: 2, borderRadius: '16px', bgcolor: '#fff', border: '1px solid #F0EBE4' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66', fontWeight: 500 }}>
              Showing {((page - 1) * itemsPerPage) + 1}-{Math.min(page * itemsPerPage, processedItems.length)} of {processedItems.length} items
            </Typography>
            <FormControl size="small">
              <Select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(e.target.value); setPage(1); }}
                sx={{
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  height: 32,
                  bgcolor: '#F8F6F3',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}
              >
                <MenuItem value={6}>6 per page</MenuItem>
                <MenuItem value={10}>10 per page</MenuItem>
                <MenuItem value={20}>20 per page</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="standard"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
                color: '#5C524A',
                '&.Mui-selected': {
                  bgcolor: '#4B2C20',
                  color: '#fff',
                  '&:hover': { bgcolor: '#3A1F15' }
                }
              }
            }}
          />
        </Box>
      )}

      {/* Add Production Modal */}
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
              m: { xs: 1.5, sm: 2 },
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
          Add Production Item
        </DialogTitle>
        <DialogContent sx={{ pt: '24px !important', px: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Product Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              fullWidth
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
            />
            <TextField
              label="Customer"
              value={form.customer}
              onChange={e => setForm(f => ({ ...f, customer: e.target.value }))}
              fullWidth
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
            />
            <TextField
              select
              label="Wood Type"
              value={form.wood}
              onChange={e => setForm(f => ({ ...f, wood: e.target.value }))}
              fullWidth
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
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
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
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
              slotProps={{ 
                inputLabel: { shrink: true, sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
            />
            <TextField
              label="Assignee"
              value={form.assignee}
              onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
              fullWidth
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
            />
            <TextField
              select
              label="Priority"
              value={form.priority}
              onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
              fullWidth
              slotProps={{
                inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } },
                input: { sx: { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: '#E8E0D8' } } }
              }}
            >
              {['high', 'medium', 'low'].map((p) => (
                <MenuItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'space-between' }}>
          <Button onClick={() => setAddOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600, px: 2, borderRadius: '10px' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{
              background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
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
            disabled={!form.name || !form.customer || !form.dueDate || !form.assignee}
          >
            Create Item
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
