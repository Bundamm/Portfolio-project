import React from 'react';
import { Plus } from 'lucide-react';
import EditButton from './EditButton';

function AddButton({ onClick, children, className = "", ...props }) {
  return (
    <EditButton
      onClick={onClick}
      icon={Plus}
      className={`bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 text-green-700 ${className}`}
      {...props}
    >
      {children || "Dodaj"}
    </EditButton>
  );
}

export default AddButton;
