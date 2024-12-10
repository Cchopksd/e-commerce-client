"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Upload,
  Trash2,
} from "lucide-react";
import { updateUserInfo } from "./action";

interface Image {
  image_url: string;
  public_id: string;
}

interface UserData {
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  role: string;
  profile_image?: Image[];
}

interface EditProfileProps {
  userData: UserData;
}

const EditProfile: React.FC<EditProfileProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formDataValue, setFormData] = useState<UserData>(userData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    userData?.profile_image?.[0]?.image_url || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "phone":
        return /^\+?[\d\s-]{10,15}$/.test(value) ? "" : "Invalid phone number";
      case "age":
        const age = parseInt(value);
        return age > 0 && age < 120 ? "" : "Age must be between 1 and 120";
      case "first_name":
      case "last_name":
        return value.length >= 2 ? "" : "Name must be at least 2 characters";
      case "username":
        return value.length >= 3
          ? ""
          : "Username must be at least 3 characters";
      default:
        return "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate image file
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Invalid file type. Please upload JPEG, PNG, or GIF.",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          profileImage: "File size should be less than 5MB.",
        }));
        return;
      }

      // Clear previous errors
      const { profileImage, ...restErrors } = errors;
      setErrors(restErrors);

      // Create preview and set file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      setSelectedImage(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setPreviewImage(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSave = async () => {
    // Validate all fields before saving
    const newErrors: { [key: string]: string } = {};
    Object.keys(formDataValue).forEach((key) => {
      if (key !== "_id" && key !== "role" && key !== "__v") {
        const error = validateField(
          key,
          formDataValue[key as keyof UserData]?.toString() || "",
        );
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSaveStatus("idle");
    try {
      const formData = new FormData();
      formData.append("username", formDataValue.username);
      formData.append("first_name", formDataValue.first_name);
      formData.append("last_name", formDataValue.last_name);
      formData.append("phone", formDataValue.phone);
      formData.append("age", formDataValue.age.toString());
      if (selectedImage) {
        formData.append("images", selectedImage);
      }

      const success = await updateUserInfo(userData._id, formData);
      if (success) {
        setSaveStatus("success");
        setIsEditing(false);
        setSelectedImage(null);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (
    name: keyof UserData,
    label: string,
    type: string = "text",
  ) => {
    const value = formDataValue[name];
    const error = errors[name];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {isEditing ? (
          <div>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
                ${
                  error
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent`}
            />
            {error && (
              <p className="mt-1 text-xs text-red-600 flex items-center">
                <AlertTriangle className="mr-1 h-4 w-4" /> {error}
              </p>
            )}
          </div>
        ) : (
          <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
            {value}
          </div>
        )}
      </div>
    );
  };

  const renderImageUpload = () => {
    return (
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        {isEditing ? (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
              />
              <div
                className={`
                  w-32 h-32 rounded-full border-2 flex items-center justify-center
                  ${
                    previewImage
                      ? "border-blue-500"
                      : "border-dashed border-gray-300"
                  }
                  hover:border-blue-500 transition-colors cursor-pointer
                `}
                onClick={() => fileInputRef.current?.click()}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-center text-gray-400 flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-xs">Upload Image</span>
                  </div>
                )}
              </div>
            </div>
            {previewImage && (
              <button
                type="button"
                onClick={handleImageRemove}
                className="text-red-600 hover:text-red-800 flex items-center">
                <Trash2 className="mr-1 h-5 w-5" /> Remove
              </button>
            )}
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full border-2 border-gray-300">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        )}
        {errors.profileImage && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertTriangle className="mr-1 h-4 w-4" /> {errors.profileImage}
          </p>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Account Information
        </h1>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg 
                  hover:bg-green-700 transition-colors disabled:opacity-50">
                <Save className="mr-2 h-5 w-5" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFormData(userData);
                  setIsEditing(false);
                  setErrors({});
                }}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg 
                  hover:bg-gray-300 transition-colors">
                <X className="mr-2 h-5 w-5" /> Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors">
              <Edit className="mr-2 h-5 w-5" /> Edit Profile
            </motion.button>
          )}
        </div>
      </div>

      {saveStatus === "success" && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
          <p className="text-green-800">Profile updated successfully!</p>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-red-600" />
          <p className="text-red-800">
            Failed to update profile. Please try again.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderImageUpload()}
        {renderField("first_name", "First Name")}
        {renderField("last_name", "Last Name")}
        {renderField("username", "Username")}
        {renderField("email", "Email", "email")}
        {renderField("phone", "Phone", "tel")}
        {renderField("age", "Age", "number")}
      </div>
    </motion.div>
  );
};

export default EditProfile;
