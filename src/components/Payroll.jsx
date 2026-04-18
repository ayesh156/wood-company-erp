import { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Chip, Tabs, Tab, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Snackbar, Alert, Radio,
  Select, MenuItem, FormControl, InputLabel, Pagination, Collapse
} from '@mui/material';
import {
  Search, Download, FileText, Users, Clock, DollarSign,
  CheckCircle2, XCircle, X, Printer, Plus, UserPlus, SlidersHorizontal, ArrowUpDown, Trash2, Edit3,
} from 'lucide-react';

// ── Mock Employee Data ─────────────────────────────────────
const employees = [
  {
    id: 'EMP-001', name: 'Kamal Perera', role: 'Senior Craftsman', department: 'Production',
    avatar: 'KP', joinDate: '2018-03-15',
    basicSalary: 85000, attendance: 24, totalDays: 26, otHours: 18,
    epf: 6800, etf: 2550, advances: 5000, bonus: 8000,
  },
  {
    id: 'EMP-002', name: 'Nimal Fernando', role: 'Master Carpenter', department: 'Production',
    avatar: 'NF', joinDate: '2015-08-20',
    basicSalary: 95000, attendance: 26, totalDays: 26, otHours: 12,
    epf: 7600, etf: 2850, advances: 0, bonus: 10000,
  },
  {
    id: 'EMP-003', name: 'Sunil Jayawardena', role: 'QC Inspector', department: 'Quality',
    avatar: 'SJ', joinDate: '2019-01-10',
    basicSalary: 72000, attendance: 23, totalDays: 26, otHours: 8,
    epf: 5760, etf: 2160, advances: 10000, bonus: 5000,
  },
  {
    id: 'EMP-004', name: 'Priya de Silva', role: 'Workshop Supervisor', department: 'Production',
    avatar: 'PS', joinDate: '2016-11-05',
    basicSalary: 110000, attendance: 25, totalDays: 26, otHours: 22,
    epf: 8800, etf: 3300, advances: 0, bonus: 15000,
  },
  {
    id: 'EMP-005', name: 'Ruwan Bandara', role: 'Polishing Specialist', department: 'Finishing',
    avatar: 'RB', joinDate: '2020-06-22',
    basicSalary: 68000, attendance: 22, totalDays: 26, otHours: 14,
    epf: 5440, etf: 2040, advances: 3000, bonus: 4000,
  },
  {
    id: 'EMP-006', name: 'Chamari Wickrama', role: 'Inventory Clerk', department: 'Warehouse',
    avatar: 'CW', joinDate: '2021-02-14',
    basicSalary: 55000, attendance: 26, totalDays: 26, otHours: 4,
    epf: 4400, etf: 1650, advances: 0, bonus: 3000,
  },
  {
    id: 'EMP-007', name: 'Dinesh Rathnayake', role: 'Junior Craftsman', department: 'Production',
    avatar: 'DR', joinDate: '2022-09-01',
    basicSalary: 52000, attendance: 20, totalDays: 26, otHours: 6,
    epf: 4160, etf: 1560, advances: 8000, bonus: 2000,
  },
  {
    id: 'EMP-008', name: 'Amali Perera', role: 'HR Coordinator', department: 'Admin',
    avatar: 'AP', joinDate: '2019-07-18',
    basicSalary: 78000, attendance: 25, totalDays: 26, otHours: 2,
    epf: 6240, etf: 2340, advances: 0, bonus: 6000,
  },
  {
    id: 'EMP-009', name: 'Lasantha Kumara', role: 'Timber Cutter', department: 'Production',
    avatar: 'LK', joinDate: '2017-04-30',
    basicSalary: 75000, attendance: 24, totalDays: 26, otHours: 20,
    epf: 6000, etf: 2250, advances: 2000, bonus: 7000,
  },
  {
    id: 'EMP-010', name: 'Mala Gunasekara', role: 'Accounts Officer', department: 'Finance',
    avatar: 'MG', joinDate: '2018-12-03',
    basicSalary: 82000, attendance: 26, totalDays: 26, otHours: 0,
    epf: 6560, etf: 2460, advances: 0, bonus: 5500,
  },
];

