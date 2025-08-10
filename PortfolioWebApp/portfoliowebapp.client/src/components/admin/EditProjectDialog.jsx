import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { projectsApi, categoryApi } from '../../services/api';

function EditProjectDialog({ open, onOpenChange, data, onSave, onDelete, isNew = false }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryApi.getAll();
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || data.Name || '',
        description: data.description || data.Description || '',
        categoryId: data.categoryId || data.CategoryId || ''
      });
    } else if (isNew) {
      setFormData({
        name: '',
        description: '',
        categoryId: ''
      });
    }
  }, [data, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name.trim()) {
        setError('Project name is required');
        return;
      }
      
      if (formData.name.trim().length < 5) {
        setError('Project name must be at least 5 characters long');
        return;
      }
      
      if (formData.name.trim().length > 255) {
        setError('Project name cannot be longer than 255 characters');
        return;
      }
      
      if (!formData.description.trim()) {
        setError('Project description is required');
        return;
      }
      
      if (formData.description.trim().length < 10) {
        setError('Project description must be at least 10 characters long');
        return;
      }
      
      if (!formData.categoryId) {
        setError('Please select a category');
        return;
      }

      const submitData = {
        name: formData.name,
        description: formData.description,
        userId: 1 // TODO: Get actual user ID from admin context
      };

      // Add categoryId for update operations
      if (!isNew) {
        submitData.categoryId = parseInt(formData.categoryId);
      }

      console.log('Submitting project data:', {
        categoryId: parseInt(formData.categoryId),
        submitData: submitData,
        isNew: isNew
      });

      let result;
      if (isNew) {
        result = await projectsApi.create(parseInt(formData.categoryId), submitData);
      } else {
        result = await projectsApi.update(data.id || data.Id, parseInt(formData.categoryId), submitData);
      }
      
      onSave(result);
      onOpenChange(false);
    } catch (err) {
      console.error('Project operation error:', err);
      console.error('Error details:', err.response || err.message);
      
      // Try to extract specific error message from backend
      let errorMessage = `Failed to ${isNew ? 'create' : 'update'} project. Please try again.`;
      if (err.message && err.message.includes('API Error')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const projectId = data?.id || data?.Id;
    if (!projectId || !confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    setError('');

    try {
      await projectsApi.delete(projectId);
      onDelete(projectId);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to delete project. Please try again.');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'Add New Project' : 'Edit Project'}
          </DialogTitle>
          <DialogDescription>
            {isNew ? 'Create a new project entry' : 'Update your project details'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {!isNew && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    {isNew ? 'Creating...' : 'Saving...'}
                  </div>
                ) : (
                  isNew ? 'Create Project' : 'Save Changes'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProjectDialog;
