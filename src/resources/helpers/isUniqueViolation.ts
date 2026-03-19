export const isUniqueViolation = (error: any): boolean => {
  return error?.code === '23505';
};
