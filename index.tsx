import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  LayoutDashboard,
  Database,
  FileSpreadsheet,
  Settings,
  Plus,
  UploadCloud,
  FileText,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Search,
  Filter,
  Download,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA ---

const salesData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Home Goods', value: 200 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const initialFiles = [
  { id: 1, name: 'sales_q1_2024.csv', type: 'CSV', size: '2.4 MB', status: 'ready', uploadedAt: '2 hours ago' },
  { id: 2, name: 'customer_leads.xlsx', type: 'Excel', size: '1.1 MB', status: 'processing', uploadedAt: '5 mins ago' },
  { id: 3, name: 'inventory_logs.json', type: 'JSON', size: '850 KB', status: 'error', uploadedAt: '1 day ago' },
];

const initialDatabases = [
  { id: 1, name: 'Production DB', type: 'PostgreSQL', host: 'db.prod.nexus.com', status: 'connected' },
  { id: 2, name: 'Analytics Warehouse', type: 'Snowflake', host: 'nexus.snowflakecomputing.com', status: 'connected' },
];

// --- MAIN COMPONENT ---

type View = 'dashboard' | 'datasources' | 'settings';

export default function BIDashboard() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Global State for Data Sources
  const [files, setFiles] = useState(initialFiles);
  const [databases, setDatabases] = useState(initialDatabases);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-slate-900 text-slate-300 flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-16 flex items-center px-4 bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && <span className="font-bold text-white text-lg tracking-tight">Nexus BI</span>}
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 px-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" isActive={currentView === 'dashboard'} isOpen={isSidebarOpen} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={<Database />} label="Data Sources" isActive={currentView === 'datasources'} isOpen={isSidebarOpen} onClick={() => setCurrentView('datasources')} />
          <SidebarItem icon={<Settings />} label="Settings" isActive={currentView === 'settings'} isOpen={isSidebarOpen} onClick={() => setCurrentView('settings')} />
        </nav>

        <div className="p-2 border-t border-slate-800">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center gap-2 p-2 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
             {isSidebarOpen ? <span className="text-sm">Collapse</span> : <MoreVertical className="w-5 h-5" />}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-xl font-semibold text-slate-800 capitalize">
            {currentView === 'datasources' ? 'Data Connectors' : currentView}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Ask a question about your data..."
                className="pl-10 pr-4 py-2.5 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 md:w-96 transition-all duration-300 focus:w-[500px] border border-transparent focus:bg-white"
              />
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-2 text-xs text-slate-500 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                  Try: <span className="font-semibold text-slate-600">"Compare revenue vs profit for Q1"</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-medium text-sm">JD</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'datasources' && <DataSourcesView files={files} setFiles={setFiles} databases={databases} setDatabases={setDatabases} />}
          {currentView === 'settings' && <div className="p-8 flex items-center justify-center h-full text-slate-500">Settings placeholder</div>}
        </div>
      </main>
    </div>
  );
}

// --- VIEW COMPONENTS ---

function DashboardView() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Revenue" value="$84,230" change="+12.5%" trend="up" icon={<DollarSign className="w-6 h-6 text-emerald-600" />} />
        <KpiCard title="Active Users" value="12,345" change="+5.2%" trend="up" icon={<Users className="w-6 h-6 text-indigo-600" />} />
        <KpiCard
          title="Sales Today"
          value="$1,204"
          change="-2.4%"
          trend="down"
          icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
          anomaly={{
            description: "Today's sales are 35% lower than the average for a Tuesday, representing a statistically significant drop. The decrease is primarily from the 'Electronics' category."
          }}
        />
        <KpiCard title="Avg. Order Value" value="$86.50" change="+8.1%" trend="up" icon={<Activity className="w-6 h-6 text-blue-600" />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Revenue Trends</h3>
              <p className="text-sm text-slate-500">Comparison of Revenue vs Profit YTD</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-md text-slate-500"><Filter className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-slate-100 rounded-md text-slate-500"><Download className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 min-h-0 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <AIInsight data={salesData} title="Revenue Trends" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Sales by Category</h3>
          <p className="text-sm text-slate-500 mb-6">Distribution across top categories</p>
          <div className="flex-1 min-h-0 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <AIInsight data={categoryData} title="Sales by Category" />
        </div>
      </div>
    </div>
  );
}

