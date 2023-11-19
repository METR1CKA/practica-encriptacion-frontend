import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private apiUrl = 'http://localhost:3333/api/v1/salas';
  private apiUrl = 'http://localhost/backend/api/v1/salas';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`);
  }

  getRoomsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, room);
  }

  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${room.id}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
