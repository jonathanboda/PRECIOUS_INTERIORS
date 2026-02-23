import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  closed: 'bg-neutral-100 text-neutral-800',
}

export function InquiryStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        statusStyles[status] || statusStyles.new
      )}
    >
      {status.replace('_', ' ')}
    </span>
  )
}