const OT_RATE = 750; // LKR per OT hour

function calcSalary(emp) {
  const otPay = emp.otHours * OT_RATE;
  const grossSalary = emp.basicSalary + otPay + emp.bonus;
  const deductions = emp.epf + emp.advances;
  const netSalary = grossSalary - deductions;
  return { otPay, grossSalary, deductions, netSalary };
}

// ── Summary Cards ──────────────────────────────────────────
function PayrollSummary() {
  const totalBasic = employees.reduce((s, e) => s + e.basicSalary, 0);
  const totalOT = employees.reduce((s, e) => s + e.otHours * OT_RATE, 0);
  const totalNet = employees.reduce((s, e) => s + calcSalary(e).netSalary, 0);

  const cards = [
    { label: 'Total Employees', value: employees.length.toString(), sub: '4 departments', icon: Users, gradient: 'linear-gradient(135deg, #4B2C20, #6B4332)' },
    { label: 'Total Basic Salary', value: `LKR ${(totalBasic / 1000).toFixed(0)}K`, sub: 'April 2026', icon: DollarSign, gradient: '' },
    { label: 'OT Payments', value: `LKR ${(totalOT / 1000).toFixed(0)}K`, sub: `${employees.reduce((s, e) => s + e.otHours, 0)} OT hours`, icon: Clock, gradient: '' },
    { label: 'Net Payroll', value: `LKR ${(totalNet / 1000000).toFixed(1)}M`, sub: 'After deductions', icon: FileText, gradient: 'linear-gradient(135deg, #C8943E, #E5B86A)' },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2 }, mb: 3.5 }}>
      {cards.map((c) => {
        const Icon = c.icon;
        const hasGradient = !!c.gradient;
        return (
          <Paper
            key={c.label}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              background: hasGradient ? c.gradient : '#fff',
              border: hasGradient ? 'none' : '1px solid #F0EBE4',
            }}
          >
            <Box
              sx={{
                width: 40, height: 40, borderRadius: '10px',
                bgcolor: hasGradient ? 'rgba(255,255,255,0.2)' : '#FDF8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5,
              }}
            >
              <Icon size={18} color={hasGradient ? '#fff' : '#4B2C20'} />
            </Box>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: hasGradient ? '#fff' : '#2D2420', lineHeight: 1 }}>
              {c.value}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: hasGradient ? 'rgba(255,255,255,0.9)' : '#5C524A', mt: 0.5 }}>
              {c.label}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: hasGradient ? 'rgba(255,255,255,0.65)' : '#7A6E66' }}>
              {c.sub}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}

