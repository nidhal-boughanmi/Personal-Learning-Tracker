import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useApp } from '../../context/AppContext';
import { getWeeklyStudyHours } from '../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyChart = () => {
    const { sessions } = useApp();
    const weeklyData = getWeeklyStudyHours(sessions);

    const data = {
        labels: weeklyData.map((d) => d.day),
        datasets: [
            {
                label: 'Study Hours',
                data: weeklyData.map((d) => d.hours),
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.8)');
                    return gradient;
                },
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                borderRadius: 8,
                barThickness: 40,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: (context) => {
                        const hours = context.parsed.y;
                        const minutes = Math.round((hours % 1) * 60);
                        const fullHours = Math.floor(hours);
                        return `${fullHours}h ${minutes}m`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value}h`,
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Study Hours</h3>
                <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        {totalHours.toFixed(1)}h
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">this week</div>
                </div>
            </div>
            <div style={{ height: '300px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default WeeklyChart;
