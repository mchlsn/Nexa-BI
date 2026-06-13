import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatbotWidget from '../components/ChatbotWidget';

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard':
      return 'Overview Dashboard';
    case '/dashboard/sales':
      return 'Sales Performance';
    case '/dashboard/analytics':
      return 'Analytics';
    case '/dashboard/market-basket':
      return 'Market Basket';
    case '/dashboard/top-customers':
      return 'Top Customers';
    case '/dashboard/churn-risk':
      return 'Churn Risk';
    case '/dashboard/customers':
      return 'Customers';
    default:
      return 'Dashboard';
  }
};

export default function DashboardLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1117]">
      {/* Permanent Sidebar for Desktop */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar onOpenChat={() => setIsChatOpen(true)} />
      </div>

      {/* Drawer Sidebar for Mobile/Tablet */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Drawer Panel content */}
          <div className="relative flex flex-col w-60 max-w-xs bg-[#13161f] border-r border-[#2a2d3a] h-full animate-slide-right shadow-2xl z-10">
            <Sidebar
              isDrawer={true}
              onCloseDrawer={() => setIsDrawerOpen(false)}
              onOpenChat={() => {
                setIsChatOpen(true);
                setIsDrawerOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Navbar */}
        <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 flex-shrink-0" style={{ borderColor: '#2a2d3a', background: '#13161f' }}>
          <div className="flex items-center gap-3">
            {/* Hamburger button on Mobile/Tablet */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-white leading-none">
              {getPageTitle(pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-white text-sm font-medium leading-none">
                  {localStorage.getItem('nexabi_username') || 'Administrator'}
                </p>
                <p className="text-muted text-xs mt-1">NexaBI Platform</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                {(localStorage.getItem('nexabi_username') || 'A')[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <ChatbotWidget open={isChatOpen} setOpen={setIsChatOpen} />
    </div>
  );
}
