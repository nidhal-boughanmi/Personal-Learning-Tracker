import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadJSON } from '../../utils/helpers';
import { FiDownload, FiUpload, FiTrash2, FiSettings } from 'react-icons/fi';

const Settings = () => {
    const { exportData, importData, clearAllData, settings, updateSettings } = useApp();
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [importError, setImportError] = useState('');

    const handleExport = () => {
        const data = exportData();
        const date = new Date().toISOString().split('T')[0];
        downloadJSON(data, `devskilltracker-backup-${date}.json`);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                const result = importData(data);
                if (result.success) {
                    alert('Data imported successfully!');
                    setImportError('');
                } else {
                    setImportError(result.error || 'Failed to import data');
                }
            } catch (error) {
                setImportError('Invalid JSON file');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleClearAll = () => {
        if (showClearConfirm) {
            clearAllData();
            setShowClearConfirm(false);
            alert('All data has been cleared');
        } else {
            setShowClearConfirm(true);
            setTimeout(() => setShowClearConfirm(false), 5000);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
                <FiSettings className="text-primary-600 dark:text-primary-400" size={28} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Settings
                </h2>
            </div>

            {/* Timer Settings */}
            <div className="card">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Timer Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="work-duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Work Session: {settings.pomodoroWork} minutes
                        </label>
                        <input
                            id="work-duration"
                            type="range"
                            min="15"
                            max="60"
                            step="5"
                            value={settings.pomodoroWork}
                            onChange={(e) => updateSettings({ pomodoroWork: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="break-duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Short Break: {settings.pomodoroBreak} minutes
                        </label>
                        <input
                            id="break-duration"
                            type="range"
                            min="3"
                            max="15"
                            step="1"
                            value={settings.pomodoroBreak}
                            onChange={(e) => updateSettings({ pomodoroBreak: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="long-break-duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Long Break: {settings.pomodoroLongBreak} minutes
                        </label>
                        <input
                            id="long-break-duration"
                            type="range"
                            min="15"
                            max="30"
                            step="5"
                            value={settings.pomodoroLongBreak}
                            onChange={(e) => updateSettings({ pomodoroLongBreak: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="card">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Notifications
                </h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Timer Notifications
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Get notified when timer completes
                        </p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                        <input
                            type="checkbox"
                            checked={settings.notificationsEnabled}
                            onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-full h-full bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-primary-600 transition-colors cursor-pointer"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                </div>
            </div>

            {/* Data Management */}
            <div className="card">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Data Management
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={handleExport}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        <FiDownload size={18} />
                        Export Data
                    </button>

                    <div>
                        <input
                            type="file"
                            id="import-file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                        <label
                            htmlFor="import-file"
                            className="w-full btn-secondary flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FiUpload size={18} />
                            Import Data
                        </label>
                    </div>

                    {importError && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                            {importError}
                        </div>
                    )}

                    <button
                        onClick={handleClearAll}
                        className={`w-full flex items-center justify-center gap-2 transition-all ${showClearConfirm
                                ? 'btn-danger'
                                : 'btn-secondary text-red-600 dark:text-red-400'
                            }`}
                    >
                        <FiTrash2 size={18} />
                        {showClearConfirm ? 'Click Again to Confirm' : 'Clear All Data'}
                    </button>
                </div>
            </div>

            {/* About */}
            <div className="card text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    DevSkillTracker
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track your learning journey, one skill at a time.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                    Version 1.0.0
                </p>
            </div>
        </div>
    );
};

export default Settings;
