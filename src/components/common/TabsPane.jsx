// "use client";

// import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/motion-tabs";
// import { AnimatePresence, motion } from "framer-motion";
// import PropTypes from "prop-types";
// import { cn } from "@/lib/utils";

// export default function AnimatedTabsSection({
//   items,
//   ctx,
//   defaultValue,
//   value,
//   onValueChange,
//   className,
//   listClassName,
//   contentClassName,
//   componentProps,
// }) {
//   const first = items?.[0]?.value;
//   const isControlled = value != null;

//   const [internal, setInternal] = useState(defaultValue ?? first);
//   const active = isControlled ? value : internal;

//   // order & direction
//   const order = useMemo(() => items.map((i) => i.value), [items]);
//   const prevValueRef = useRef(active);
//   const directionRef = useRef(0);

//   const setActive = (next) => {
//     const curIdx = order.indexOf(next);
//     const prevIdx = order.indexOf(prevValueRef.current);
//     directionRef.current = curIdx > prevIdx ? 1 : curIdx < prevIdx ? -1 : 0;

//     if (!isControlled) setInternal(next);
//     onValueChange?.(next);
//     prevValueRef.current = next;
//   };

//   const activeItem = items.find((i) => i.value === active) ?? items[0] ?? null;

//   // animate container height to match content
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);

//   useLayoutEffect(() => {
//     if (!containerRef.current || !contentRef.current) return;

//     const update = () => {
//       const h = contentRef.current.offsetHeight;
//       containerRef.current.style.height = h + "px";
//     };

//     const ro = new ResizeObserver(update);
//     ro.observe(contentRef.current);
//     update();

//     return () => ro.disconnect();
//   }, [active, items]);

//   const variants = {
//     enter: (dir) => ({ x: dir > 0 ? "-20%" : "20%", opacity: 0 }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         x: { type: "tween", duration: 0.3, ease: "easeOut" },
//         opacity: { type: "tween", duration: 0.1, ease: "easeOut" },
//       },
//     },
//     exit: (dir) => ({
//       x: dir > 0 ? "20%" : "-20%",
//       opacity: 0,
//       transition: {
//         x: { type: "tween", duration: 0.3, ease: "easeOut" },
//         opacity: { type: "tween", duration: 0.1, ease: "easeOut" },
//       }}),
//   };

//   return (
//     <div className={className}>
//       <Tabs
//         value={active}
//         {...(!isControlled && { defaultValue: defaultValue ?? first })}
//         onValueChange={setActive}
//         className={` relative flex gap-4 bg-[#F6F6F6] p-1.5  rounded-lg border border-gray-200`} >
//         <TabsList className={`relative flex w-full gap-4 !p-0`} activeClassName={"border shadow-none"}>
//           {items.map((i) => (
//             <TabsTrigger
//               key={i.value}
//               value={i.value}
//               onClick={() => setActive(i.value)}
//             //   className={`rounded-lg  transition-all duration-300  ease-out py-2 ${active?"!text-primary":"!text-black"}`}
//               className={cn(`rounded-lg  transition-all duration-300  ease-out py-2  ${activeItem?"text-black":"text-primary"}`)}

//             >
//               {i.label ?? i.name ?? i.value}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>
      
//       <div
//         ref={containerRef}
//         className={contentClassName ?? "relative overflow-hidden mt-5"}
//         style={{ position: "relative", height: 0 }}
//       >
//         <AnimatePresence initial={false} mode="wait" custom={directionRef.current}>
//           <motion.div
//             key={activeItem?.value}
//             custom={directionRef.current}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             style={{ position: "absolute", inset: 0 }}
//           >
//             <div ref={contentRef} className="w-full">
//               {activeItem?.render
//                 ? activeItem.render(ctx)
//                 : activeItem?.component
//                 ? React.createElement(activeItem.component, {
//                     ctx,
//                     ...(componentProps || {}),
//                   })
//                 : null}
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// AnimatedTabsSection.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string,
//       name: PropTypes.string,
//       render: PropTypes.func,
//       component: PropTypes.any,
//     })
//   ).isRequired,
//   ctx: PropTypes.any,
//   defaultValue: PropTypes.string,
//   value: PropTypes.string,
//   onValueChange: PropTypes.func,
//   className: PropTypes.string,
//   listClassName: PropTypes.string,
//   contentClassName: PropTypes.string,
//   componentProps: PropTypes.object,
// };

"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/motion-tabs";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function AnimatedTabsSection({
  items,
  ctx,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  contentClassName,
  componentProps,
}) {
  const first = items?.[0]?.value;
  const isControlled = value != null;

  const [internal, setInternal] = useState(defaultValue ?? first);
  const active = isControlled ? value : internal;

  // order & direction
  const order = useMemo(() => items.map((i) => i.value), [items]);
  const prevValueRef = useRef(active);
  const directionRef = useRef(0);

  const setActive = (next) => {
    const curIdx = order.indexOf(next);
    const prevIdx = order.indexOf(prevValueRef.current);
    directionRef.current = curIdx > prevIdx ? 1 : curIdx < prevIdx ? -1 : 0;

    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    prevValueRef.current = next;
  };

  const activeItem = items.find((i) => i.value === active) ?? items[0] ?? null;

  // animate container height to match content
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const update = () => {
      const h = contentRef.current.offsetHeight;
      containerRef.current.style.height = h + "px";
    };

    const ro = new ResizeObserver(update);
    ro.observe(contentRef.current);
    update();

    return () => ro.disconnect();
  }, [active, items]);

  const variants = {
    // Moving forward (dir > 0): enter from right, exit to left
    // Moving backward (dir < 0): enter from left, exit to right
    enter: (dir) => ({ 
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : "0%", 
      opacity: 0 
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.3, ease: "easeOut" },
        opacity: { type: "tween", duration: 0.2, ease: "easeOut" },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : dir < 0 ? "100%" : "0%",
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.3, ease: "easeOut" },
        opacity: { type: "tween", duration: 0.2, ease: "easeOut" },
      }
    }),
  };

  return (
    <div className={className}>
      <Tabs
        value={active}
        {...(!isControlled && { defaultValue: defaultValue ?? first })}
        onValueChange={setActive}
        className={`relative flex gap-4 bg-sidebar-accent p-1.5 rounded-lg border border-border-color-2 `}
      >
        <TabsList className={`relative flex w-full gap-4 !p-0 bg-transparent`} activeClassName={"border shadow-none"}>
          {items.map((i) => (
            <TabsTrigger
              key={i.value}
              value={i.value}
              onClick={() => setActive(i.value)}
              className={cn(`rounded-lg transition-all font-normal duration-300 ease-out py-2 ${activeItem?.value === i.value ? "text-primary" : "text-foreground"}`)}
            >
              {i.label ?? i.name ?? i.value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div
        ref={containerRef}
        className={contentClassName ?? "relative overflow-hidden mt-5"}
        style={{ position: "relative", height: 0 }}
      >
        <AnimatePresence initial={false} mode="wait" custom={directionRef.current}>
          <motion.div
            key={activeItem?.value}
            custom={directionRef.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: "absolute", inset: 0 }}
          >
            <div ref={contentRef} className="w-full">
              {activeItem?.render
                ? activeItem.render(ctx)
                : activeItem?.component
                ? React.createElement(activeItem.component, {
                    ctx,
                    ...(componentProps || {}),
                  })
                : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

AnimatedTabsSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
      name: PropTypes.string,
      render: PropTypes.func,
      component: PropTypes.any,
    })
  ).isRequired,
  ctx: PropTypes.any,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  componentProps: PropTypes.object,
};
