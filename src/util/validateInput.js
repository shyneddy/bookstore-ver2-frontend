export function removeExtraSpaces(input) {

    // Xóa dấu cách đầu và cuối
    var trimmedInput = input.trim();

    // Xóa dấu cách giữa nếu có từ 2 dấu cách trở lên
    var sanitizedInput = trimmedInput.replace(/\s{2,}/g, ' ');

    return sanitizedInput;
}