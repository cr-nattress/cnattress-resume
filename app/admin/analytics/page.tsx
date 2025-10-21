'use client';

/**
 * Admin Analytics Dashboard
 *
 * Simple dashboard for viewing portfolio analytics.
 * Protected by ADMIN_ACCESS_KEY environment variable.
 *
 * @page /admin/analytics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, MessageCircle, Eye } from 'lucide-react';

interface ConversationStats {
  date: string;
  total_conversations: number;
  unique_visitors: number;
  avg_response_time_ms: number;
  median_response_time_ms: number;
}

interface PopularSection {
  page_section: string;
  view_count: number;
  unique_visitors: number;
  avg_time_spent: number;
}

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [conversationStats, setConversationStats] = useState<ConversationStats[]>([]);
  const [popularSections, setPopularSections] = useState<PopularSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authenticate = () => {
    if (!accessKey.trim()) {
      setError('Please enter an access key');
      return;
    }

    setError('');
    fetchAnalytics(accessKey);
  };

  const fetchAnalytics = async (key: string) => {
    setLoading(true);
    setError('');

    try {
      // Fetch conversation stats
      const conversationsRes = await fetch('/api/analytics?type=conversations', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });

      if (conversationsRes.status === 401) {
        setError('Invalid access key');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (!conversationsRes.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const conversationsData = await conversationsRes.json();
      setConversationStats(conversationsData.data || []);

      // Fetch popular sections
      const sectionsRes = await fetch('/api/analytics?type=sections', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });

      if (sectionsRes.ok) {
        const sectionsData = await sectionsRes.json();
        setPopularSections(sectionsData.data || []);
      }

      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              Enter your admin access key to view analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              placeholder="Enter access key"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-deep-purple/50"
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button
              onClick={authenticate}
              disabled={loading}
              className="w-full bg-deep-purple hover:bg-deep-purple-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalConversations = conversationStats.reduce((sum, stat) => sum + stat.total_conversations, 0);
  const totalUniqueVisitors = conversationStats.reduce((sum, stat) => sum + stat.unique_visitors, 0);
  const avgResponseTime = conversationStats.length > 0
    ? conversationStats.reduce((sum, stat) => sum + stat.avg_response_time_ms, 0) / conversationStats.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-hero p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-white/70">Portfolio performance and visitor insights</p>
          </div>
          <Button
            onClick={() => fetchAnalytics(accessKey)}
            disabled={loading}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Conversations
              </CardTitle>
              <MessageCircle className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversations}</div>
              <p className="text-xs text-gray-500 mt-1">
                Across all time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Unique Visitors
              </CardTitle>
              <Eye className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUniqueVisitors}</div>
              <p className="text-xs text-gray-500 mt-1">
                Chat participants
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Response Time
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgResponseTime > 0 ? `${(avgResponseTime / 1000).toFixed(2)}s` : 'N/A'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                AI response latency
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Conversation Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Conversation Stats</CardTitle>
            <CardDescription>Recent AI chat activity</CardDescription>
          </CardHeader>
          <CardContent>
            {conversationStats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-right p-2">Conversations</th>
                      <th className="text-right p-2">Unique Visitors</th>
                      <th className="text-right p-2">Avg Response (ms)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversationStats.map((stat, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-2">{new Date(stat.date).toLocaleDateString()}</td>
                        <td className="text-right p-2">{stat.total_conversations}</td>
                        <td className="text-right p-2">{stat.unique_visitors}</td>
                        <td className="text-right p-2">{Math.round(stat.avg_response_time_ms)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No conversation data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Popular Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Sections</CardTitle>
            <CardDescription>Most visited areas of the portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {popularSections.length > 0 ? (
              <div className="space-y-3">
                {popularSections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{section.page_section}</p>
                      <p className="text-sm text-gray-500">
                        {section.unique_visitors} unique visitors
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-deep-purple">{section.view_count}</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No section data yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
