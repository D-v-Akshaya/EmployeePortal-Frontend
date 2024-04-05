import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-with-actions',
  templateUrl: './table-with-actions.component.html',
  styleUrls: ['./table-with-actions.component.css']
})
export class TableWithActionsComponent {

  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: any[];
  @Input() actionButtons: any[] = [];

  tablesToDisplay: any[] = []

  ngOnChanges(): void {

    if (this.actionButtons.length !== 0) {
      this.tablesToDisplay = this.displayedColumns.concat(['actions']);
      // this.tablesToDisplay = [this.displayedColumns, 'actions'];
      
    }else{
      this.tablesToDisplay = this.displayedColumns
 
    }
  }



  processedContent(word:string): string {
    return word.replace(/_/g, ' ');
  }

}

