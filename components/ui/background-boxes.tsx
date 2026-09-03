"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Westernprise core palette only.
const colors = ["#D2A446", "#E3C36F", "#172E27"];

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(30).fill(1);
  const cols = new Array(24).fill(1);
  return (
    <div
      style={{ transform: "translate(-33%,-48%) skewX(-43deg) skewY(12deg) scale(.82) translateZ(0)" }}
      className={cn("hero-boxes", className)}
      aria-hidden="true"
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row-${i}`} className="box-row">
          {cols.map((_, j) => (
            <motion.div
              key={`cell-${i}-${j}`}
              className="box-cell"
              whileHover={{
                backgroundColor: colors[(i + j) % colors.length],
                transition: { duration: 0 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {j % 2 === 0 && i % 2 === 0 ? <span className="box-plus">+</span> : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
