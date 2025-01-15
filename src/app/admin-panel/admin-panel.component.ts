import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  activeTab: 'product' | 'category' = 'product';

  newProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('0'),
  });

  newCategoryForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  setActiveTab(tab: 'product' | 'category') {
    this.activeTab = tab;
  }

  isActiveTab(tab: 'product' | 'category'): boolean {
    return this.activeTab === tab;
  }

  addProduct(): void {
    if (this.newProductForm.valid) {
      const { title, price, description, category } = this.newProductForm.value;
      const newProduct: any = {
        id: Date.now(),
        title: title || '',
        price: Number(price) || 0,
        description: description || '',
        category: category || '1',
      };

      alert(`Product added successfully:
        ${newProduct.title}
        ${newProduct.price}
        ${newProduct.category}
        ${newProduct.description}
        `);
    }
  }

  addCategory(): void {
    if (this.newCategoryForm.valid) {
      const { title } = this.newCategoryForm.value;
      const newCategory: any = {
        id: Date.now(),
        title: title || '',
      };

      alert(`Category added successfully:
        ${newCategory.title}
      `);
    }
  }
}
