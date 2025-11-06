'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { HomeIcon } from '../Icons'

const Breadcrumbs = () => {
  const pathname = usePathname()
  
  // Split pathname and filter out empty strings
  const segments = pathname.split('/').filter(segment => segment !== '')
  
  // Function to format segment names (e.g., 'add-document' -> 'Add Document')
  const formatSegment = (segment) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    const label = formatSegment(segment)
    
    return { href, label, isLast }
  })

  // Determine if Home icon should be active (only 1 item) or grayed out (2+ items)
  const isHomeActive = breadcrumbItems.length === 1

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <HomeIcon 
          className={`h-5 w-auto !cursor-pointer ${
            isHomeActive ? '' : 'text-gray-500'
          }`}
        />

        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className='contents'>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href} className='text-gray-500'>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs