import React, { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
    Search,
    Filter,
    ExternalLink,
    Trash2,
    CheckCircle,
    XCircle,
    LogOut,
    FileSpreadsheet,
    FileText,
    Clock,
    Users,
    ShieldCheck,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Cpu,
    User,
    Eye,
    ZoomIn,
    ZoomOut
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface RegistrationData {
    id: string;
    teamName: string;
    leaderName: string;
    collegeName: string;
    cityState: string;
    email: string;
    phone: string;
    department: string;
    robotSpecs: string;
    receiptUrl: string;
    submittedAt: string;
    status: 'pending' | 'verified' | 'rejected';
}

const AdminDashboard: React.FC = () => {
    const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
    const [filteredData, setFilteredData] = useState<RegistrationData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [viewDetailsModal, setViewDetailsModal] = useState<RegistrationData | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ type: 'delete', id: string } | null>(null);
    const [imageZoom, setImageZoom] = useState(100);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/admin');
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/admin');
        });
    };

    useEffect(() => {
        const q = query(collection(db, 'registrations'), orderBy('submittedAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as RegistrationData[];
            setRegistrations(data);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let result = registrations;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(reg =>
                reg.teamName.toLowerCase().includes(term) ||
                reg.leaderName.toLowerCase().includes(term) ||
                reg.collegeName.toLowerCase().includes(term) ||
                reg.email.toLowerCase().includes(term)
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(reg => reg.status === statusFilter);
        }
        setFilteredData(result);
    }, [searchTerm, statusFilter, registrations]);


    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'registrations', id));
            setConfirmAction(null);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const exportToCSV = () => {
        const headers = ["Team Name", "Leader", "College", "Dept", "Email", "Phone", "Status", "Receipt"];
        const rows = filteredData.map(reg => [
            reg.teamName, reg.leaderName, reg.collegeName, reg.department, reg.email, reg.phone, reg.status, reg.receiptUrl
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = `RoboRace_Report_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    const exportToPDF = () => {
        const pdfDoc = new jsPDF();
        pdfDoc.text("RoboRace 26 Registrations", 14, 20);
        const tableColumn = ["Team", "Leader", "College", "Status"];
        const tableRows = filteredData.map(reg => [reg.teamName, reg.leaderName, reg.collegeName, reg.status]);

        // Correct TypeScript usage for autoTable
        import('jspdf-autotable').then((autoTable) => {
            autoTable.default(pdfDoc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
            });
            pdfDoc.save(`Report_${new Date().toLocaleDateString()}.pdf`);
        });
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] font-poppins text-white">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 w-full z-40 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-[#212121] py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-[#8e8e8e] hover:text-white transition-colors flex items-center space-x-2">
                            <ArrowLeft size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Site</span>
                        </Link>
                        <div className="h-4 w-[1px] bg-[#212121]"></div>
                        <div className="flex items-center space-x-2">
                            <span className="font-black text-lg tracking-tighter">
                                ROBORACE <span className="text-[#10a37f]">26</span>
                            </span>
                            <span className="bg-[#10a37f]/10 text-[#10a37f] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#10a37f]/20">
                                Admin
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#8e8e8e] hidden sm:block">
                            {auth.currentUser?.email}
                        </span>
                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="p-2 text-[#8e8e8e] hover:text-white transition-colors hover:bg-[#212121] rounded-lg"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto pt-24 pb-20 px-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#171717] p-6 rounded-2xl border border-[#212121] group hover:border-[#303030] transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <Users size={16} className="text-[#8e8e8e]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8e8e8e]">Total</span>
                        </div>
                        <div className="text-3xl font-bold">{registrations.length}</div>
                    </div>
                    <div className="bg-[#171717] p-6 rounded-2xl border border-[#212121] group hover:border-[#10a37f]/30 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <CheckCircle size={16} className="text-[#10a37f]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8e8e8e]">Verified</span>
                        </div>
                        <div className="text-3xl font-bold">{registrations.filter(r => r.status === 'verified').length}</div>
                    </div>
                    <div className="bg-[#171717] p-6 rounded-2xl border border-[#212121] group hover:border-amber-500/30 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <Clock size={16} className="text-amber-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8e8e8e]">Pending</span>
                        </div>
                        <div className="text-3xl font-bold">{registrations.filter(r => r.status === 'pending').length}</div>
                    </div>
                    <div className="bg-[#171717] p-6 rounded-2xl border border-[#212121] group hover:border-red-500/30 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <XCircle size={16} className="text-red-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8e8e8e]">Rejected</span>
                        </div>
                        <div className="text-3xl font-bold">{registrations.filter(r => r.status === 'rejected').length}</div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-2 flex-grow max-w-2xl">
                        <div className="relative flex-grow group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e8e] w-4 h-4 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search teams, leaders, colleges..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#171717] border border-[#212121] rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-[#505050]"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#171717] border border-[#212121] rounded-xl px-4 py-3 text-sm text-[#8e8e8e] focus:outline-none focus:ring-1 focus:ring-white transition-all outline-none appearance-none"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button onClick={exportToCSV} className="bg-[#212121] hover:bg-[#303030] text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-[#303030]">
                            <FileSpreadsheet size={14} className="text-emerald-500" /> Download CSV
                        </button>
                        <button onClick={exportToPDF} className="bg-[#212121] hover:bg-[#303030] text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-[#303030]">
                            <FileText size={14} className="text-sky-500" /> Download PDF
                        </button>
                    </div>
                </div>

                {/* Registrations List */}
                <div className="bg-[#171717] border border-[#212121] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#212121] bg-[#1a1a1a]">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">Team & Institution</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">Leader info</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">Receipt</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">Status</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">View</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-[#8e8e8e]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#212121]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-[#8e8e8e]">
                                            <div className="w-6 h-6 border-2 border-[#10a37f]/30 border-t-[#10a37f] rounded-full animate-spin mx-auto mb-4"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Intercepting Data...</span>
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-[#8e8e8e]">
                                            <span className="text-[10px] font-black uppercase tracking-widest">No matching records found.</span>
                                        </td>
                                    </tr>
                                ) : filteredData.map((reg) => (
                                    <React.Fragment key={reg.id}>
                                        <tr className={`hover:bg-[#212121]/50 transition-colors group cursor-pointer ${expandedRow === reg.id ? 'bg-[#212121]/30' : ''}`} onClick={() => toggleExpand(reg.id)}>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5 group-hover:text-[#10a37f] transition-colors">{reg.teamName}</span>
                                                    <span className="text-[10px] text-[#8e8e8e] font-medium uppercase tracking-tight">{reg.collegeName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-[#e5e5e5]">{reg.leaderName}</span>
                                                    <span className="text-[10px] text-[#505050]">{reg.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div
                                                    onClick={(e) => { e.stopPropagation(); setSelectedReceipt(reg.receiptUrl); }}
                                                    className="w-10 h-10 rounded-lg bg-[#212121] overflow-hidden border border-[#303030] hover:border-[#10a37f] transition-all cursor-zoom-in group/img relative"
                                                >
                                                    <img src={reg.receiptUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="receipt" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/40 transition-opacity">
                                                        <ExternalLink size={12} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${reg.status === 'verified' ? 'bg-[#10a37f]/10 text-[#10a37f] border-[#10a37f]/20' :
                                                    reg.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                    }`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); console.log('View Details clicked for:', reg); setViewDetailsModal(reg); }}
                                                    title="View Full Details"
                                                    className="p-2.5 bg-[#10a37f]/10 text-[#10a37f] hover:bg-[#10a37f]/20 rounded-lg transition-all border border-[#10a37f]/20 hover:border-[#10a37f]/40"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-center items-center gap-1">
                                                    <button
                                                        onClick={() => setConfirmAction({ type: 'delete', id: reg.id })}
                                                        title="Delete"
                                                        className="p-2 text-[#505050] hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <div className="text-[#505050] ml-2">
                                                        {expandedRow === reg.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Expanded Details Row */}
                                        {expandedRow === reg.id && (
                                            <tr className="bg-[#1a1a1a] border-l-2 border-l-[#10a37f]">
                                                <td colSpan={5} className="px-10 py-8 animate-in slide-in-from-left duration-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center space-x-2 text-[#10a37f]">
                                                                <Users size={14} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Team Profile</span>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-[11px] text-[#505050] uppercase font-bold tracking-wider">Team Name</div>
                                                                <div className="text-sm font-semibold">{reg.teamName}</div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-[11px] text-[#505050] uppercase font-bold tracking-wider">Institution</div>
                                                                <div className="text-sm font-semibold">{reg.collegeName}</div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-[11px] text-[#505050] uppercase font-bold tracking-wider">Section/Dept</div>
                                                                <div className="text-sm font-semibold">{reg.department || 'N/A'}</div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center space-x-2 text-sky-400">
                                                                <ShieldCheck size={14} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Contact details</span>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div className="flex items-center space-x-3 group">
                                                                    <div className="p-2 bg-[#212121] rounded-lg text-[#8e8e8e] group-hover:text-white transition-colors">
                                                                        <User size={14} />
                                                                    </div>
                                                                    <span className="text-sm font-medium">{reg.leaderName}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-3 group">
                                                                    <div className="p-2 bg-[#212121] rounded-lg text-[#8e8e8e] group-hover:text-white transition-colors">
                                                                        <Mail size={14} />
                                                                    </div>
                                                                    <span className="text-sm font-medium">{reg.email}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-3 group">
                                                                    <div className="p-2 bg-[#212121] rounded-lg text-[#8e8e8e] group-hover:text-white transition-colors">
                                                                        <Phone size={14} />
                                                                    </div>
                                                                    <span className="text-sm font-medium">{reg.phone}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-3 group">
                                                                    <div className="p-2 bg-[#212121] rounded-lg text-[#8e8e8e] group-hover:text-white transition-colors">
                                                                        <MapPin size={14} />
                                                                    </div>
                                                                    <span className="text-sm font-medium">{reg.cityState}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center space-x-2 text-amber-500">
                                                                <Cpu size={14} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Robot Configuration</span>
                                                            </div>
                                                            <div className="p-4 bg-[#212121] rounded-xl border border-[#303030]">
                                                                <p className="text-sm text-[#e5e5e5] leading-relaxed italic">
                                                                    "{reg.robotSpecs || 'No specifications provided.'}"
                                                                </p>
                                                            </div>
                                                            <div className="pt-4 flex justify-end">
                                                                <div className="text-[9px] text-[#505050] font-bold uppercase tracking-widest">
                                                                    Timestamp: {new Date(reg.submittedAt).toLocaleString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* View Details Modal */}
            {viewDetailsModal && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-200" onClick={() => setViewDetailsModal(null)}>
                    {console.log('Rendering View Details Modal for:', viewDetailsModal)}
                    <div
                        className="bg-[#171717] border-t sm:border border-[#212121] rounded-t-[32px] sm:rounded-[32px] w-full h-[95vh] sm:h-auto sm:max-w-4xl shadow-2xl animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 sm:max-h-[90vh] flex flex-col transition-all"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#303030 transparent'
                        }}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-[#171717] border-b border-[#212121] px-4 py-4 sm:px-8 sm:py-6 rounded-none sm:rounded-t-[32px] flex items-center justify-between z-10">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-[#10a37f]/10 flex items-center justify-center border border-[#10a37f]/20">
                                    <Eye size={18} className="text-[#10a37f]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Registration Details</h3>
                                    <p className="text-[10px] text-[#8e8e8e] uppercase font-black tracking-widest mt-0.5">Team: {viewDetailsModal.teamName}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewDetailsModal(null)}
                                className="p-2 text-[#8e8e8e] hover:text-white hover:bg-[#212121] rounded-lg transition-all"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Team Information */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-[#10a37f] mb-4">
                                    <Users size={16} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">Team Information</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#505050] uppercase font-bold tracking-wider">Team Name</label>
                                        <div className="bg-[#212121] rounded-xl px-4 py-3 text-white font-semibold border border-[#303030]">
                                            {viewDetailsModal.teamName}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#505050] uppercase font-bold tracking-wider">Institution</label>
                                        <div className="bg-[#212121] rounded-xl px-4 py-3 text-white font-semibold border border-[#303030]">
                                            {viewDetailsModal.collegeName}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#505050] uppercase font-bold tracking-wider">Department/Section</label>
                                        <div className="bg-[#212121] rounded-xl px-4 py-3 text-white font-semibold border border-[#303030]">
                                            {viewDetailsModal.department || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#505050] uppercase font-bold tracking-wider">Location</label>
                                        <div className="bg-[#212121] rounded-xl px-4 py-3 text-white font-semibold border border-[#303030] flex items-center space-x-2">
                                            <MapPin size={14} className="text-[#8e8e8e]" />
                                            <span>{viewDetailsModal.cityState}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-[#212121]/50 rounded-2xl p-6 border border-[#303030]">
                                <h4 className="text-[#8e8e8e] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <User size={14} className="text-emerald-500" /> Contact Information
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 bg-[#171717] p-4 rounded-xl border border-[#303030]">
                                        <div className="w-10 h-10 rounded-full bg-[#303030] flex items-center justify-center text-[#8e8e8e]">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-[#565656] uppercase font-bold tracking-wider mb-0.5">Team Leader</div>
                                            <div className="text-white font-bold">{viewDetailsModal.leaderName}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3 bg-[#171717] p-3 rounded-xl border border-[#303030]">
                                            <Mail size={16} className="text-sky-500" />
                                            <span className="text-sm text-gray-300 break-all">{viewDetailsModal.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-[#171717] p-3 rounded-xl border border-[#303030]">
                                            <Phone size={16} className="text-emerald-500" />
                                            <span className="text-sm text-gray-300">{viewDetailsModal.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Robot Specs */}
                            <div className="bg-[#212121]/50 rounded-2xl p-6 border border-[#303030]">
                                <h4 className="text-[#8e8e8e] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Cpu size={14} className="text-amber-500" /> Robot Configuration
                                </h4>
                                <div className="bg-[#171717] p-4 rounded-xl border border-[#303030] text-sm text-gray-300 leading-relaxed font-mono">
                                    {viewDetailsModal.robotSpecs || "No specifications provided."}
                                </div>
                            </div>

                            {/* Receipt Preview */}
                            <div className="bg-[#212121]/50 rounded-2xl p-6 border border-[#303030]">
                                <h4 className="text-[#8e8e8e] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FileText size={14} className="text-purple-500" /> Payment Receipt
                                </h4>
                                <div className="group relative aspect-video bg-[#171717] rounded-xl overflow-hidden border border-[#303030] cursor-pointer" onClick={() => setSelectedReceipt(viewDetailsModal.receiptUrl)}>
                                    <img src={viewDetailsModal.receiptUrl} alt="Receipt" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm border border-white/10">
                                            <ZoomIn size={14} /> Click to Zoom
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Timestamp */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#212121]/50 rounded-2xl p-4 border border-[#303030] text-center">
                                    <div className="text-[10px] text-[#565656] uppercase font-bold tracking-wider mb-2">Current Status</div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${viewDetailsModal.status === 'verified' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                        viewDetailsModal.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                            'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                        }`}>
                                        {viewDetailsModal.status}
                                    </span>
                                </div>
                                <div className="bg-[#212121]/50 rounded-2xl p-4 border border-[#303030] text-center">
                                    <div className="text-[10px] text-[#565656] uppercase font-bold tracking-wider mb-2">Submitted On</div>
                                    <div className="flex items-center justify-center gap-2 text-gray-400">
                                        <Clock size={14} />
                                        <span className="text-sm">{new Date(viewDetailsModal.submittedAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                                        {/* Modal Footer */}
                                        <div className="sticky bottom-0 bg-[#171717] border-t border-[#212121] px-4 py-4 sm:px-8 sm:py-4 rounded-none sm:rounded-b-[32px] flex flex-nowrap justify-end gap-3 sm:space-x-3">
                                            <button
                                                onClick={() => setViewDetailsModal(null)}
                                                className="px-6 py-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-[#303030]"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
            )}

                                {/* Receipt Modal Overlay with Zoom */}
                                {selectedReceipt && (
                                    <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-8 animate-in fade-in duration-200" onClick={() => { setSelectedReceipt(null); setImageZoom(100); }}>
                                        <div className="relative max-w-6xl w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
                                            {/* Header with Controls */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => setImageZoom(Math.max(10, imageZoom - 25))}
                                                        disabled={imageZoom <= 10}
                                                        className="p-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-[#303030]"
                                                        title="Zoom Out"
                                                    >
                                                        <ZoomOut size={18} />
                                                    </button>
                                                    <span className="text-white text-sm font-bold min-w-[60px] text-center bg-[#212121] px-4 py-3 rounded-xl border border-[#303030]">
                                                        {imageZoom}%
                                                    </span>
                                                    <button
                                                        onClick={() => setImageZoom(Math.min(200, imageZoom + 25))}
                                                        disabled={imageZoom >= 200}
                                                        className="p-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-[#303030]"
                                                        title="Zoom In"
                                                    >
                                                        <ZoomIn size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setImageZoom(100)}
                                                        className="px-4 py-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-[#303030]"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => { setSelectedReceipt(null); setImageZoom(100); }}
                                                    className="text-white/50 hover:text-white flex items-center space-x-2 text-xs font-black uppercase tracking-widest bg-[#212121] hover:bg-[#303030] px-4 py-3 rounded-xl transition-all border border-[#303030]"
                                                >
                                                    <XCircle size={18} />
                                                    <span>Close</span>
                                                </button>
                                            </div>

                                            {/* Image Container */}
                                            <div className="flex-1 overflow-auto bg-[#0d0d0d] rounded-3xl border border-[#212121] p-4 flex items-center justify-center scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#303030] hover:scrollbar-thumb-[#505050]">
                                                <img
                                                    src={selectedReceipt}
                                                    className="rounded-2xl shadow-[0_0_50px_rgba(16,163,127,0.15)] transition-transform duration-300"
                                                    style={{
                                                        width: `${imageZoom}%`,
                                                        maxWidth: 'none',
                                                        height: 'auto'
                                                    }}
                                                    alt="full-receipt"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}



                                {/* Confirmation Modal */}
                                {confirmAction && (
                                    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setConfirmAction(null)}>
                                        <div
                                            className="bg-[#171717] border border-[#212121] rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-6 border border-red-500/20">
                                                    <Trash2 size={28} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Delete Registration</h3>
                                                <p className="text-[#8e8e8e] text-sm mb-8 leading-relaxed">
                                                    Are you sure you want to permanently delete this registration? This action cannot be undone.
                                                </p>
                                                <div className="flex w-full gap-3">
                                                    <button
                                                        onClick={() => setConfirmAction(null)}
                                                        className="flex-1 py-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-[#303030]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(confirmAction.id)}
                                                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Logout Confirmation Modal */}
                                {showLogoutConfirm && (
                                    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setShowLogoutConfirm(false)}>
                                        <div
                                            className="bg-[#171717] border border-[#212121] rounded-[24px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                                                    <LogOut size={28} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
                                                <p className="text-[#8e8e8e] text-sm mb-8 leading-relaxed">
                                                    Are you sure you want to end your session? You will need to login again to access Mission Control.
                                                </p>
                                                <div className="flex w-full gap-3">
                                                    <button
                                                        onClick={() => setShowLogoutConfirm(false)}
                                                        className="flex-1 py-3 bg-[#212121] hover:bg-[#303030] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-[#303030]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
    );
};

export default AdminDashboard;
