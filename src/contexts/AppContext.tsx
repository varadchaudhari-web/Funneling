import React, { createContext, useContext, useState } from 'react';
import type { Funnel, Lead, Campaign, Notification } from '@/types';
import { MOCK_FUNNELS, MOCK_LEADS, MOCK_CAMPAIGNS, MOCK_NOTIFICATIONS } from '@/data/mockData';

interface AppContextType {
  funnels: Funnel[];
  addFunnel: (funnel: Omit<Funnel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFunnel: (id: string, updates: Partial<Funnel>) => void;
  deleteFunnel: (id: string) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt'>) => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [funnels, setFunnels] = useState<Funnel[]>(MOCK_FUNNELS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const addFunnel = (funnel: Omit<Funnel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFunnel: Funnel = {
      ...funnel,
      id: `f${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFunnels(prev => [newFunnel, ...prev]);
    addNotification({ type: 'system', title: 'New Funnel Created', message: `Funnel "${funnel.name}" was created`, read: false, userId: 'u1' });
  };

  const updateFunnel = (id: string, updates: Partial<Funnel>) => {
    setFunnels(prev => prev.map(f => f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString() } : f));
  };

  const deleteFunnel = (id: string) => {
    setFunnels(prev => prev.filter(f => f.id !== id));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = { ...lead, id: `l${Date.now()}`, createdAt: new Date().toISOString() };
    setLeads(prev => [newLead, ...prev]);
    addNotification({ type: 'lead', title: 'New Lead Captured', message: `${lead.name} joined from ${lead.source}`, read: false, userId: 'u1' });
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const addCampaign = (campaign: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = { ...campaign, id: `c${Date.now()}`, createdAt: new Date().toISOString() };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt'>) => {
    const newN: Notification = { ...n, id: `n${Date.now()}`, createdAt: new Date().toISOString() };
    setNotifications(prev => [newN, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      funnels, addFunnel, updateFunnel, deleteFunnel,
      leads, addLead, updateLead, deleteLead,
      campaigns, addCampaign, updateCampaign,
      notifications, markNotificationRead, markAllRead, addNotification,
      unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
