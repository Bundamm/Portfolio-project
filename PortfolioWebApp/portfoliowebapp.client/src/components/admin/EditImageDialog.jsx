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
import { imageApi } from '../../services/api';

function EditImageDialog({ open, onOpenChange, data, projectId, onSave, onDelete, isNew = false }) {
  const [formData, setFormData] = useState({
    path: '',
    isMain: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({
        path: data.path || '',
        isMain: data.isMain || false
      });
    } else if (isNew) {
      setFormData({
        path: '',
        isMain: false
      });
    }
  }, [data, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.path.trim()) {
        setError('Image URL is required');
        return;
      }

      // Prepare data according to backend DTOs (PascalCase)
      const submitData = {
        Path: formData.path,
        IsMain: formData.isMain,
        ProjectId: projectId
      };

      let result;
      if (isNew) {
        result = await imageApi.create(projectId, submitData);
      } else {
        result = await imageApi.update(data.id || data.Id, submitData);
      }
      
      onSave(result);
      onOpenChange(false);
    } catch (err) {
      console.error('Image operation error:', err);
      
      let errorMessage = `Failed to ${isNew ? 'create' : 'update'} image. Please try again.`;
      if (err.message && err.message.includes('API Error')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const imageId = data?.id || data?.Id;
    if (!imageId || !confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);
    setError('');

    try {
      await imageApi.delete(imageId);
      onDelete(imageId);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to delete image. Please try again.');
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
            {isNew ? 'Add New Image' : 'Edit Image'}
          </DialogTitle>
          <DialogDescription>
            {isNew ? 'Add a new image to this project' : 'Update the image details'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              id="path"
              name="path"
              type="url"
              required
              value={formData.path}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be a valid URL pointing to an image file (jpg, jpeg, png, gif, webp)
            </p>
          </div>

          <div className="flex items-center">
            <input
              id="isMain"
              name="isMain"
              type="checkbox"
              checked={formData.isMain}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isMain" className="ml-2 block text-sm text-gray-900">
              Set as main image
            </label>
          </div>

          {/* Image preview */}
          {formData.path && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <div className="border border-gray-300 rounded-md p-2">
                <img
                  src={formData.path}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    e.target.style.display = 'block';
                  }}
                />
              </div>
            </div>
          )}

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
                  isNew ? 'Create Image' : 'Save Changes'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditImageDialog;
