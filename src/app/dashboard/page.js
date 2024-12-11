"use client";
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { logout } from '../services/api';
import { useRouter } from 'next/navigation';
import ExportOptions from '../utils/export';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredData, setFilteredData] = useState([]);
  const [articlesData, setArticlesData] = useState([
    { author: 'John Doe', articles: 10, payout: '$200', type: 'news', date: '2024-01-01' },
    { author: 'Jane Smith', articles: 8, payout: '$160', type: 'blog', date: '2024-01-05' },
    { author: 'Alice Brown', articles: 5, payout: '$100', type: 'news', date: '2024-02-01' },
  ]); // Sample articles data

  // Filter states
  const [authorFilter, setAuthorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply filters
  const applyFilters = () => {
    let filtered = articlesData;

    // Filter by author
    if (authorFilter) {
      filtered = filtered.filter(item => item.author.toLowerCase().includes(authorFilter.toLowerCase()));
    }

    // Filter by date range
    if (dateFilter.start && dateFilter.end) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(dateFilter.start) && itemDate <= new Date(dateFilter.end);
      });
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(item => item.type.toLowerCase() === typeFilter.toLowerCase());
    }

    // Global search
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  // Apply filters whenever any filter value changes
  useEffect(() => {
    applyFilters();
  }, [authorFilter, dateFilter, typeFilter, searchQuery, articlesData]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-500">
      <ExportOptions data={articlesData} />
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>

      {/* Filters */}
      <div className="flex flex-wrap mb-4 space-x-4 text-gray-500">
        <input
          type="text"
          placeholder="Filter by author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={dateFilter.start}
          onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="End Date"
          value={dateFilter.end}
          onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by type</option>
          <option value="news">News</option>
          <option value="blog">Blog</option>
        </select>
        <input
          type="text"
          placeholder="Global search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Articles" value={filteredData.length} icon="📰" />
        <Card title="Total Payout" value={`$${filteredData.reduce((sum, item) => sum + parseFloat(item.payout.slice(1)), 0)}`} icon="💰" />
      </div>

      <h3 className="text-xl text-gray-500 font-bold mb-4">Payout Details</h3>
      <Table data={filteredData} />
    </div>
  );
};

export default Dashboard;
