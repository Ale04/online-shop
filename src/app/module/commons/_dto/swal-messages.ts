import Swal from "sweetalert2";

export class SwalMessages {

    confirmMessage: any;

    constructor() {
        this.confirmMessage = Swal.mixin({
            customClass: {
                title: 'swal-title',
                icon: 'swal-icon',
                confirmButton: 'btn btn-primary swal-confirm-button',
                cancelButton: 'btn btn-danger swal-cancel-button',
            },
            buttonsStyling: false
        });
    }

    // muestra mensaje de confirmación
    successMessage(message: string) {
        Swal.fire({
            position: 'bottom',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }

    // muestra mensaje de error
    errorMessage(message: string) {
        Swal.fire({
            position: 'bottom',
            icon: 'error',
            toast: true,
            text: message,
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
}