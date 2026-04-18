import { Box, Paper, Typography, Chip, Avatar, IconButton, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown, ArrowUpRight, AlertTriangle, DollarSign, Package, Factory, Users, MoreHorizontal, Eye } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

// ── Mock Data ──────────────────────────────────────────────
const monthlyOutput = [
  { month: 'Jan', output: 42, target: 50 },
  { month: 'Feb', output: 55, target: 50 },
  { month: 'Mar', output: 48, target: 55 },
  { month: 'Apr', output: 62, target: 55 },
  { month: 'May', output: 74, target: 60 },
  { month: 'Jun', output: 68, target: 60 },
  { month: 'Jul', output: 82, target: 65 },
  { month: 'Aug', output: 91, target: 70 },
  { month: 'Sep', output: 86, target: 70 },
  { month: 'Oct', output: 95, target: 75 },
  { month: 'Nov', output: 88, target: 75 },
  { month: 'Dec', output: 102, target: 80 },
];

const revenueData = [
  { month: 'Jan', revenue: 285000 },
  { month: 'Feb', revenue: 320000 },
  { month: 'Mar', revenue: 298000 },
  { month: 'Apr', revenue: 410000 },
  { month: 'May', revenue: 385000 },
  { month: 'Jun', revenue: 450000 },
  { month: 'Jul', revenue: 520000 },
  { month: 'Aug', revenue: 498000 },
  { month: 'Sep', revenue: 540000 },
  { month: 'Oct', revenue: 615000 },
  { month: 'Nov', revenue: 580000 },
  { month: 'Dec', revenue: 670000 },
];

const woodDistribution = [
  { name: 'Teak', value: 45, color: '#4B2C20' },
  { name: 'Mahogany', value: 30, color: '#C8943E' },
  { name: 'Calamander', value: 15, color: '#E5B86A' },
  { name: 'Nedun', value: 10, color: '#8B6F47' },
];

const recentOrders = [
  { id: 'ORD-2024-1847', customer: 'Cinnamon Grand Hotel', item: 'Luxury Teak Dining Set (12-Seater)', status: 'In Production', value: 'LKR 1,250,000', avatar: 'CG' },
  { id: 'ORD-2024-1846', customer: 'Shangri-La Colombo', item: 'Mahogany Executive Desk Collection', status: 'QC Passed', value: 'LKR 890,000', avatar: 'SL' },
  { id: 'ORD-2024-1845', customer: 'Jetwing Hotels', item: 'Calamander Bedroom Suite', status: 'Ready for Delivery', value: 'LKR 2,100,000', avatar: 'JH' },
  { id: 'ORD-2024-1844', customer: 'Hilton Colombo', item: 'Teak Outdoor Lounge Set', status: 'Assembly', value: 'LKR 680,000', avatar: 'HC' },
  { id: 'ORD-2024-1843', customer: 'Aman Resort', item: 'Custom Teak Bar Counter', status: 'Polishing', value: 'LKR 1,450,000', avatar: 'AR' },
];

const stockAlerts = [
  { wood: 'Calamander', current: 120, minimum: 200, unit: 'board-feet', severity: 'critical' },
  { wood: 'Brass Hinges (3")', current: 45, minimum: 100, unit: 'pcs', severity: 'critical' },
  { wood: 'Marine Lacquer', current: 8, minimum: 15, unit: 'gallons', severity: 'warning' },
];

const statusColorMap = {
  'In Production': { bg: '#FFF8E1', color: '#F57F17' },
  'QC Passed': { bg: '#E8F5E9', color: '#2E7D32' },
  'Ready for Delivery': { bg: '#E3F2FD', color: '#1565C0' },
  Assembly: { bg: '#FFF3E0', color: '#E65100' },
  Polishing: { bg: '#F3E5F5', color: '#7B1FA2' },
};

