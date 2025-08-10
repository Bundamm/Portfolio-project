import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { useAdmin } from '../../contexts/AdminContext';

function EditButton({ onClick, className = "", size = "sm", icon: Icon = Pencil, children, showText = true, ...props }) {
  const { isAdmin, loading } = useAdmin();

  // Don't render if still loading or not admin
  if (loading || !isAdmin) return null;

  const isIconOnly = size === "icon" || !showText;

  return (
    <Button
      variant="outline"
      size={size}
      onClick={onClick}
      className={`bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {!isIconOnly && (children || "Edytuj")}
    </Button>
  );
}

export default EditButton;
