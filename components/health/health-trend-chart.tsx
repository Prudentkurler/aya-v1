'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { db, type Measurement } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils/formatters';

/**
 * Health trend chart for visualizing BP and glucose trends
 */

interface HealthTrendChartProps {
  userId: string;
  type: 'blood_pressure' | 'glucose';
  period?: '7d' | '30d' | '90d';
  height?: number;
}

export function HealthTrendChart({
  userId,
  type,
  period = '30d',
  height = 400,
}: HealthTrendChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    average: number;
    min: number;
    max: number;
    dataPoints: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        const daysBack = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        startDate.setDate(startDate.getDate() - daysBack);

        // Fetch measurements
        const measurements = await db.getMeasurementsByType(userId, type, startDate, endDate);

        if (measurements.length === 0) {
          setData([]);
          setStats(null);
          setIsLoading(false);
          return;
        }

        // Process data
        const chartData = measurements.map((m) => ({
          date: formatDate(m.measuredAt),
          displayDate: new Date(m.measuredAt).toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
          }),
          timestamp: m.measuredAt.getTime(),
          ...(type === 'blood_pressure' && {
            systolic: m.systolic,
            diastolic: m.diastolic,
            heartRate: m.heartRate,
          }),
          ...(type === 'glucose' && {
            glucose: m.glucoseLevel,
          }),
        }));

        // Calculate statistics
        if (type === 'blood_pressure') {
          const systolicValues = measurements
            .map((m) => m.systolic!)
            .filter((v) => v !== undefined);
          const diastolicValues = measurements
            .map((m) => m.diastolic!)
            .filter((v) => v !== undefined);

          const avgSystolic = systolicValues.length > 0 
            ? Math.round(systolicValues.reduce((a, b) => a + b, 0) / systolicValues.length)
            : 0;

          setStats({
            average: avgSystolic,
            min: Math.min(...systolicValues),
            max: Math.max(...systolicValues),
            dataPoints: measurements.length,
          });
        } else {
          const glucoseValues = measurements
            .map((m) => m.glucoseLevel!)
            .filter((v) => v !== undefined);

          const avgGlucose = glucoseValues.length > 0
            ? Math.round(glucoseValues.reduce((a, b) => a + b, 0) / glucoseValues.length)
            : 0;

          setStats({
            average: avgGlucose,
            min: Math.min(...glucoseValues),
            max: Math.max(...glucoseValues),
            dataPoints: measurements.length,
          });
        }

        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, type, period]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="text-gray-500 dark:text-gray-400">No data available yet</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{data.displayDate}</p>
        {type === 'blood_pressure' ? (
          <>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Systolic: {data.systolic} mmHg
            </p>
            <p className="text-sm text-red-600 dark:text-red-400">
              Diastolic: {data.diastolic} mmHg
            </p>
            {data.heartRate && (
              <p className="text-sm text-purple-600 dark:text-purple-400">HR: {data.heartRate} BPM</p>
            )}
          </>
        ) : (
          <p className="text-sm text-green-600 dark:text-green-400">Glucose: {data.glucose} mg/dL</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.average}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Min</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.min}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Max</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.max}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Readings</p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.dataPoints}</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        {type === 'blood_pressure' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="displayDate"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#2563eb"
              dot={{ fill: '#2563eb', r: 4 }}
              activeDot={{ r: 6 }}
              name="Systolic (top)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#dc2626"
              dot={{ fill: '#dc2626', r: 4 }}
              activeDot={{ r: 6 }}
              name="Diastolic (bottom)"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="displayDate"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="glucose"
              stroke="#16a34a"
              fillOpacity={1}
              fill="url(#colorGlucose)"
              dot={{ fill: '#16a34a', r: 4 }}
              activeDot={{ r: 6 }}
              name="Glucose (mg/dL)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>

      {/* Reference Ranges */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Reference Ranges:</p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {type === 'blood_pressure' ? (
            <>
              <li>🟢 Normal: Less than 120/80 mmHg</li>
              <li>🟡 Elevated: 120-129 and &lt;80 mmHg</li>
              <li>🟠 Stage 1: 130-139 or 80-89 mmHg</li>
              <li>🔴 Stage 2: 140+ or 90+ mmHg</li>
            </>
          ) : (
            <>
              <li>🟢 Normal (fasting): 70-99 mg/dL</li>
              <li>🟡 Prediabetic (fasting): 100-125 mg/dL</li>
              <li>🟠 Normal (random): 70-140 mg/dL</li>
              <li>🔴 Diabetic (random): 140+ mg/dL</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
