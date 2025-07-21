import React, { useEffect, useRef } from "react";

const CursorGlow = ({ targetId = "color-header" }) => {
  const glowRef = useRef(null);

  useEffect(() => {
    const target = document.getElementById(targetId);

    const handleMouseMove = (e) => {
      if (!target || !glowRef.current) return;

      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(224, 187, 255, 0.15), transparent 20%)`;
    };

    const handleMouseLeave = () => {
      if (glowRef.current)
        glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(224, 187, 255, 0.08), transparent 20%)`;
    };

    target?.addEventListener("mousemove", handleMouseMove);
    target?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      target?.removeEventListener("mousemove", handleMouseMove);
      target?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [targetId]);

  return (
    <div
      ref={glowRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        transition: "background 0.3s ease",
        maskImage: "linear-gradient(to bottom, black 100%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 100%, transparent 100%)",
      }}
    />
  );
};

export default CursorGlow;
