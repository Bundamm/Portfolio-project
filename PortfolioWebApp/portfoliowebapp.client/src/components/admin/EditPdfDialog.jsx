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
import { pdfApi } from '../../services/api';

function EditPdfDialog({ open, onOpenChange, data, projectId, onSave, onDelete, isNew = false }) {
  const [formData, setFormData] = useState({
    name: '',
    path: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        path: data.path || ''
      });
    } else if (isNew) {
      setFormData({
        name: '',
        path: ''
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
        setError('PDF name is required');
        return;
      }
      
      if (formData.name.trim().length < 5) {
        setError('PDF name must be at least 5 characters long');
        return;
      }
      
      if (formData.name.trim().length > 25) {
        setError('PDF name cannot be longer than 25 characters');
        return;
      }
      
      if (!formData.path.trim()) {
        setError('PDF URL is required');
        return;
      }

      // Prepare data according to backend DTOs (PascalCase)
      const submitData = {
        Name: formData.name,
        Path: formData.path
      };

      // Add ProjectId for create operations
      if (isNew) {
        submitData.ProjectId = projectId;
      }

      let result;
      if (isNew) {
        result = await pdfApi.create(projectId, submitData);
      } else {
        result = await pdfApi.update(data.id || data.Id, submitData);
      }
      
      onSave(result);
      onOpenChange(false);
    } catch (err) {
      console.error('PDF operation error:', err);
      
      let errorMessage = `Failed to ${isNew ? 'create' : 'update'} PDF. Please try again.`;
      if (err.message && err.message.includes('API Error')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const pdfId = data?.id || data?.Id;
    if (!pdfId || !confirm('Are you sure you want to delete this PDF?')) return;

    setLoading(true);
    setError('');

    try {
      await pdfApi.delete(pdfId);
      onDelete(pdfId);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to delete PDF. Please try again.');
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
            {isNew ? 'Add New PDF' : 'Edit PDF'}
          </DialogTitle>
          <DialogDescription>
            {isNew ? 'Add a new PDF document to this project' : 'Update the PDF document details'}
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
              PDF Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter PDF name"
              minLength={5}
              maxLength={25}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be between 5 and 25 characters
            </p>
          </div>

          <div>
            <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-1">
              PDF URL *
            </label>
            <input
              id="path"
              name="path"
              type="url"
              required
              value={formData.path}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/document.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be a valid URL pointing to a PDF file
            </p>
          </div>

          {/* PDF preview link */}
          {formData.path && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                <div className="flex items-center justify-center">
                  <Button asChild variant="outline" type="button">
                    <a 
                      href={formData.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      📄 Preview PDF
                    </a>
                  </Button>
                </div>
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
                  isNew ? 'Create PDF' : 'Save Changes'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPdfDialog;
