import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
                {...props}
            />
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
}
