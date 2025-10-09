import Swal from "sweetalert2";

export function showErrorAlert(message: string) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message || "Terjadi kesalahan yang tidak diketahui.",
  });
}

export function showSuccessAlert(
  message: string,
  action?: () => void | Promise<void>,
  timer: number = 5000
) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer,
    showConfirmButton: true,
    didClose: () => {
      if (action && typeof action === "function") {
        action();
      }
    },
  });
}
