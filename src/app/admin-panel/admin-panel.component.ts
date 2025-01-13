import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  activeTab: 'product' | 'category' = 'product';

  setActiveTab(tab: 'product' | 'category') {
    this.activeTab = tab;
  }

  isActiveTab(tab: 'product' | 'category'): boolean {
    return this.activeTab === tab;
  }
}
