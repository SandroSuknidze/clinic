import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    private role: string; // 'admin', 'doctor', 'user', or 'guest'

    constructor() {
        // For now, role is fetched from localStorage or defaults to 'guest'
        this.role = localStorage.getItem('role') || 'guest';
    }

    // Update the role dynamically
    setRole(role: string): void {
        this.role = role;
        localStorage.setItem('role', role);
    }

    getRole(): string {
        return this.role;
    }

    // Permissions for Doctor Info
    canEditDoctor(): boolean {
        return this.role === 'admin';
    }

    // Permissions for Calendar
    canMakeReservation(): boolean {
        return this.role === 'user';
    }

    canViewReservations(): boolean {
        return ['admin', 'doctor', 'user'].includes(this.role);
    }

    canEditReservations(): boolean {
        return this.role === 'admin' || this.role === 'doctor';
    }

    canDeleteReservations(): boolean {
        return this.role === 'admin' || this.role === 'doctor';
    }

    canViewOwnReservations(): boolean {
        return this.role === 'user';
    }
}