function DataSourcesView({ files, setFiles, databases, setDatabases }: any) {
    const [activeTab, setActiveTab] = useState<'files' | 'databases'>('files');
    const [showDbForm, setShowDbForm] = useState(false);
  
    const handleFileUpload = () => {
      const newFile = {
        id: Date.now(),
        name: `upload_${Math.floor(Math.random() * 1000)}.csv`,
        type: 'CSV',
        size: `${(Math.random() * 10).toFixed(1)} MB`,
        status: 'processing',
        uploadedAt: 'Just now'
      };
      setFiles((prevFiles: any) => [newFile, ...prevFiles]);
    };
  
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Connect Your Data</h2>
          <p className="text-slate-500 mt-1">Manage your file uploads and database connections to power your dashboard.</p>
        </div>
  
        <div className="flex space-x-1 rounded-xl bg-slate-100 p-1 mb-8 w-fit">
          <button onClick={() => setActiveTab('files')} className={cn('flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-all', activeTab === 'files' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50')}><FileSpreadsheet className="w-4 h-4" /> File Uploads</button>
          <button onClick={() => setActiveTab('databases')} className={cn('flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-all', activeTab === 'databases' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50')}><Database className="w-4 h-4" /> Database Connections</button>
        </div>
  
        {activeTab === 'files' ? (
          <div className="space-y-6">
            <div onClick={handleFileUpload} className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><UploadCloud className="w-8 h-8" /></div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Drop files here or click to upload</h3>
              <p className="text-slate-500 text-sm mb-4">Support for CSV, Excel, JSON (Max 500MB)</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 font-medium text-slate-800">Uploaded Files ({files.length})</div>
                <ul className="divide-y divide-slate-100">
                    {files.map((file: any) => (
                        <li key={file.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                            <div className="flex items-center gap-4">
                                <div className={cn("p-2 rounded-lg", file.type === 'CSV' ? "bg-emerald-100 text-emerald-700" : file.type === 'Excel' ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-700")}><FileText className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                    <p className="text-xs text-slate-500">{file.size} • {file.uploadedAt}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4"><StatusBadge status={file.status} /></div>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">Active Connections</h3>
                <button onClick={() => setShowDbForm(!showDbForm)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"><Plus className="w-4 h-4" /> New Connection</button>
             </div>
             {showDbForm && (
                <div className="bg-slate-50 border border-indigo-100 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">New Database Connection</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                            <input type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="e.g. Marketing DB" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                            <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"><option>PostgreSQL</option><option>Snowflake</option></select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setShowDbForm(false)} className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-200 rounded-lg">Cancel</button>
                        <button onClick={() => setShowDbForm(false)} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Test & Save</button>
                    </div>
                </div>
             )}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {databases.map((db: any) => (
                    <div key={db.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500"><Database className="w-5 h-5" /></div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">{db.name}</h4>
                                    <p className="text-xs text-slate-500">{db.type}</p>
                                </div>
                            </div>
                            <StatusBadge status={db.status} />
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded font-mono text-xs truncate">
                            <span className="text-slate-400 select-none">HOST:</span> {db.host}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

// --- REUSABLE SUB-COMPONENTS ---

function SidebarItem({ icon, label, isActive, isOpen, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200", isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200")} title={!isOpen ? label : undefined}>
      <div className="flex-shrink-0">{React.cloneElement(icon, { className: "w-5 h-5" })}</div>
      {isOpen && <span className="font-medium truncate">{label}</span>}
    </button>
  );
}

function KpiCard({ title, value, change, trend, icon, anomaly }: any) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative">
        {anomaly && (
          <div className="absolute top-4 right-4 group">
            <AlertCircle className="w-5 h-5 text-rose-500 cursor-pointer" />
            <div className="absolute bottom-full mb-2 -right-4 w-64 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <p className="font-bold mb-1">AI Anomaly Detected</p>
              {anomaly.description}
              <div className="absolute top-full right-6 border-t-8 border-t-slate-800 border-x-8 border-x-transparent border-b-0"></div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-500 font-medium">{title}</span>
          <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
          <div className={cn("text-sm font-medium flex items-center gap-1", trend === 'up' ? 'text-emerald-600' : 'text-rose-600')}>
            {trend === 'up' ? '↑' : '↓'} {change}
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>
      </div>
    );
}
  
function AIInsight({ data, title }: { data: any[], title: string }) {
    const [insight, setInsight] = useState('Generating insights...');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      // MOCK API CALL: In a real app, this would be a fetch request to your AI backend.
      setTimeout(() => {
        if (title === "Revenue Trends") {
          setInsight("Profit spiked dramatically in March, far outpacing revenue growth, suggesting a highly profitable sale or event. However, revenue in May saw a significant dip. It would be wise to investigate the cause of both anomalies.");
        } else {
          setInsight("Electronics is the dominant category, contributing significantly to sales. Groceries and Clothing are performing equally, indicating stable, diverse revenue streams.");
        }
        setLoading(false);
      }, 1500);
    }, [data, title]);
  
    return (
      <div className="mt-6 p-4 bg-indigo-50/70 border border-indigo-100 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="font-semibold text-sm text-indigo-800">AI-Powered Insight</h4>
        </div>
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-4/6 animate-pulse"></div>
          </div>
        ) : (
          <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
        )}
      </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'ready' || status === 'connected') {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3" /> {status === 'connected' ? 'Connected' : 'Ready'}</span>;
    }
    if (status === 'processing') {
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Activity className="w-3 h-3 animate-spin" /> Processing</span>;
    }
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800"><AlertCircle className="w-3 h-3" /> Error</span>;
}
