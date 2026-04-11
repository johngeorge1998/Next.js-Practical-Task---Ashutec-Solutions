"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            animate={{
              rotate: 360,
              y: [0, -20, 0],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 2, ease: "linear" },
              y: { repeat: Infinity, duration: 1, ease: "easeInOut" },
            }}
            className="relative w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-white shadow-2xl"
          >
            <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-4 border-black" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-black bg-white z-10 flex items-center justify-center shadow-md">
              <div className="w-3 h-3 rounded-full border-2 border-black/20 bg-white animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold font-outfit tracking-wider text-foreground">
              Gotta catch &apos;em all!
            </h2>
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
