  // Global navigation utilities
  window.navigateToSection = function(sectionId) {
    if (window.location.pathname === '/') {
      // We're on homepage, scroll to section
      const targetElement = document.getElementById(sectionId);
      if (!targetElement) return;
      
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Navigate to homepage with anchor
      window.location.href = `/#${sectionId}`;
    }
  };

  // Handle navigation after page loads (for users coming from other pages with hash)
  function handleHashNavigation() {
    if (window.location.hash && window.location.pathname === '/') {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        window.navigateToSection(sectionId);
      }, 100); // Small delay to ensure page is fully loaded
    }
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', handleHashNavigation);
  
  // Re-initialize after navigation (for SPA-like behavior)
  document.addEventListener('astro:after-swap', handleHashNavigation);

  // Update all existing onclick handlers to use absolute paths
  document.addEventListener('DOMContentLoaded', function() {
    // Update any buttons that currently use onclick for scrolling
    const buttons = document.querySelectorAll('button[onclick*="getElementById"]');
    buttons.forEach(button => {
      const onclick = button.getAttribute('onclick');
      if (onclick && onclick.includes('contact')) {
        button.removeAttribute('onclick');
        button.addEventListener('click', () => window.navigateToSection('contact'));
      } else if (onclick && onclick.includes('our-solutions')) {
        button.removeAttribute('onclick');
        button.addEventListener('click', () => window.navigateToSection('our-solutions'));
      } else if (onclick && onclick.includes('our-team')) {
        button.removeAttribute('onclick');
        button.addEventListener('click', () => window.navigateToSection('our-team'));
      }
    });
  });