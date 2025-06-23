// src/utils/scroll.ts
// Utility functions for handling scroll navigation across pages

declare global {
  interface Window {
    navigateToSection: (sectionId: string) => void;
  }
}

export function scrollToSection(sectionId: string) {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  const targetPosition = targetElement.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

export function navigateToSection(sectionId: string) {
  if (window.location.pathname === '/') {
    // We're on homepage, scroll to section
    scrollToSection(sectionId);
  } else {
    // Navigate to homepage with anchor
    window.location.href = `/#${sectionId}`;
  }
}

// Add this as a global function for inline onclick handlers
window.navigateToSection = navigateToSection;

export {};