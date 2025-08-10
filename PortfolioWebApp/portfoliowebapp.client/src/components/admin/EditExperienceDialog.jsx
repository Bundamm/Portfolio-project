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
import { experienceApi } from '../../services/api';

function EditExperienceDialog({ open, onOpenChange, data, onSave, onDelete, isNew = false }) {
  const [formData, setFormData] = useState({
    workplace: '',
    workDescription: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({
        workplace: data.workplace || '',
        workDescription: data.workDescription || '',
        startDate: data.startDate ? data.startDate.split('T')[0] : '',
        endDate: data.endDate ? data.endDate.split('T')[0] : ''
      });
    } else if (isNew) {
      setFormData({
        workplace: '',
        workDescription: '',
        startDate: '',
        endDate: ''
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
      const submitData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      };

      let result;
      if (isNew) {
        result = await experienceApi.create(submitData);
      } else {
        result = await experienceApi.update(data.id, submitData);
      }
      
      onSave(result);
      onOpenChange(false);
    } catch (err) {
      setError(`Failed to ${isNew ? 'create' : 'update'} experience. Please try again.`);
      console.error('Experience operation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!data?.id || !confirm('Are you sure you want to delete this experience?')) return;

    setLoading(true);
    setError('');

    try {
      await experienceApi.delete(data.id);
      onDelete(data.id);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to delete experience. Please try again.');
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
            {isNew ? 'Add New Experience' : 'Edit Experience'}
          </DialogTitle>
          <DialogDescription>
            {isNew ? 'Add a new work experience entry' : 'Update your work experience details'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-1">
              Workplace *
            </label>
            <input
              id="workplace"
              name="workplace"
              type="text"
              required
              value={formData.workplace}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company name"
            />
          </div>

          <div>
            <label htmlFor="workDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              id="workDescription"
              name="workDescription"
              rows={4}
              required
              value={formData.workDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your role and responsibilities..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for current position</p>
            </div>
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
                  isNew ? 'Create Experience' : 'Save Changes'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExperienceDialog;
