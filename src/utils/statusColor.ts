// src/utils/statusColor.ts
export const getStatusColor = (status: string | boolean): string => {
  if (typeof status === 'boolean') {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  switch (status.toLowerCase()) {
    case 'active':
    case 'yes':
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'inactive':
    case 'no':
    case 'unavailable':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-gray-300 text-gray-700';
    default:
      return 'bg-slate-200 text-slate-700';
  }
};
