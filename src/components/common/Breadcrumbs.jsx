// 'use client'

// import { usePathname } from 'next/navigation'
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from '@/components/ui/breadcrumb'
// import { HomeIcon } from '../Icons'
// import Link from 'next/link'

// const Breadcrumbs = () => {
//   const pathname = usePathname()
  
//   // Split pathname and filter out empty strings
//   const segments = pathname.split('/').filter(segment => segment !== '')
  
// const formatSegment = (segment) => {
//   const formatted = segment
//     .split('-')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ')

//   // Limit to 20 characters with ellipsis
//   return formatted.length > 20 
//     ? formatted.substring(0, 20) + "..."
//     : formatted
// }

  
//   // Build breadcrumb items
//   const breadcrumbItems = segments.map((segment, index) => {
//     const href = '/' + segments.slice(0, index + 1).join('/')
//     const isLast = index === segments.length - 1
//     const label = formatSegment(segment)
    
//     return { href, label, isLast }
//   })
//   const isHomeActive = breadcrumbItems.length === 1

//   return (
//     <Breadcrumb className="">
//       <BreadcrumbList>
//       <Link href={"/"} className='p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out flex items-center gap-2'>
//         <HomeIcon 
//           className={`h-5 w-auto !cursor-pointer   ${
//             isHomeActive ? '' : 'text-gray-500'
//           }`}
//         />
//       </Link>

//         {breadcrumbItems.map((item, index) => (
//           <div key={item.href} className='contents'>
//             {index > 0 && <BreadcrumbSeparator />}
//             <BreadcrumbItem>
//               {item.isLast ? (
//                 <BreadcrumbPage className={"p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out"}>{item.label}</BreadcrumbPage>
//               ) : (
//                 <BreadcrumbLink href={item.href} className='text-gray-500 p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out'>
//                   {item.label}
//                 </BreadcrumbLink>
//               )}
//             </BreadcrumbItem>
//           </div>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   )
// }
// export default Breadcrumbs


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
  const isRoot = pathname === '/'

  const segments = pathname.split('/').filter(segment => segment !== '')

  const formatSegment = (segment) => {
    const formatted = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return formatted.length > 20
      ? formatted.substring(0, 20) + '...'
      : formatted
  }

  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    const label = formatSegment(segment)

    return { href, label, isLast }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home item */}
        <BreadcrumbItem>
          {isRoot ? (
            <BreadcrumbPage className="p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out flex items-center gap-2">
              <HomeIcon className="h-5 w-auto" />
              <span>Home</span>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href="/"
              className="p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out flex items-center gap-2 text-gray-500"
            >
              <HomeIcon className="h-5 w-auto" />
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Other segments */}
        {!isRoot &&
          breadcrumbItems.map((item, index) => (
            <div key={item.href} className="contents">
              {/* No separator after home icon, only between segments */}
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className="text-gray-500 p-2 hover:bg-sidebar-accent rounded-lg duration-300 ease-out"
                  >
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
