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
import { categoryApi } from '../../services/api';

function EditCategoryDialog({ open, onOpenChange, data, onSave, onDelete, isNew = false }) {
  const [formData, setFormData] = useState({
    categoryName: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({
        categoryName: data.categoryName || data.CategoryName || '',
        description: data.description || data.Description || ''
      });
    } else if (isNew) {
      setFormData({
        categoryName: '',
        description: ''
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
      if (!formData.categoryName.trim()) {
        setError('Nazwa kategorii jest wymagana');
        return;
      }
      
      if (formData.categoryName.trim().length < 5) {
        setError('Nazwa kategorii musi mieć co najmniej 5 znaków');
        return;
      }
      
      if (formData.categoryName.trim().length > 25) {
        setError('Nazwa kategorii nie może być dłuższa niż 25 znaków');
        return;
      }
      
      if (!formData.description.trim()) {
        setError('Opis kategorii jest wymagany');
        return;
      }
      
      if (formData.description.trim().length < 10) {
        setError('Opis kategorii musi mieć co najmniej 10 znaków');
        return;
      }

      // Prepare data according to backend DTOs (PascalCase)
      const submitData = {
        CategoryName: formData.categoryName.trim(),
        Description: formData.description.trim()
      };

      console.log('Submitting category data:', {
        submitData: submitData,
        isNew: isNew
      });

      let result;
      if (isNew) {
        result = await categoryApi.create(submitData);
      } else {
        result = await categoryApi.update(data.categoryId || data.CategoryId, submitData);
      }
      
      onSave(result);
      onOpenChange(false);
    } catch (err) {
      console.error('Category operation error:', err);
      console.error('Error details:', err.response || err.message);
      
      // Try to extract specific error message from backend
      let errorMessage = `Nie udało się ${isNew ? 'utworzyć' : 'zaktualizować'} kategorii. Spróbuj ponownie.`;
      if (err.message && err.message.includes('API Error')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const categoryId = data?.categoryId || data?.CategoryId;
    if (!categoryId || !confirm('Czy na pewno chcesz usunąć tę kategorię? To może wpłynąć na powiązane projekty.')) return;

    setLoading(true);
    setError('');

    try {
      await categoryApi.delete(categoryId);
      onDelete(categoryId);
      onOpenChange(false);
    } catch (err) {
      setError('Nie udało się usunąć kategorii. Sprawdź czy nie jest używana przez istniejące projekty.');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'Dodaj nową kategorię' : 'Edytuj kategorię'}
          </DialogTitle>
          <DialogDescription>
            {isNew ? 'Utwórz nową kategorię projektów' : 'Zaktualizuj szczegóły kategorii'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa kategorii *
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              required
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Wpisz nazwę kategorii (5-25 znaków)"
              maxLength={25}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.categoryName.length}/25 znaków
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Opis *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Opisz kategorię (minimum 10 znaków)..."
            />
            <div className="text-xs text-gray-500 mt-1">
              Minimum 10 znaków (aktualnie: {formData.description.length})
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
                  Usuń
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Anuluj
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    {isNew ? 'Tworzenie...' : 'Zapisywanie...'}
                  </div>
                ) : (
                  isNew ? 'Utwórz kategorię' : 'Zapisz zmiany'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
