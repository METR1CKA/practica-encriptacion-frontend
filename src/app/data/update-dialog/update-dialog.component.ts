import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  form = this.fb.group({
    nombre: [this.data.nombre],
    password: [this.data.password]
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const room = {
      id: this.data.id,
      ...this.form.value,
    }

    this.dataService.updateRoom(room).subscribe({
      next: (response: any) => {
        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 3000,
        });
        this.dialogRef.close(room);
      },
      error: (response: any) => {
        console.error('Error updating room:', response);
        this.snackBar.open(`${response.error.status}: ${response.error.message}`, undefined, {
          duration: 6000,
        });
      }
    });
  }
}