// ── Stat Card ──────────────────────────────────────────────
function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp, gradient, delay = 0 }) {
  return (
    <Paper
      className="premium-card"
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: '14px', md: '18px' },
        background: gradient || '#fff',
        border: gradient ? 'none' : '1px solid rgba(240, 235, 228, 0.8)',
        position: 'relative',
        overflow: 'hidden',
        animation: `fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
        cursor: 'default',
      }}
    >
      {/* Decorative gradient orb */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: gradient
            ? 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(200,148,62,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: '14px',
            backgroundColor: gradient ? 'rgba(255,255,255,0.18)' : '#FDF8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.08) rotate(-3deg)' },
          }}
        >
          <Icon size={20} color={gradient ? '#fff' : '#4B2C20'} />
        </Box>
        {trend && (
          <Chip
            icon={trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            label={trend}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.73rem',
              height: 26,
              backgroundColor: gradient
                ? 'rgba(255,255,255,0.18)'
                : trendUp
                ? 'rgba(46, 125, 50, 0.08)'
                : 'rgba(211, 47, 47, 0.08)',
              color: gradient ? '#fff' : trendUp ? '#2E7D32' : '#D32F2F',
              '& .MuiChip-icon': { color: 'inherit' },
              backdropFilter: gradient ? 'blur(8px)' : 'none',
              border: gradient ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          />
        )}
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: gradient ? '#fff' : '#2D2420',
          fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' },
          fontWeight: 700,
          lineHeight: 1.1,
          mb: 0.5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ color: gradient ? 'rgba(255,255,255,0.85)' : '#5C524A', fontSize: { xs: '0.73rem', sm: '0.82rem' }, fontWeight: 500, position: 'relative', zIndex: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: gradient ? 'rgba(255,255,255,0.6)' : '#7A6E66', fontSize: { xs: '0.65rem', sm: '0.72rem' }, mt: 0.3, position: 'relative', zIndex: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}

// ── Main Dashboard ─────────────────────────────────────────
export default function Dashboard() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: { xs: 2.5, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="h4" sx={{ color: '#2D2420', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}>
            {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}, Rajitha
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1 }}>✨</Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: '#5C524A' }}>
          Here's what's happening at TimberCraft today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, sm: 2, lg: 2.5 },
          mb: { xs: 2.5, md: 3.5 },
        }}
      >
        <StatCard
          icon={Factory}
          title="Daily Production Output"
          value="14"
          subtitle="Units completed today"
          trend="+18%"
          trendUp
          gradient="linear-gradient(135deg, #4B2C20 0%, #6B4332 50%, #4B2C20 100%)"
          delay={0}
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value="LKR 6.7M"
          subtitle="December 2025"
          trend="+15.5%"
          trendUp
          delay={0.05}
        />
        <StatCard
          icon={Package}
          title="Active Orders"
          value="28"
          subtitle="5 ready for delivery"
          trend="+4"
          trendUp
          delay={0.1}
        />
        <StatCard
          icon={Users}
          title="Monthly Payroll"
          value="LKR 3.8M"
          subtitle="47 employees"
          trend="-2.1%"
          delay={0.15}
        />
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 2.5,
          mb: 3.5,
        }}
      >
        {/* Production Output Chart */}
        <Paper className="premium-card" sx={{ p: 3, borderRadius: '18px', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1rem', color: '#2D2420' }}>
                Production Output
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
                Monthly furniture units vs target
              </Typography>
            </Box>
            <Chip label="2025" size="small" sx={{ backgroundColor: '#FDF8F0', color: '#4B2C20', fontWeight: 600 }} />
          </Box>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyOutput} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A09486' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A09486' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #F0EBE4',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  fontSize: 13,
                }}
              />
              <Bar dataKey="output" fill="#4B2C20" radius={[6, 6, 0, 0]} name="Output" />
              <Bar dataKey="target" fill="#E5B86A" radius={[6, 6, 0, 0]} name="Target" opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Wood Distribution */}
        <Paper className="premium-card" sx={{ p: 3, borderRadius: '18px', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', color: '#2D2420', mb: 1 }}>
            Wood Stock Distribution
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#5C524A', mb: 2 }}>
            Current inventory by type
          </Typography>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={woodDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {woodDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #F0EBE4', fontSize: 13 }}
                formatter={(val) => [`${val}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mt: 1 }}>
            {woodDistribution.map((item) => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: item.color }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#5C524A', fontWeight: 500 }}>
                  {item.name} ({item.value}%)
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Revenue Chart + Stock Alerts */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 2.5,
          mb: 3.5,
        }}
      >
        {/* Revenue */}
        <Paper className="premium-card" sx={{ p: 3, borderRadius: '18px', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1rem', color: '#2D2420' }}>
                Revenue Trend
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
                Monthly revenue in LKR
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ArrowUpRight size={16} color="#2E7D32" />
              <Typography sx={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.85rem' }}>
                +23.4% YoY
              </Typography>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8943E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C8943E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A09486' }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#A09486' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #F0EBE4', fontSize: 13 }}
                formatter={(val) => [`LKR ${val.toLocaleString()}`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C8943E"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        {/* Low Stock Alerts */}
        <Paper className="premium-card" sx={{ p: 3, borderRadius: '18px', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
            <AlertTriangle size={18} color="#ED6C02" />
            <Typography variant="h6" sx={{ fontSize: '1rem', color: '#2D2420' }}>
              Low Stock Alerts
            </Typography>
          </Box>
          {stockAlerts.map((alert, i) => (
            <Box
              key={i}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: '12px',
                backgroundColor: alert.severity === 'critical' ? '#FFF5F5' : '#FFFBF0',
                border: `1px solid ${alert.severity === 'critical' ? '#FFE0E0' : '#FFF0D0'}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                  {alert.wood}
                </Typography>
                <Chip
                  label={alert.severity === 'critical' ? 'Critical' : 'Low'}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    backgroundColor: alert.severity === 'critical' ? '#FFCDD2' : '#FFE0B2',
                    color: alert.severity === 'critical' ? '#C62828' : '#E65100',
                  }}
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={(alert.current / alert.minimum) * 100}
                sx={{
                  mb: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#F0EBE4',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: alert.severity === 'critical' ? '#D32F2F' : '#ED6C02',
                    borderRadius: 3,
                  },
                }}
              />
              <Typography sx={{ fontSize: '0.75rem', color: '#5C524A' }}>
                {alert.current} / {alert.minimum} {alert.unit} (min. required)
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Recent Orders */}
      <Paper className="premium-card" sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: '18px', mb: 3, animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '1rem', color: '#2D2420' }}>
              Recent Orders
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#5C524A' }}>
              Latest customer orders and their status
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreHorizontal size={18} color="#7A6E66" />
          </IconButton>
        </Box>
        <Box sx={{ overflowX: 'auto', mx: { xs: -0.5, md: 0 } }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <Box component="thead">
              <Box component="tr">
                {['Customer', 'Item', 'Status', 'Value', ''].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      p: '10px 16px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#7A6E66',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '2px solid #F0EBE4',
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {recentOrders.map((order) => {
                const sc = statusColorMap[order.status] || { bg: '#F5F5F5', color: '#666' };
                return (
                  <Box
                    component="tr"
                    key={order.id}
                    sx={{
                      '&:hover': { backgroundColor: '#FDFBF9' },
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <Box component="td" sx={{ p: '14px 16px', borderBottom: '1px solid #F5F1EC' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #4B2C20, #6B4332)',
                          }}
                        >
                          {order.avatar}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                            {order.customer}
                          </Typography>
                          <Typography sx={{ fontSize: '0.72rem', color: '#7A6E66' }}>
                            {order.id}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ p: '14px 16px', borderBottom: '1px solid #F5F1EC' }}>
                      <Typography sx={{ fontSize: '0.85rem', color: '#2D2420' }}>
                        {order.item}
                      </Typography>
                    </Box>
                    <Box component="td" sx={{ p: '14px 16px', borderBottom: '1px solid #F5F1EC' }}>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.73rem',
                          backgroundColor: sc.bg,
                          color: sc.color,
                          height: 26,
                        }}
                      />
                    </Box>
                    <Box component="td" sx={{ p: '14px 16px', borderBottom: '1px solid #F5F1EC' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2D2420' }}>
                        {order.value}
                      </Typography>
                    </Box>
                    <Box component="td" sx={{ p: '14px 16px', borderBottom: '1px solid #F5F1EC' }}>
                      <IconButton size="small">
                        <Eye size={16} color="#A09486" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
