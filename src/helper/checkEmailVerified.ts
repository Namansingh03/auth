export function isEmailVerificationExpired(emailVerifiedAt : Date): boolean {
    const verifiedDate = new Date(emailVerifiedAt).getTime();
    const now = Date.now();

    const diffInMs = now - verifiedDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays > 10;
}