// ── Payslip Dialog ─────────────────────────────────────────
function PayslipDialog({ open, onClose, employee }) {
  if (!employee) return null;
  const sal = calcSalary(employee);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth 
      slotProps={{ 
        paper: { 
          sx: { 
            borderRadius: '24px', 
            m: { xs: 1, sm: 2 },
            boxShadow: '0 24px 48px rgba(75, 44, 32, 0.15)',
            overflow: 'hidden'
          } 
        } 
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        pb: 2,
        pt: 2.5,
        px: 3,
        background: 'linear-gradient(135deg, #F8F6F3 0%, #fff 100%)',
        borderBottom: '1px solid rgba(240, 235, 228, 0.8)'
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#2D2420', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>Digital Payslip</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66', fontWeight: 500, mt: 0.2 }}>March 2026</Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{ 
            bgcolor: 'rgba(75, 44, 32, 0.04)',
            '&:hover': { bgcolor: 'rgba(75, 44, 32, 0.08)' }
          }}
        >
          <X size={18} color="#4B2C20" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: '24px !important' }}>
        {/* Employee Info */}
        <Paper sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#FDFBF9', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 48, height: 48, fontWeight: 700, background: 'linear-gradient(135deg, #4B2C20, #6B4332)' }}>
              {employee.avatar}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2D2420' }}>{employee.name}</Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#5C524A' }}>{employee.role} • {employee.department}</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66' }}>{employee.id} • Since {employee.joinDate}</Typography>
            </Box>
          </Box>
        </Paper>

        {/* Earnings */}
        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420', mb: 1.5 }}>Earnings</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
          {[
            ['Basic Salary', employee.basicSalary],
            [`Overtime (${employee.otHours} hrs × LKR ${OT_RATE})`, sal.otPay],
            ['Bonus / Allowance', employee.bonus],
          ].map(([label, val]) => (
            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#5C524A' }}>{label}</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#2D2420' }}>
                LKR {val.toLocaleString()}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: '#F0EBE4' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2D2420' }}>Gross Salary</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D2420' }}>
              LKR {sal.grossSalary.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Deductions */}
        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#D32F2F', mb: 1.5 }}>Deductions</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
          {[
            ['EPF (Employee 8%)', employee.epf],
            ['Salary Advances', employee.advances],
          ].map(([label, val]) => (
            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#5C524A' }}>{label}</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#D32F2F' }}>
                - LKR {val.toLocaleString()}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: '#F0EBE4' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#D32F2F' }}>Total Deductions</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#D32F2F' }}>
              - LKR {sal.deductions.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#4B2C20', borderWidth: 1 }} />

        {/* Net Salary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, p: 2, borderRadius: '12px', bgcolor: '#FDF8F0' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2D2420' }}>Net Salary</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#4B2C20' }}>
            LKR {sal.netSalary.toLocaleString()}
          </Typography>
        </Box>

        {/* Attendance */}
        <Box sx={{ mt: 2.5, p: 2, borderRadius: '12px', border: '1px solid #F0EBE4' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#2D2420', mb: 1 }}>Attendance Summary</Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <CheckCircle2 size={14} color="#2E7D32" />
              <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
                Present: <strong style={{ color: '#2D2420' }}>{employee.attendance}</strong>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <XCircle size={14} color="#D32F2F" />
              <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
                Absent: <strong>{employee.totalDays - employee.attendance}</strong>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Clock size={14} color="#ED6C02" />
              <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
                OT Hours: <strong style={{ color: '#2D2420' }}>{employee.otHours}</strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Employer contributions */}
        <Box sx={{ mt: 2, p: 2, borderRadius: '12px', bgcolor: '#F8F6F3' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#5C524A', mb: 0.5 }}>
            Employer Contributions (not deducted from salary)
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
              EPF (12%): <strong style={{ color: '#2D2420' }}>LKR {(employee.basicSalary * 0.12).toLocaleString()}</strong>
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
              ETF (3%): <strong style={{ color: '#2D2420' }}>LKR {employee.etf.toLocaleString()}</strong>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button variant="outlined" startIcon={<Printer size={16} />} sx={{ borderColor: '#E0D8D0', color: '#4B2C20' }}>
          Print
        </Button>
        <Button
          variant="contained"
          startIcon={<Download size={16} />}
          sx={{ background: 'linear-gradient(135deg, #4B2C20, #6B4332)', '&:hover': { background: 'linear-gradient(135deg, #3A1F15, #5A3628)' } }}
        >
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function Payroll() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [payslipEmp, setPayslipEmp] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState('Payroll exported!');
  const [empList, setEmpList] = useState(employees);
  const [addEmpOpen, setAddEmpOpen] = useState(false);
  const [empForm, setEmpForm] = useState({ name: '', role: '', department: 'Production', basicSalary: '', otHours: '', bonus: '' });
  
  // Pagination & Sorting
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState('all');

  const departments = ['All', 'Production', 'Quality', 'Finishing', 'Warehouse', 'Admin', 'Finance'];

  const processedEmps = useMemo(() => {
    let result = empList;
    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.department.toLowerCase().includes(q));
    }
    // Department tab
    if (tab !== 0) result = result.filter(e => e.department === departments[tab]);
    // Salary range
    if (salaryRange === 'high') result = result.filter(e => e.basicSalary >= 80000);
    else if (salaryRange === 'mid') result = result.filter(e => e.basicSalary >= 55000 && e.basicSalary < 80000);
    else if (salaryRange === 'low') result = result.filter(e => e.basicSalary < 55000);
    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'salary-high': return b.basicSalary - a.basicSalary;
        case 'salary-low': return a.basicSalary - b.basicSalary;
        case 'attendance': return b.attendance - a.attendance;
        default: return 0;
      }
    });
    return result;
  }, [empList, search, tab, salaryRange, sortBy]);

  const totalPages = Math.ceil(processedEmps.length / itemsPerPage);
  const currentEmps = processedEmps.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleExport = () => {
    setExportOpen(false);
    setSnackMsg(`Payroll exported as ${exportType.toUpperCase()}!`);
    setSnack(true);
  };

  const handleAddEmp = () => {
    const newId = `EMP-${(empList.length + 1).toString().padStart(3, '0')}`;
    setEmpList([...empList, {
      id: newId, name: empForm.name, role: empForm.role, department: empForm.department,
      avatar: empForm.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      joinDate: new Date().toISOString().slice(0, 10),
      basicSalary: Number(empForm.basicSalary), attendance: 26, totalDays: 26,
      otHours: Number(empForm.otHours) || 0, epf: Math.round(Number(empForm.basicSalary) * 0.08),
      etf: Math.round(Number(empForm.basicSalary) * 0.03), advances: 0, bonus: Number(empForm.bonus) || 0,
    }]);
    setAddEmpOpen(false);
    setEmpForm({ name: '', role: '', department: 'Production', basicSalary: '', otHours: '', bonus: '' });
    setSnackMsg('Employee added successfully!');
    setSnack(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2D2420', mb: 0.5, fontSize: { xs: '1.4rem', sm: '1.6rem', md: '2.125rem' } }}>
            Smart Payroll & HR
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: '#5C524A' }}>
            Employee attendance, overtime, and salary management — April 2026
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search employees..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 220 },
              '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: '#fff', fontSize: '0.85rem' },
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
            startIcon={<UserPlus size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
              color: '#FFFFFF',
              '&:hover': { background: 'linear-gradient(135deg, #3A1F15, #5A3628)' },
              borderRadius: '10px', fontSize: '0.82rem', px: 2.5, whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(75,44,32,0.2)',
              '& .MuiButton-startIcon': { color: '#FFFFFF' },
            }}
            onClick={() => setAddEmpOpen(true)}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            startIcon={<Download size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #C8943E, #E5B86A)',
              color: '#FFFFFF',
              '&:hover': { background: 'linear-gradient(135deg, #A87A2F, #C8943E)' },
              borderRadius: '10px', fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(200,148,62,0.25)',
              '& .MuiButton-startIcon': { color: '#FFFFFF' },
            }}
            onClick={() => setExportOpen(true)}
          >
            Export Payroll
          </Button>
          {/* Export Payroll Modal */}
          <Dialog 
            open={exportOpen} 
            onClose={() => setExportOpen(false)} 
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
                <Download size={18} color="#C8943E" />
              </Box>
              Export Payroll
            </DialogTitle>
            <DialogContent sx={{ pt: '24px !important', px: 3, pb: 2 }}>
              <Typography sx={{ mb: 2.5, color: '#5C524A', fontWeight: 500, fontSize: '0.9rem' }}>
                Select your preferred export format for the April 2026 payroll report.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box
                  onClick={() => setExportType('pdf')}
                  sx={{
                    border: '1px solid',
                    borderColor: exportType === 'pdf' ? '#C8943E' : '#E8E0D8',
                    borderRadius: '12px',
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: exportType === 'pdf' ? 'rgba(200, 148, 62, 0.05)' : '#fff',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#C8943E', bgcolor: 'rgba(200, 148, 62, 0.02)' }
                  }}
                >
                  <Radio 
                    checked={exportType === 'pdf'} 
                    onChange={() => setExportType('pdf')}
                    sx={{ p: 0, color: '#C8943E', '&.Mui-checked': { color: '#C8943E' } }} 
                  />
                  <Box>
                    <Typography sx={{ color: '#4B2C20', fontWeight: 700, fontSize: '0.95rem' }}>PDF Report</Typography>
                    <Typography sx={{ color: '#7A6E66', fontSize: '0.75rem', mt: 0.2 }}>Recommended for sharing</Typography>
                  </Box>
                </Box>
                
                <Box
                  onClick={() => setExportType('csv')}
                  sx={{
                    border: '1px solid',
                    borderColor: exportType === 'csv' ? '#C8943E' : '#E8E0D8',
                    borderRadius: '12px',
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: exportType === 'csv' ? 'rgba(200, 148, 62, 0.05)' : '#fff',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#C8943E', bgcolor: 'rgba(200, 148, 62, 0.02)' }
                  }}
                >
                  <Radio 
                    checked={exportType === 'csv'} 
                    onChange={() => setExportType('csv')}
                    sx={{ p: 0, color: '#C8943E', '&.Mui-checked': { color: '#C8943E' } }} 
                  />
                  <Box>
                    <Typography sx={{ color: '#4B2C20', fontWeight: 700, fontSize: '0.95rem' }}>CSV (Excel)</Typography>
                    <Typography sx={{ color: '#7A6E66', fontSize: '0.75rem', mt: 0.2 }}>Best for data analysis</Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'space-between' }}>
              <Button onClick={() => setExportOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600, px: 2, borderRadius: '10px' }}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleExport}
                sx={{
                  background: 'linear-gradient(135deg, #C8943E, #E5B86A)',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  py: 1,
                  boxShadow: '0 4px 12px rgba(200,148,62,0.2)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(200,148,62,0.3)',
                  },
                }}
              >
                Download
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={snack} autoHideDuration={2500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, borderRadius: '8px' }}>
              Payroll exported as {exportType.toUpperCase()}!
            </Alert>
          </Snackbar>
        </Box>
      </Box>

      {/* Summary */}
      <PayrollSummary />

      {/* Filters Toolbar */}
      <Paper sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden', border: '1px solid #F0EBE4', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff' }}>
          <TextField
            placeholder="Search employees..."
            size="small"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            sx={{ width: { xs: '100%', sm: 280 }, '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: '#F8F6F3', fontSize: '0.85rem', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: '#E8E0D8' }, '&.Mui-focused fieldset': { borderColor: '#C8943E' } } }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search size={16} color="#A09486" /></InputAdornment> } }}
          />
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<SlidersHorizontal size={16} />} onClick={() => setShowFilters(!showFilters)}
              sx={{ borderRadius: '10px', borderColor: showFilters ? '#C8943E' : '#E8E0D8', color: showFilters ? '#C8943E' : '#5C524A', bgcolor: showFilters ? 'rgba(200,148,62,0.05)' : 'transparent', fontSize: '0.82rem', fontWeight: 600, px: 2, '&:hover': { borderColor: '#C8943E' } }}
            >Filters</Button>
            <FormControl size="small" sx={{ minWidth: 165 }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                renderValue={(v) => { const l = { 'name': 'Sort: Name', 'salary-high': 'Sort: Salary ↑', 'salary-low': 'Sort: Salary ↓', 'attendance': 'Sort: Attendance' }; return <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ArrowUpDown size={14} /> {l[v]}</Box>; }}
                sx={{ borderRadius: '10px', fontSize: '0.82rem', fontWeight: 500, color: '#4B2C20', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E8E0D8' } }}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="salary-high">Salary (High → Low)</MenuItem>
                <MenuItem value="salary-low">Salary (Low → High)</MenuItem>
                <MenuItem value="attendance">Attendance</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Collapse in={showFilters}>
          <Box sx={{ p: 2, pt: 0, bgcolor: '#fff', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 155 }}>
              <InputLabel sx={{ fontSize: '0.82rem' }}>Salary Range</InputLabel>
              <Select value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value); setPage(1); }} label="Salary Range" sx={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                <MenuItem value="all">All Ranges</MenuItem>
                <MenuItem value="high">≥ LKR 80K</MenuItem>
                <MenuItem value="mid">LKR 55K - 80K</MenuItem>
                <MenuItem value="low">&lt; LKR 55K</MenuItem>
              </Select>
            </FormControl>
            {salaryRange !== 'all' && <Button size="small" startIcon={<Trash2 size={14} />} onClick={() => { setSalaryRange('all'); setPage(1); }} sx={{ color: '#D32F2F', fontSize: '0.75rem', fontWeight: 600, ml: 'auto' }}>Clear Filters</Button>}
          </Box>
        </Collapse>
      </Paper>

      {/* Table */}
      <Paper sx={{ borderRadius: '16px', overflow: 'hidden', mb: 3 }}>
        <Box sx={{ px: { xs: 1, md: 2 }, pt: 1, borderBottom: '1px solid #F0EBE4' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': { fontSize: '0.82rem', minHeight: 48 },
              '& .Mui-selected': { color: '#4B2C20 !important', fontWeight: 600 },
              '& .MuiTabs-indicator': { backgroundColor: '#C8943E', height: 3, borderRadius: '3px 3px 0 0' },
            }}
          >
            {departments.map((dept) => (
              <Tab
                key={dept}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    {dept}
                    <Box
                      sx={{
                        px: 0.8, py: 0.1, borderRadius: '5px', fontSize: '0.7rem', fontWeight: 600,
                        bgcolor: '#F0EBE4', color: '#7A6E66', lineHeight: 1.5,
                      }}
                    >
                      {dept === 'All' ? employees.length : employees.filter((e) => e.department === dept).length}
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Employee</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Department</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Attendance</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>OT Hours</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Basic Salary</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Gross Salary</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Deductions</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Net Salary</TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>Payslip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEmps.map((emp) => {
                const sal = calcSalary(emp);
                const attendPct = (emp.attendance / emp.totalDays) * 100;

                return (
                  <TableRow key={emp.id} sx={{ '&:hover': { bgcolor: '#FDFBF9' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, fontSize: '0.72rem', fontWeight: 700, background: 'linear-gradient(135deg, #4B2C20, #6B4332)' }}>
                          {emp.avatar}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                            {emp.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66' }}>{emp.role}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={emp.department} size="small" sx={{ fontSize: '0.73rem', height: 24, bgcolor: '#FDF8F0', color: '#4B2C20', fontWeight: 500 }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                          {emp.attendance}/{emp.totalDays}
                        </Typography>
                        <Chip
                          label={`${Math.round(attendPct)}%`}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            bgcolor: attendPct >= 95 ? '#E8F5E9' : attendPct >= 85 ? '#FFF3E0' : '#FFEBEE',
                            color: attendPct >= 95 ? '#2E7D32' : attendPct >= 85 ? '#E65100' : '#D32F2F',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Clock size={14} color="#7A6E66" />
                        <Typography sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#2D2420' }}>
                          {emp.otHours} hrs
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#2D2420' }}>
                        LKR {emp.basicSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                        LKR {sal.grossSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#D32F2F' }}>
                        - LKR {sal.deductions.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#4B2C20' }}>
                        LKR {sal.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FileText size={14} />}
                        onClick={() => setPayslipEmp(emp)}
                        sx={{
                          borderColor: '#E0D8D0',
                          color: '#4B2C20',
                          fontSize: '0.73rem',
                          borderRadius: '8px',
                          '&:hover': { borderColor: '#C8943E', backgroundColor: '#FDF8F0' },
                        }}
                      >
                        Payslip
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer with Pagination */}
        <Box sx={{ p: 2, borderTop: '2px solid #F0EBE4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, bgcolor: '#FDFBF9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#7A6E66', fontWeight: 500 }}>
              Showing {Math.min(((page-1)*itemsPerPage)+1, processedEmps.length)}-{Math.min(page*itemsPerPage, processedEmps.length)} of {processedEmps.length}
            </Typography>
            <FormControl size="small">
              <Select value={itemsPerPage} onChange={(e) => { setItemsPerPage(e.target.value); setPage(1); }}
                sx={{ borderRadius: '8px', fontSize: '0.8rem', height: 32, bgcolor: '#F8F6F3', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                <MenuItem value={5}>5 per page</MenuItem>
                <MenuItem value={10}>10 per page</MenuItem>
                <MenuItem value={20}>20 per page</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Net Payroll</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: '#4B2C20' }}>
                LKR {processedEmps.reduce((s, e) => s + calcSalary(e).netSalary, 0).toLocaleString()}
              </Typography>
            </Box>
            {totalPages > 1 && <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} shape="rounded"
              sx={{ '& .MuiPaginationItem-root': { fontWeight: 600, color: '#5C524A', '&.Mui-selected': { bgcolor: '#4B2C20', color: '#fff', '&:hover': { bgcolor: '#3A1F15' } } } }} />}
          </Box>
        </Box>
      </Paper>

      {/* Add Employee Modal */}
      <Dialog open={addEmpOpen} onClose={() => setAddEmpOpen(false)} maxWidth="xs" fullWidth
        slotProps={{ paper: { sx: { borderRadius: '24px', bgcolor: '#fff', boxShadow: '0 24px 48px rgba(75,44,32,0.15)', overflow: 'hidden' } } }}>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #4B2C20 0%, #3A1F15 100%)', color: '#fff', fontWeight: 700, fontSize: '1.2rem', px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex' }}><UserPlus size={18} color="#C8943E" /></Box>
          Add New Employee
        </DialogTitle>
        <DialogContent sx={{ pt: '24px !important', px: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Full Name" value={empForm.name} onChange={e => setEmpForm(f => ({ ...f, name: e.target.value }))} fullWidth
              slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }} />
            <TextField label="Role / Position" value={empForm.role} onChange={e => setEmpForm(f => ({ ...f, role: e.target.value }))} fullWidth
              slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }} />
            <TextField select label="Department" value={empForm.department} onChange={e => setEmpForm(f => ({ ...f, department: e.target.value }))} fullWidth
              slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }}>
              {['Production', 'Quality', 'Finishing', 'Warehouse', 'Admin', 'Finance'].map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
            <TextField label="Basic Salary (LKR)" value={empForm.basicSalary} onChange={e => setEmpForm(f => ({ ...f, basicSalary: e.target.value.replace(/\D/, '') }))} fullWidth
              slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="OT Hours" value={empForm.otHours} onChange={e => setEmpForm(f => ({ ...f, otHours: e.target.value.replace(/\D/, '') }))} fullWidth
                slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }} />
              <TextField label="Bonus (LKR)" value={empForm.bonus} onChange={e => setEmpForm(f => ({ ...f, bonus: e.target.value.replace(/\D/, '') }))} fullWidth
                slotProps={{ inputLabel: { sx: { color: '#7A6E66', fontSize: '0.9rem' } }, input: { sx: { borderRadius: '12px', '& fieldset': { borderColor: '#E8E0D8' } } } }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'space-between' }}>
          <Button onClick={() => setAddEmpOpen(false)} sx={{ color: '#7A6E66', fontWeight: 600, px: 2, borderRadius: '10px' }}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEmp}
            sx={{ background: 'linear-gradient(135deg, #4B2C20, #6B4332)', color: '#fff', fontWeight: 700, borderRadius: '10px', px: 4, py: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(0,0,0,0.15)' } }}
            disabled={!empForm.name || !empForm.role || !empForm.basicSalary}>Add Employee</Button>
        </DialogActions>
      </Dialog>
      {/* Payslip Dialog */}
      <PayslipDialog
        open={!!payslipEmp}
        onClose={() => setPayslipEmp(null)}
        employee={payslipEmp}
      />
    </Box>
  );
}
