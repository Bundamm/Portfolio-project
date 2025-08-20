import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { categoryApi } from '../../services/api';
import EditCategoryDialog from './EditCategoryDialog';
import AddButton from './AddButton';
import EditButton from './EditButton';

function CategoryManagementDialog({ open, onOpenChange, onCategoriesUpdate }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Edit category dialog states
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const categoriesData = await categoryApi.getAll();
      setCategories(categoriesData || []);
    } catch (err) {
      setError('Nie udało się załadować kategorii');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySave = (savedCategory) => {
    if (isNewCategory) {
      setCategories(prev => [...prev, savedCategory]);
    } else {
      setCategories(prev => 
        prev.map(category => 
          (category.categoryId || category.CategoryId) === (savedCategory.categoryId || savedCategory.CategoryId) 
            ? savedCategory 
            : category
        )
      );
    }
    // Notify parent component to refresh categories
    onCategoriesUpdate && onCategoriesUpdate();
  };

  const handleCategoryDelete = (deletedId) => {
    setCategories(prev => prev.filter(category => 
      (category.categoryId || category.CategoryId) !== deletedId
    ));
    // Notify parent component to refresh categories
    onCategoriesUpdate && onCategoriesUpdate();
  };

  const openEditCategory = (category = null) => {
    setEditingCategory(category);
    setIsNewCategory(!category);
    setEditCategoryOpen(true);
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Zarządzaj kategoriami</DialogTitle>
            <DialogDescription>
              Dodawaj, edytuj i usuwaj kategorie projektów
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Lista kategorii ({categories.length})</h3>
              <AddButton onClick={() => openEditCategory()} size="sm">
                Dodaj kategorię
              </AddButton>
            </div>

            <div className="flex-1 overflow-y-auto">
              {categories.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Brak kategorii</p>
                  <p className="text-sm">Kliknij "Dodaj kategorię" aby utworzyć pierwszą</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div 
                      key={category.categoryId || category.CategoryId} 
                      className="flex items-start justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {category.categoryName || category.CategoryName}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 break-words">
                          {category.description || category.Description}
                        </p>
                        {/* Show project count if available */}
                        {category.projects && (
                          <p className="text-xs text-gray-500 mt-1">
                            {category.projects.length} projekt(ów)
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <EditButton 
                          onClick={() => openEditCategory(category)}
                          size="sm"
                          showText={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Zamknij
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <EditCategoryDialog
        open={editCategoryOpen}
        onOpenChange={setEditCategoryOpen}
        data={editingCategory}
        isNew={isNewCategory}
        onSave={handleCategorySave}
        onDelete={handleCategoryDelete}
      />
    </>
  );
}

export default CategoryManagementDialog;
