import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
 Chart as ChartJS, 
 CategoryScale, 
 LinearScale, 
 BarElement,
 Title, 
 Tooltip, 
 Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Film } from 'lucide-react';
import Loader from '../components/Loader';

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);

// Animated Counter Component
const AnimatedNumber = ({ value }) => {
 const [displayValue, setDisplayValue] = useState(0);
 const cleanValue = value.toString().replace('₹', '').replace('$', '');
 const targetValue = parseFloat(cleanValue) || 0;
 const hasSymbol = value.toString().includes('₹') || value.toString().includes('$');
 const symbol = value.toString().includes('₹') ? '₹' : value.toString().includes('$') ? '$' : '';
 
 useEffect(() => {
 let start = 0;
 const end = targetValue;
 if (start === end) {
  setDisplayValue(end);
  return;
 }

 let totalDuration = 1000; // 1 second
 let increment = end / (totalDuration / 16); 
 
 let timer = setInterval(() => {
  start += increment;
  if (start >= end) {
  setDisplayValue(end);
  clearInterval(timer);
  } else {
  setDisplayValue(start);
  }
 }, 16);

 return () => clearInterval(timer);
 }, [targetValue]);

 const formatted = targetValue % 1 !== 0 ? displayValue.toFixed(2) : Math.floor(displayValue).toLocaleString();
 return <span>{symbol}{formatted}</span>;
};

const Dashboard = () => {
 const [backendStats, setBackendStats] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
 setLoading(true);
 fetch('http://localhost:5001/api/stats')
  .then(res => res.json())
  .then(data => {
  setBackendStats(data);
  setLoading(false);
  })
  .catch(err => {
  console.log('Backend not running yet, using local defaults');
  setLoading(false);
  });
 }, []);

 

 const user = JSON.parse(localStorage.getItem('user') || '{}');
 const isSubAdmin = user.role === 'sub-admin';

 const allStats = [
 { label: 'Language', value: backendStats?.languages || '6', colorClass: 'stat-lang', path: '/admin/language' },
 { label: 'Genres', value: backendStats?.genres || '9', colorClass: 'stat-genres', path: '/admin/genres' },
 { label: 'Movies', value: backendStats?.movies || '33', colorClass: 'stat-movies', path: '/admin/movies' },
 { label: 'Shows', value: backendStats?.shows || '0', colorClass: 'stat-shows', path: '/admin/tv-shows/shows' },
 { label: 'Seasons', value: backendStats?.seasons || '0', colorClass: 'stat-revenue', path: '/admin/tv-shows/seasons' },
 { label: 'Episodes', value: backendStats?.episodes || '0', colorClass: 'stat-users', path: '/admin/tv-shows/episodes' },
 { label: 'Sports', value: backendStats?.sports || '0', colorClass: 'stat-sports', path: '/admin/sports/video' },
 { label: 'Live TV', value: backendStats?.liveTv || '0', colorClass: 'stat-livetv', path: '/admin/live-tv/channel', masterOnly: true },
 { label: 'Users', value: backendStats?.users || '0', colorClass: 'stat-users', path: '/admin/users', masterOnly: true },
 { label: 'Transactions', value: backendStats?.transactions || '0', colorClass: 'stat-trans', path: '/admin/transactions', masterOnly: true },
 { label: 'Daily Revenue', value: `₹${backendStats?.revenue?.daily || '0.00'}`, colorClass: 'stat-trans', masterOnly: true },
 { label: 'Weekly Revenue', value: `₹${backendStats?.revenue?.weekly || '0.00'}`, colorClass: 'stat-genres', masterOnly: true },
 { label: 'Monthly Revenue', value: `₹${backendStats?.revenue?.monthly || '0.00'}`, colorClass: 'stat-movies', masterOnly: true },
 { label: 'Yearly Revenue', value: `₹${backendStats?.revenue?.yearly || '0.00'}`, colorClass: 'stat-revenue', masterOnly: true },
 ];

 const stats = allStats.filter(s => !isSubAdmin || !s.masterOnly);

 const chartData = {
 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
 datasets: [
  {
  label: 'Basic Plan',
  data: backendStats?.planStats?.basic || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  backgroundColor: '#ff7bb5',
  borderRadius: 2,
  barThickness: 8,
  },
  {
  label: 'Premium Plan',
  data: backendStats?.planStats?.premium || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  backgroundColor: '#6472b5',
  borderRadius: 2,
  barThickness: 8,
  },
  {
  label: 'Platinum Plan',
  data: backendStats?.planStats?.platinum || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  backgroundColor: '#2db5d5',
  borderRadius: 2,
  barThickness: 8,
  },
  {
  label: 'Diamond Plan',
  data: backendStats?.planStats?.diamond || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  backgroundColor: '#b3d332',
  borderRadius: 2,
  barThickness: 8,
  },
 ],
 };

 const chartOptions = {
 responsive: true,
 maintainAspectRatio: false,
 plugins: {
  legend: { display: false },
  tooltip: { mode: 'index', intersect: false },
 },
 scales: {
  y: {
  beginAtZero: true,
  max: 4,
  ticks: { stepSize: 1, color: '#555', font: { size: 11 } },
  grid: { color: '#333', drawBorder: false, drawTicks: false },
  },
  x: {
  grid: { display: false },
  ticks: { color: '#555', font: { size: 11 } },
  },
 },
 };
  if (loading) {
    return <Loader />;
  }
  return (
 <div className="dashboard-page">
  <div className="stats-grid">
  {stats.map((stat, index) => (
   <div 
   key={index} 
   className="stat-card" 
   onClick={() => stat.path && navigate(stat.path)}
   style={{ cursor: stat.path ? 'pointer' : 'default' }}
   >
   <span className={`stat-value ${stat.colorClass}`}>
    <AnimatedNumber value={stat.value} />
   </span>
   <span className="stat-label">{stat.label}</span>
   </div>
  ))}
  </div>

  <div className="chart-section">
  <div className="chart-header">
   <h2 className="chart-title">Users Plan Statistics</h2>
   <p className="chart-subtitle">Current Year</p>
  </div>

  <div className="chart-legend-top">
   <div className="legend-item">
   <div className="dot" style={{ backgroundColor: '#ff7bb5' }}></div>
   <span style={{ color: '#ff7bb5' }}>Basic Plan</span>
   </div>
   <div className="legend-item">
   <div className="dot" style={{ backgroundColor: '#6472b5' }}></div>
   <span style={{ color: '#6472b5' }}>Premium Plan</span>
   </div>
   <div className="legend-item">
   <div className="dot" style={{ backgroundColor: '#2db5d5' }}></div>
   <span style={{ color: '#2db5d5' }}>Platinum Plan</span>
   </div>
   <div className="legend-item">
   <div className="dot" style={{ backgroundColor: '#b3d332' }}></div>
   <span style={{ color: '#b3d332' }}>Diamond Plan</span>
   </div>
  </div>
  
  <div style={{ height: '350px' }}>
   <Bar data={chartData} options={chartOptions} />
  </div>
  </div>

  <style dangerouslySetInnerHTML={{ __html: `
  .dashboard-page {
   animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
   from { opacity: 0; transform: translateY(10px); }
   to { opacity: 1; transform: translateY(0); }
  }
  ` }} />
 </div>
 );
};

export default Dashboard;
