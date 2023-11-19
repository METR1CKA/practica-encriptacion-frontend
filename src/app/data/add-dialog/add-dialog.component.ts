import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  form = this.fb.group({
    nombre: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dataService.createRoom(this.form.value).subscribe({
      next: (response: any) => {
        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 3000,
        });
        this.dialogRef.close(this.form.value);
      },
      error: (response: any) => {
        console.error('Error creating room:', response);
        this.snackBar.open(`${response.error.status}: ${response.error.message}`, undefined, {
          duration: 6000,
        });
      }
    });
  }
}
