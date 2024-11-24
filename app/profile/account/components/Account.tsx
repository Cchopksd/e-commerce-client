"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface UserData {
  _id: string;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  role: string;
  __v: number;
}

export default function Account({ userData }: { userData: UserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4 md:p-8"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Account Information
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      {/* Profile Content */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Fields */}
          <ProfileField
            label="First Name"
            value={formData.first_name}
            isEditing={isEditing}
            onChange={(value) => setFormData({...formData, first_name: value})}
          />
          <ProfileField
            label="Last Name"
            value={formData.last_name}
            isEditing={isEditing}
            onChange={(value) => setFormData({...formData, last_name: value})}
          />
          <ProfileField
            label="Username"
            value={formData.username}
            isEditing={isEditing}
            onChange={(value) => setFormData({...formData, username: value})}
          />
          <ProfileField
            label="Email"
            value={formData.email}
            isEditing={isEditing}
            onChange={(value) => setFormData({...formData, email: value})}
          />
          <ProfileField
            label="Phone"
            value={formData.phone}
            isEditing={isEditing}
            onChange={(value) => setFormData({...formData, phone: value})}
          />
          <ProfileField
            label="Age"
            value={formData.age.toString()}
            isEditing={isEditing}
            type="number"
            onChange={(value) => setFormData({...formData, age: parseInt(value)})}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  type?: string;
  onChange: (value: string) => void;
}

function ProfileField({ label, value, isEditing, type = "text", onChange }: ProfileFieldProps) {
  return (
    <motion.div 
      layout
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {isEditing ? (
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800"
        >
          {value}
        </motion.div>
      )}
    </motion.div>
  );
}
