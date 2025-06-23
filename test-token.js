// Create file: test-token.js
// Run with: node test-token.js

const token = 'lmo0bsY3T6yvT6VgrWgu0gtt'; // Replace with your actual token

async function testToken() {
  console.log('Testing token:', token.substring(0, 10) + '...');
  
  try {
    // Test US region first
    console.log('\n=== Testing US Region ===');
    let response = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`);
    console.log('US Space API Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ US Region works!');
      console.log('Space name:', data.space?.name);
      console.log('Space ID:', data.space?.id);
      
      // Test stories
      const storiesResponse = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${token}&per_page=5`);
      console.log('Stories Status:', storiesResponse.status);
      
      if (storiesResponse.ok) {
        const storiesData = await storiesResponse.json();
        console.log('Total stories:', storiesData.stories?.length || 0);
        if (storiesData.stories?.length > 0) {
          console.log('First story:', storiesData.stories[0].name);
        }
      } else {
        console.log('Stories error:', await storiesResponse.text());
      }
      
      return; // Success, no need to test EU
    }
    
    // Test EU region if US failed
    console.log('\n=== Testing EU Region ===');
    response = await fetch(`https://api-eu.storyblok.com/v2/cdn/spaces/me?token=${token}`);
    console.log('EU Space API Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ EU Region works!');
      console.log('Space name:', data.space?.name);
      console.log('Space ID:', data.space?.id);
      console.log('🔧 Update your astro.config.mjs to use region: "eu"');
    } else {
      console.log('❌ Both regions failed');
      const errorData = await response.text();
      console.log('Error:', errorData);
    }
    
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

testToken();