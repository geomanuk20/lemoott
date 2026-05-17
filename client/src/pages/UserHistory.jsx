import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
 ArrowLeft, 
 RotateCw, 
 Monitor, 
 User as UserIcon, 
 Loader2, 
 CheckCircle2, 
 XCircle,
 CreditCard,
 Calendar
} from 'lucide-react';
import Loader from '../components/Loader';

const API_URL = 'http://localhost:5001/api/users';

const UserHistory = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(false);

 const fetchUserHistory = async () => {
  try {
   const response = await fetch(`${API_URL}/${id}`);
   const data = await response.json();
   if (response.ok) {
    setUser(data);
   }
  } catch (err) {
   console.error('Error fetching user history:', err);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchUserHistory();
 }, [id]);

 const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  return `${name.substring(0, 3)}*******@${domain}`;
 };

 
 if (!user) return <div className="error-container-h">User not found</div>;

 return (
  <div className="user-history-page">
   <div className="history-header-premium">
    <h1 className="history-title-p">USER HISTORY</h1>
   </div>

   <div className="history-grid-p">
    {/* User Info Card */}
    <div className="history-card-p user-main-card-p">
     <div className="user-info-flex-p">
      <div className="user-profile-img-p">
       {user.profileImage ? (
        <img 
         src={user.profileImage.startsWith('http') || user.profileImage.startsWith('data:') ? user.profileImage : `http://localhost:5001/uploads/${user.profileImage}`} 
         alt="Profile" 
         onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Profile"; }}
        />
       ) : (
        <div className="avatar-placeholder-h">
         <UserIcon size={40} color="#333" />
        </div>
       )}
      </div>
      <div className="user-details-text-p">
       <h2 className="user-name-h">{user.name}</h2>
       <p className="user-email-h">Email: {maskEmail(user.email)}</p>
       <p className="user-phone-h">Phone: {user.phone || ''}</p>
      </div>
      <div className="status-badge-container-h">
        <span className={`status-pill-h ${user.status === 'Active' ? 'active' : 'inactive'}`}>
         {user.status}
        </span>
      </div>
     </div>
    </div>

    {/* Subscription Card */}
    <div className="history-card-p subscription-card-p">
     <h3 className="card-subtitle-h">Subscription Plan</h3>
     <div className="plan-details-list-h">
      <div className="plan-item-h">
       <span className="dot red-dot"></span>
       <span className="label-h">Current Plan</span>
       <span className="value-h">{user.subscriptionPlan || 'None'}</span>
      </div>
      <div className="plan-item-h">
       <span className="dot green-dot"></span>
       <span className="label-h">Subscription expires on</span>
       <span className="value-h">{user.expiryDate || 'N/A'}</span>
      </div>
     </div>
    </div>
   </div>

   {/* Transactions Section */}
   <div className="transactions-section-p">
    <h3 className="section-title-h">User Transactions</h3>
    <div className="transactions-table-wrapper-h">
     <table className="history-table-p">
      <thead>
       <tr>
        <th>Email</th>
        <th>Plan</th>
        <th>Amount</th>
        <th>Payment Gateway</th>
        <th>Payment ID</th>
        <th>Payment Date</th>
       </tr>
      </thead>
      <tbody>
       {/* If we had transaction data, we would map it here */}
       {/* For now, showing empty state as per screenshot */}
       <tr className="empty-row-h">
        <td colSpan="6" style={{ height: '100px' }}></td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>

   <style dangerouslySetInnerHTML={{ __html: `
    .user-history-page { padding: 30px; animation: fadeIn 0.4s ease-out; background: #000; min-height: 100vh; color: #fff; }
    
    .history-header-premium { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #222; padding-bottom: 15px; }
    .history-title-p { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.5px; }
    
    .header-actions-p { display: flex; align-items: center; gap: 15px; }
    .header-icon-btn-p { background: none; border: none; color: #fff; cursor: pointer; padding: 5px; transition: color 0.3s; }
    .header-icon-btn-p:hover { color: #b3d332; }
    .header-user-avatar-p { width: 32px; height: 32px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; border: 1px solid #333; }

    .history-grid-p { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 30px; }
    .history-card-p { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 8px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }

    .user-info-flex-p { display: flex; align-items: center; gap: 25px; position: relative; }
    .user-profile-img-p { width: 140px; height: 60px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid #333; }
    .user-profile-img-p img { width: 100%; height: 100%; object-fit: contain; }
    .avatar-placeholder-h { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #eee; }
    .user-name-h { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; }
    .user-email-h, .user-phone-h { color: #888; font-size: 0.9rem; margin-bottom: 3px; }

    .status-badge-container-h { position: absolute; top: 0; right: 0; }
    .status-pill-h { padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
    .status-pill-h.active { background: #b3d332; color: #fff; }
    .status-pill-h.inactive { background: #ff4d4d; color: #fff; }

    .subscription-card-p { border-left: 3px solid #1a1a1a; }
    .card-subtitle-h { font-size: 1rem; font-weight: 700; margin-bottom: 20px; color: #fff; }
    .plan-details-list-h { display: flex; flex-direction: column; gap: 15px; }
    .plan-item-h { display: flex; align-items: center; gap: 10px; background: #151515; padding: 12px; border-radius: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .red-dot { background: #b3d332; box-shadow: 0 0 10px rgba(179,211,50,0.4); }
    .green-dot { background: #b3d332; box-shadow: 0 0 10px rgba(22,196,127,0.4); }
    .label-h { flex: 1; font-size: 0.85rem; color: #aaa; font-weight: 600; }
    .value-h { font-size: 0.85rem; color: #fff; font-weight: 700; }

    .transactions-section-p { margin-top: 20px; }
    .section-title-h { font-size: 1rem; font-weight: 700; margin-bottom: 15px; }
    .transactions-table-wrapper-h { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; }
    .history-table-p { width: 100%; border-collapse: collapse; text-align: left; }
    .history-table-p th { background: #111; padding: 15px 20px; color: #eee; font-size: 0.85rem; font-weight: 700; border-bottom: 1px solid #222; border-right: 1px solid #1a1a1a; }
    .history-table-p td { padding: 15px 20px; color: #888; font-size: 0.85rem; border-bottom: 1px solid #151515; border-right: 1px solid #151515; }
    .history-table-p tr:last-child td { border-bottom: none; }
    
    .loader-container-h { height: 60vh; display: flex; align-items: center; justify-content: center; }
    .spinner { animation: spin 1s linear infinite; color: #b3d332; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    @media (max-width: 1100px) {
     .history-grid-p { grid-template-columns: 1fr; }
    }
   ` }} />
  </div>
 );
};

export default UserHistory;
